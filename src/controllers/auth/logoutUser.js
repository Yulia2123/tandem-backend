import { Session } from "../../models/session.js";


export const logoutUser = async (req, res) => {
    const {sessionId, accessToken} = req.cookies;

    if( sessionId && accessToken){
        await Session.deleteOne({ _id: sessionId});
    }

     res.clearCookie("sessionId");
     res.clearCookie("accessToken");
     res.clearCookie("refreshToken");

     res.status(204).send();
};