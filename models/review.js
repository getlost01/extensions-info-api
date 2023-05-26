import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewDataSchema = new Schema({
	userID: { type: String, required: false },
    extension: { type: String, required: true },
    rating: { type: Number, required: true },
    feedBack: { type: String, required: false },
    email: { type: String, required: false },
	createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", reviewDataSchema);
