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
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const general_routes_1 = __importDefault(require("./routes/general.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 8000;
    app.use((req, res, next) => {
        express_1.default.json()(req, res, next);
    });
    app.set('trust proxy', 1);
    app.use((req, res, next) => {
        body_parser_1.default.json()(req, res, next);
    });
    app.use((0, morgan_1.default)('combined'));
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
        methods: ['POST', 'PATCH', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
        credentials: true,
    }));
    app.use('/v1', general_routes_1.default);
    app.use('/v1/user', user_routes_1.default);
    app.use('/v1/admin', admin_routes_1.default);
    app.listen(PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`));
});
main().catch((err) => {
    console.log('Error Occurred:', err);
    process.exit(1);
});
