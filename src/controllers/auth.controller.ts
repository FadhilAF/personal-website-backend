import User from "../models/auth.model";
import Token from "../models/token.model";
import bcrypt from "bcrypt";
import { RequestHandler, Request, Response, NextFunction } from "express";

const getProfile = (
  //ngedefine type params disini (di type req) dan cak ini:
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  res.send(req.params.id);
};

const getAuthenticatedData: RequestHandler = (req, res, next) => {
  if (req?.user) {
    res.json({userData: req!.user});
  } else {
    return next(new Error("You Still Not Authenticated"));
  }
};

const signup: RequestHandler = async (req, res, next): Promise<void> => {
  const {
    username,
    email,
    password,
    token,
  }: { username: string; email: string; password: string; token: string } =
    req.body;

  let selectedToken;
  try {
    selectedToken = await Token.findOne({name: token});
    if (!selectedToken) return next(new Error("Token Selected Not Found"));
  } catch (err) {
    return next(err);
  }

  try {
    const existingName = await User.findOne({ username });
    if (existingName) return next(new Error("Username Already Taken"));
  } catch (err) {
    return next(err);
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return next(new Error("Email has been Used"));
  } catch (err) {
    return next(err);
  }

  try {
    const salt = await bcrypt.genSalt(
      parseInt(process.env.DEV_PASSWORD_GENSALT!, 10)
    );
    const hashedPassword = await bcrypt.hash(password, salt);
    const account = new User({
      username,
      email,
      hashedPassword,
      tokenId: selectedToken._id,
    });

    account.save(()=>{
      res.json({ message: "Account Succesfully Made" });
    });
  } catch (err) {
    return next(err);
  }
};

const login: RequestHandler = async (req, res, next): Promise<void> => {
  const { username, password }: { username: string; password: string } =
    req.body;

  try {
    // https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
    const account = await User.findOne({ username });

    if (!account) return next(new Error("Account does not exist"));

    bcrypt.compare(password, account.hashedPassword, (err, result) => {
      if (!result) return next(new Error("Wrong Password"));

      req.session.userId = account._id;

      res.json({message: "Succesfully Logged In"});
    });

  } catch (err) {
    return next(err);
  }

};

export default {
  getProfile,
  getAuthenticatedData,
  signup,
  login,
};
