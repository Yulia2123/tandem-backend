import { randomUUID } from "node:crypto";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

import { Session } from "../../models/session.js";
import { setSessionCookies } from "../../services/auth.js";
import { FIFTEEN_MINUTES, ONE_DAY } from "../../constants/time.js";

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies ?? {};

  if (!sessionId || !refreshToken || !isValidObjectId(sessionId)) {
    throw createHttpError(401, "Invalid session credentials");
  }

  const now = new Date();

  const updatedSession = await Session.findOneAndUpdate(
    {
      _id: sessionId,
      refreshToken,
      refreshTokenValidUntil: { $gt: now },
    },
    {
      $set: {
        accessToken: randomUUID(),
        refreshToken: randomUUID(),
        accessTokenValidUntil: new Date(now.getTime() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(now.getTime() + ONE_DAY),
      },
    },
    { new: true },
  );

  if (!updatedSession) {
    throw createHttpError(401, "Invalid or expired session");
  }

  setSessionCookies(res, updatedSession);

  res.status(200).json({
    message: "Session refreshed",
  });
};
