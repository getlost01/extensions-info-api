import mongoose from "mongoose";
const Schema = mongoose.Schema;

const collectDataSchema = new Schema({
	userID: { type: String, required: true },
    extension: { type: String, required: true },
    ip: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postal: { type: String, required: true },
    timezone: { type: String, required: true },
    fullData: [Schema.Types.Mixed],
	createdAt: String
});

export default mongoose.model("User", collectDataSchema);


