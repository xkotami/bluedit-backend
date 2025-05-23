"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const commentController_1 = __importDefault(require("./controller/commentController"));
const communityController_1 = __importDefault(require("./controller/communityController"));
const postController_1 = __importDefault(require("./controller/postController"));
const userController_1 = __importDefault(require("./controller/userController"));
const express_jwt_1 = require("express-jwt");
const app = (0, express_1.default)();
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use((0, cors_1.default)());
app.use(bodyParser.json());
app.use((0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET || 'default',
    algorithms: ["HS256"],
}).unless({
    path: ['/api-docs', /^\/api-docs\/.*/, '/user/login', '/status', '/user/register']
}));
app.use('/comment', commentController_1.default);
app.use('/community', communityController_1.default);
app.use('/post', postController_1.default);
app.use('/user', userController_1.default);
app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});
app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bluedit API',
            version: '1.0.0',
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT" // Not required but recommended for clarity
            }
        }
    },
    apis: ['./controller/*Controller.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOpts);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
