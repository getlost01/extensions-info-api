import mongoose from "mongoose";
const Schema = mongoose.Schema;

const collectDataSchema = new Schema({
	userID: { type: String, required: true },
    osUser: { type: String, required: false },
    extension: { type: String, required: true },
    ip: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    postal: { type: String, required: false },
    timezone: { type: String, required: false },
    fullData: Schema.Types.Mixed,
	createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", collectDataSchema);


