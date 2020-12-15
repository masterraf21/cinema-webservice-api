"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const uuid_1 = require("uuid");
// import { use } from 'nconf'
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        trim: true
    },
    encrypted_password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
        required: true
    },
    full_name: {
        type: String,
        trim: true
    },
    salt: String
}, { timestamps: true });
userSchema
    .virtual('password')
    .set(function (password) {
    this._password = password;
    this.salt = uuid_1.v4();
    this.encrypted_password = this.hashPassword(password);
})
    .get(function () {
    return this._password;
});
userSchema.method({
    authenticate: function (plain_password) {
        return this.hashPassword(plain_password) === this.encrypted_password;
    },
    hashPassword: function (plain_password) {
        if (!plain_password) {
            return '';
        }
        return crypto_1.default.createHmac('sha256', this.salt).update(plain_password).digest('hex');
    }
});
class UserModel extends mongoose_1.default.model('User', userSchema, 'users') {
    constructor(userData) {
        super(userData);
    }
}
exports.UserModel = UserModel;
