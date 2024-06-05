import mongoose from "mongoose";

const priavteRoomSchema = new mongoose.Schema ({
    privateRoomName : {
        type : String,
        required : true,
    },
    
})

export const PrivateRoom = mongoose.models.PrivateRoom || mongoose.model("Room",priavteRoomSchema);