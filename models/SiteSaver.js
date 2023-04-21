import mongoose from "mongoose";
const Schema = mongoose.Schema;

const collectDataSchema = new Schema({
	Day: { type: String, required: true },
    TotalVistor: { type: Number, required: true , default: 0},
    UniqueVisitor: { type: Number, required: true , default: 0},
    MacUser: { type: Number, required: true , default: 0},
    WindowUser: { type: Number, required: true , default: 0},
    LinuxUser: { type: Number, required: true , default: 0},
    Countries: [Schema.Types.Mixed],
    NewUser: { type: Number, required: true , default: 0},
	createdAt: String
});

export default mongoose.model("SiteSaver", collectDataSchema);