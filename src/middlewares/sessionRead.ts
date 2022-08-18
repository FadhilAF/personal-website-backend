import { RequestHandler } from "express";
import User from "../models/auth.model";
import Token from "../models/token.model";

const sessionRead: RequestHandler = async (req, res, next) => {

  if (req.session?.userId) {
    const userId = req.session.userId;
    const user = await User.findById(userId);

    if (!user) next(new Error("User Id in the session invalid"));

    const token = await Token.findById(user!.tokenId);
    if (!token) next(new Error("Token Id in the user invalid"));


    // https://stackoverflow.com/a/58788706/13673444
    req.user = {
      userId: user!._id.toString(),
      username: user!.username,
      email: user!.email,
      tokenId: token!._id.toString(),
      token: token!.name,
      role: token!.role
    };
    
    if ((req.originalUrl === "/auth/login" || req.originalUrl === "/auth/signup") && (req.method === "POST")) {
      //cek kalo misal request POST nak ke route login/signup meskipun sudah punya session, kito marahin

      //kalo misal dak kito atur cak ini, otomatis dio kayak belumlah ngubah session yang sekarang, tapi ngebuat lagi
      //yang baru, jadinyo cak ngirim request yg lah disiapin 2 kali, 
      //itu bakal menyebabkan error "Cannot set headers after they are sent to the client"
      return next(new Error("You already have a session, logout before you need to login/signup again"));
    }
    next();
  }

  next();

};

export default sessionRead;
