"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    res.json({ error: err.message });
};
exports.default = errorHandler;
