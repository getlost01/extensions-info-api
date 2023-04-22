import express from "express";
import os from "os";
import  CPCalendar from "../models/CPCalendar.js";
import User from "../models/users.js";
const router = express.Router();
import axios from 'axios';
import * as dotenv from 'dotenv'; 
dotenv.config();



router.post("/", async (req, res) => {
	try {
		const reqData = req.body;

		if(reqData.isNewUser){
			axios(`https://ipinfo.io/json?token=${process.env.IPKEY}`)
			.then(async (response) => {
				const dta = await new User({ 
					...response.data, 
					userID: reqData.userID,
					extension: reqData.extension,
					fullData: response.data,
					osUser: os.type()
				}).save();
				console.log(dta);
			})
			.catch(function (err) {
				console.log("Unable to fetch ip 📲", err);
			});
		}

		// if(reqData.extension === "CPCalendar"){
		// 	let todaysData = await CPCalendar.findOne({ day: `${reqData.day}`});
		// 	if(todaysData){
		// 		updateData(todaysData,reqData);
		// 		CollectData.updateOne({id: reqData.id},{...ele},function (err) {
		// 			if (err){console.log(err);} 
		// 		});
		// 	}else
		// 		await new CollectData({ ...ele}).save();
		// }





       
// ;		let todaysData = await CollectData.findOne({ day: `${reqData.day}`});
// 		if(todaysData){
//             updateData(todaysData,reqData);
// 			CollectData.updateOne({id: reqData.id},{...ele},function (err) {
// 			    if (err){console.log(err);} 
// 			});
// 		}else
// 			await new CollectData({ ...ele}).save();
		res.send("ok");
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
