import express from "express";
import  CPCalendar from "../models/CPCalendar.js";
const router = express.Router();
import * as dotenv from 'dotenv'; 
dotenv.config();

// function updateData(todaysData,reqData){

// }

router.post("/", async (req, res) => {
	try {
		const reqData = req.body;
// ;		let todaysData = await CollectData.findOne({ day: `${reqData.day}`});
// 		if(todaysData){
//             updateData(todaysData,reqData);
// 			CollectData.updateOne({id: reqData.id},{...ele},function (err) {
// 			    if (err){console.log(err);} 
// 			});
// 		}else
// 			await new CollectData({ ...ele}).save();
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
