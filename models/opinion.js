import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OpinionDataSchema = new Schema({
	name: { type: String, required: false },
    opinion: { type: String, required: false },
    email: { type: String, required: false },
	createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Opinion", OpinionDataSchema);