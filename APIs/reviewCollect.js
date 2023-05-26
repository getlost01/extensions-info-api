import express from "express";
import Review from "../models/review.js";
const router = express.Router();
import * as dotenv from 'dotenv'; 
dotenv.config();

function getPayloadReview(reqData) {
	return { 
		userID: reqData.userID,
		extension: reqData.extension,
        rating: reqData.rating,
        feedBack: reqData.feedBack,
        email: reqData.email
	};
}

router.post("/add", async (req, res) => {
	try {
		const reqData = req.body;
        await new Review(getPayloadReview(reqData)).save();

		res.status(200).send({ message: "ok working", error: false });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error", error: true });
	}
});

export default router;
