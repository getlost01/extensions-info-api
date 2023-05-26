import express from "express";
import Opinion from "../models/opinion.js";
const router = express.Router();
import * as dotenv from 'dotenv'; 
dotenv.config();

function getPayloadOpinion(reqData) {
	return { 
		name: reqData.name,
        opinion: reqData.opinion,
        email: reqData.email
	};
}

router.post("/add", async (req, res) => {
	try {
		const reqData = req.body;
        await new Opinion(getPayloadOpinion(reqData)).save();

		res.status(200).send({ message: "ok working", error: false });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error", error: true });
	}
});

export default router;
