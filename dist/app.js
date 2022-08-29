"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./database/database"));
const session_1 = __importDefault(require("./database/session"));
const sessionRead_1 = __importDefault(require("./middlewares/sessionRead"));
const auth_routes_1 = __importDefault(require("./routers/auth.routes"));
const blog_routes_1 = __importDefault(require("./routers/blog.routes"));
const token_routes_1 = __importDefault(require("./routers/token.routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
// https://stackoverflow.com/a/23426060/13673444
app.set("trust proxy", 1);
try {
    // https://stackoverflow.com/a/45890875/13673444
    app.use((0, cors_1.default)({
        credentials: true,
        //biar request dari mano bae diterimo
        // https://stackoverflow.com/a/71071725/13673444
        // origin: true,
        //biar terimo request dari link ini bae
        origin: process.env.FRONTEND_APP_URL || process.env.FRONTEND_APP_URL_2 || process.env.FRONTEND_APP_URL_3
            ? [process.env.FRONTEND_APP_URL, process.env.FRONTEND_APP_URL_2, process.env.FRONTEND_APP_URL_3].filter((v) => v)
            : "http://localhost:3000",
    }));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true, limit: "100mb" }));
    app.use((0, express_session_1.default)({
        secret: process.env.DEV_SESSION_SECRET,
        // https://stackoverflow.com/a/14473557/13673444
        proxy: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            // https://stackoverflow.com/a/66553425/13673444
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
        },
        store: session_1.default,
        resave: true,
        saveUninitialized: false,
    }));
    app.use("/assets", express_1.default.static("./assets"));
    app.use(sessionRead_1.default);
    const sessionCheckMiddleware = (req, res, next) => {
        console.log(req.user);
        next();
    };
    app.use(sessionCheckMiddleware);
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.use("/auth", auth_routes_1.default);
    app.use("/blog", blog_routes_1.default);
    app.use("/token", token_routes_1.default);
    app.use(errorHandler_1.default);
}
catch (error) {
    console.log(error);
}
const PORT = process.env.PORT || "5000";
database_1.default.connectToDatabase()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
