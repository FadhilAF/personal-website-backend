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
const token_model_1 = __importDefault(require("../models/token.model"));
const postToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role } = req.body;
    try {
        const existingToken = yield token_model_1.default.findOne({ name });
        if (existingToken)
            return next(new Error("Token Name Already Taken"));
    }
    catch (err) {
        return next(err);
    }
    try {
        const newToken = new token_model_1.default({ name, role, open: true });
        newToken.save(() => {
            res.json({ message: "Token Successfully Made" });
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.default = {
    postToken
};
