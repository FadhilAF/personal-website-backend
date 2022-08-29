"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_model_1 = __importDefault(require("../models/auth.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getProfile = (
//ngedefine type params disini (di type req) dan cak ini:
req, res, next) => {
    res.send(req.params.id);
};
const getAuthenticatedData = (req, res, next) => {
    if (req === null || req === void 0 ? void 0 : req.user) {
        res.json({ userData: req.user });
    }
    else {
        return next(new Error("You Still Not Authenticated"));
    }
};
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, token, } = req.body;
    let selectedToken;
    try {
        selectedToken = yield token_model_1.default.findOne({ name: token });
        if (!selectedToken)
            return next(new Error("Token Selected Not Found"));
    }
    catch (err) {
        return next(err);
    }
    try {
        const existingName = yield auth_model_1.default.findOne({ username });
        if (existingName)
            return next(new Error("Username Already Taken"));
    }
    catch (err) {
        return next(err);
    }
    try {
        const existingEmail = yield auth_model_1.default.findOne({ email });
        if (existingEmail)
            return next(new Error("Email has been Used"));
    }
    catch (err) {
        return next(err);
    }
    try {
        const salt = yield bcrypt_1.default.genSalt(parseInt(process.env.DEV_PASSWORD_GENSALT, 10));
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const account = new auth_model_1.default({
            username,
            email,
            hashedPassword,
            tokenId: selectedToken._id,
        });
        account.save(() => {
            res.json({ message: "Account Succesfully Made" });
        });
    }
    catch (err) {
        return next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
        const account = yield auth_model_1.default.findOne({ username });
        if (!account)
            return next(new Error("Account does not exist"));
        bcrypt_1.default.compare(password, account.hashedPassword, (err, result) => {
            if (!result)
                return next(new Error("Wrong Password"));
            req.session.userId = account._id;
            res.json({ message: "Succesfully Logged In" });
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.default = {
    getProfile,
    getAuthenticatedData,
    signup,
    login,
};
