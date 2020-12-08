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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowtimeModel = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importStar(require("mongoose"));
const showtimeSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true
    },
    movies: [
        {
            type: mongodb_1.ObjectId,
            ref: 'Movie',
            required: false,
            default: null
        }
    ]
});
// export default mongoose.model<Model.IShowtime>('Showtime', showtimeSchema, 'showtimes')
class ShowtimeModel extends mongoose_1.default.model('Showtime', showtimeSchema, 'showtimes') {
    constructor(showtimeData) {
        super(showtimeData);
    }
}
exports.ShowtimeModel = ShowtimeModel;
