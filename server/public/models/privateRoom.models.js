"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateRoom = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const priavteRoomSchema = new mongoose_1.default.Schema({
    privateRoomName: {
        type: String,
        required: true,
    },
});
exports.PrivateRoom = mongoose_1.default.models.PrivateRoom || mongoose_1.default.model("Room", priavteRoomSchema);
//# sourceMappingURL=privateRoom.models.js.map