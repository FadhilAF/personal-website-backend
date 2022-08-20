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
const sessionRead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId) {
        const userId = req.session.userId;
        const user = yield auth_model_1.default.findById(userId);
        if (!user)
            next(new Error("User Id in the session invalid"));
        const token = yield token_model_1.default.findById(user.tokenId);
        if (!token)
            next(new Error("Token Id in the user invalid"));
        // https://stackoverflow.com/a/58788706/13673444
        req.user = {
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
            tokenId: token._id.toString(),
            token: token.name,
            role: token.role
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
});
exports.default = sessionRead;
