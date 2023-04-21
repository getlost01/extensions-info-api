import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
	day: { type: String, required: true },
    CPCalender: [Schema.Types.Mixed],
    ColorDropper: [Schema.Types.Mixed],
    SiteSaver: [Schema.Types.Mixed],
	createdAt: String
});

export default mongoose.model("Product", productSchema);


// Data
// - Total Visitor
// - Unique Visitor
// - 