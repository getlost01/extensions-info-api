import express from "express";
import os from "os";
import CPCalendar from "../models/CPCalendar.js";
import ColorDropper from "../models/ColorDropper.js";
import SiteSaver from "../models/SiteSaver.js";
import User from "../models/users.js";
const router = express.Router();
import axios from 'axios';
import * as dotenv from 'dotenv'; 
dotenv.config();



router.post("/", async (req, res) => {
	try {
		const reqData = req.body;
		const userOS = os.type();		

		if(reqData.isNewUser){
			axios(`https://ipinfo.io/json?token=${process.env.IPKEY}`)
			.then(async (response) => {
				await new User({ 
					...response.data, 
					userID: reqData.userID,
					extension: reqData.extension,
					fullData: response.data,
					osUser: userOS
				}).save();
			})
			.catch(function (err) {
				console.log("Unable to fetch ip 📲", err);
			});
		}


		if(reqData.extension === "CPCalendar"){
			let todaysData = await CPCalendar.findOne({ day: `${reqData.day}`});
			if(todaysData){

				if(todaysData.userIDs[reqData.userID]){
					todaysData.userIDs[reqData.userID]++;
				}else{
					todaysData.userIDs[reqData.userID] = 1;
				}

				CPCalendar.updateOne({ day: `${reqData.day}`},{
						totalVistor: todaysData.totalVistor + 1,
						uniqueVisitor: todaysData.totalVistor + ((reqData.isUnique)?1:0),
						macUser: todaysData.macUser + ((userOS == "Darwin")?1:0),
						windowUser: todaysData.windowUser + ((userOS == "Windows_NT")?1:0),
						linuxUser: todaysData.linuxUser + ((userOS == "Linux")?1:0),
						newUser: todaysData.newUser + ((reqData.isNewUser)?1:0),
						userIDs: todaysData.userIDs
					},function (err) {
					    if (err){console.log(err);} 
				});
			}else{

				var userIDs = {};
				userIDs[reqData.userID] = 1;

				await new CPCalendar({
					day: reqData.day,
					totalVistor: 1,
					uniqueVisitor: 1,
					macUser: ((userOS == "Darwin")?1:0),
					windowUser: ((userOS == "Windows_NT")?1:0),
				    linuxUser: ((userOS == "Linux")?1:0),
					newUser: ((reqData.isNewUser)?1:0),
					userIDs: userIDs,
				  }).save();
			}
		}

		else if(reqData.extension === "ColorDropper"){
			let todaysData = await ColorDropper.findOne({ day: `${reqData.day}`});
			if(todaysData){

				if(todaysData.userIDs[reqData.userID]){
					todaysData.userIDs[reqData.userID]++;
				}else{
					todaysData.userIDs[reqData.userID] = 1;
				}

				ColorDropper.updateOne({ day: `${reqData.day}`},{
						totalVistor: todaysData.totalVistor + 1,
						uniqueVisitor: todaysData.totalVistor + ((reqData.isUnique)?1:0),
						macUser: todaysData.macUser + ((userOS == "Darwin")?1:0),
						windowUser: todaysData.windowUser + ((userOS == "Windows_NT")?1:0),
						linuxUser: todaysData.linuxUser + ((userOS == "Linux")?1:0),
						newUser: todaysData.newUser + ((reqData.isNewUser)?1:0),
						userIDs: todaysData.userIDs
					},function (err) {
					    if (err){console.log(err);} 
				});
			}else{

				var userIDs = {};
				userIDs[reqData.userID] = 1;

				await new ColorDropper({
					day: reqData.day,
					totalVistor: 1,
					uniqueVisitor: 1,
					macUser: ((userOS == "Darwin")?1:0),
					windowUser: ((userOS == "Windows_NT")?1:0),
				    linuxUser: ((userOS == "Linux")?1:0),
					newUser: ((reqData.isNewUser)?1:0),
					userIDs: userIDs,
				  }).save();
			}
		}
		


		res.status(200).send({ message: "ok working" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
