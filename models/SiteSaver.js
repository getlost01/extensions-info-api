import mongoose from "mongoose";
const Schema = mongoose.Schema;

const collectDataSchema = new Schema({
	day: { type: String, required: true },
    totalVistor: { type: Number, required: true , default: 0},
    uniqueVisitor: { type: Number, required: true , default: 0},
    macUser: { type: Number, required: true , default: 0},
    windowUser: { type: Number, required: true , default: 0},
    linuxUser: { type: Number, required: true , default: 0},
    userIDs: { type: Schema.Types.Mixed, required: true , default: {}},
    newUser: { type: Number, required: true , default: 0},
	createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SiteSaver", collectDataSchema);