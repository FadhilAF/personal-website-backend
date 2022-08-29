import { RequestHandler } from "express";
import Token from "../models/token.model";

const postToken: RequestHandler = async (req, res, next): Promise<unknown> => {
  const { name, role } = req.body;

  try {
    const existingToken = await Token.findOne({name});
    if (existingToken) return next(new Error("Token Name Already Taken"));

  } catch (err) {
    return next(err);
  }

  try {
    const newToken = new Token({name, role, open: true});
    newToken.save(()=>{
      res.json({message: "Token Successfully Made"});
    });
  } catch (err) {
    return next(err);
  }
  
}
export default {
  postToken
}
