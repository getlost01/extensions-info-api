import express from "express";
import os from "os";
import useragent from 'useragent';
import ipinfo from 'ipinfo';
import CPCalendar from "../models/CPCalendar.js";
import ColorDropper from "../models/ColorDropper.js";
import SiteSaver from "../models/SiteSaver.js";
import User from "../models/users.js";
const router = express.Router();
import axios from 'axios';
import * as dotenv from 'dotenv'; 
dotenv.config();

const ipinfoClient = new ipinfo(process.env.IPKEY);


function getClientIp(req) {
	const ipAddress = req.headers['x-forwarded-for'] ||
	  req.connection.remoteAddress ||
	  req.socket.remoteAddress ||
	  (req.connection.socket ? req.connection.socket.remoteAddress : null);
	return ipAddress;
}

function getPayloadUser(ipInfoResponse, reqData, osType) {
	return { 
		...ipInfoResponse.data, 
		userID: reqData.userID,
		extension: reqData.extension,
		fullData: ipInfoResponse.data,
		osUser: osType
	};
}

function getPayloadCollect(todaysData, reqData, osType) {
	return {
		totalVistor: todaysData.totalVistor + 1,
		uniqueVisitor: todaysData.uniqueVisitor + ((reqData.isUnique)?1:0),
		macUser: todaysData.macUser + ((osType.includes('mac'))?1:0),
		windowUser: todaysData.windowUser + ((osType.includes('windows'))?1:0),
		linuxUser: todaysData.linuxUser + ((osType.includes('linux'))?1:0),
		newUser: todaysData.newUser + ((reqData.isNewUser)?1:0),
		userIDs: todaysData.userIDs
	};
}

function getPayloadCollectNew(reqData, osType, userIDs) {
	return {
		day: reqData.day,
		totalVistor: 1,
		uniqueVisitor: 1,
		macUser: ((osType.includes('mac'))?1:0),
		windowUser: ((osType.includes('windows'))?1:0),
		linuxUser: ((osType.includes('linux'))?1:0),
		newUser: ((reqData.isNewUser)?1:0),
		userIDs: userIDs,
	  };
}

router.post("/", async (req, res) => {
	try {
		const reqData = req.body;
		const userAgentString = req.headers['user-agent'];
		const userAgent = useragent.parse(userAgentString);
		const osType = userAgent.os.family.toLowerCase();
		const ipAddress = getClientIp(req);

		if(reqData.isNewUser){
			axios(`https://ipinfo.io/${ipAddress}?token=${process.env.IPKEY}`)
			.then(async (ipInfoResponse) => {
				await new User(getPayloadUser(ipInfoResponse, reqData, osType)).save();
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

				CPCalendar.updateOne({ day: `${reqData.day}`},
					getPayloadCollect(todaysData, reqData, osType)
				,function (err) {
					    if (err){console.log(err);} 
				});
			}else{

				var userIDs = {};
				userIDs[reqData.userID] = 1;

				await new CPCalendar(
					getPayloadCollectNew(reqData, osType, userIDs) 
				).save();
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

				ColorDropper.updateOne({ day: `${reqData.day}`},
					getPayloadCollect(todaysData, reqData, osType)
				,function (err) {
					    if (err){console.log(err);} 
				});
			}else{

				var userIDs = {};
				userIDs[reqData.userID] = 1;

				await new ColorDropper(
					getPayloadCollectNew(reqData, osType, userIDs) 
				).save();
			}
		}
		
		else if(reqData.extension === "SiteSaver"){
			let todaysData = await SiteSaver.findOne({ day: `${reqData.day}`});
			if(todaysData){

				if(todaysData.userIDs[reqData.userID]){
					todaysData.userIDs[reqData.userID]++;
				}else{
					todaysData.userIDs[reqData.userID] = 1;
				}

				SiteSaver.updateOne({ day: `${reqData.day}`},
					getPayloadCollect(todaysData, reqData, osType)
				,function (err) {
					    if (err){console.log(err);} 
				});
			}else{

				var userIDs = {};
				userIDs[reqData.userID] = 1;

				await new SiteSaver(
					getPayloadCollectNew(reqData, osType, userIDs) 
				).save();
			}
		}

		else{
			return 	res.status(404).send({ message: "Invalid Extension Name", error: true });
		}


		res.status(200).send({ message: "ok working" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/inactive", async (req, res) => {
	try {
		const reqData = req.body;
		let userData = await User.findOne({ userID: reqData.userID });
        if(userData){
			User.updateOne({ userID: reqData.userID },{
				inactiveAt: new Date(),
				active: false
			},function (err) { if (err){console.log(err);}});

			if(reqData.extension === "CPCalendar"){
				let todaysData = await CPCalendar.findOne({ day: `${reqData.day}`});
				if(todaysData){
					todaysData.uninstallIDs[reqData.userID] = true;
					++todaysData.uninstall;
					CPCalendar.updateOne({ day: `${reqData.day}`}, 
						todaysData
					,function (err) {
							if (err){console.log(err);} 
					});
				}else{
					var payload = {
						day: reqData.day,
						uninstall: 1,
						uninstallIDs: {}
					}
					payload.uninstallIDs[reqData.userID] = true;
					await new CPCalendar(
						payload
					).save();
				}
			}

			else if(reqData.extension === "SiteSaver"){
				let todaysData = await SiteSaver.findOne({ day: `${reqData.day}`});
				if(todaysData){
					todaysData.uninstallIDs[reqData.userID] = true;
					++todaysData.uninstall;
					SiteSaver.updateOne({ day: `${reqData.day}`}, 
						todaysData
					,function (err) {
							if (err){console.log(err);} 
					});
				}else{
					var payload = {
						day: reqData.day,
						uninstall: 1,
						uninstallIDs: {}
					}
					payload.uninstallIDs[reqData.userID] = true;
					await new SiteSaver(
						payload
					).save();
				}
			}

			else if(reqData.extension === "ColorDropper"){
				let todaysData = await ColorDropper.findOne({ day: `${reqData.day}`});
				if(todaysData){
					todaysData.uninstallIDs[reqData.userID] = true;
					++todaysData.uninstall;
					ColorDropper.updateOne({ day: `${reqData.day}`}, 
						todaysData
					,function (err) {
							if (err){console.log(err);} 
					});
				}else{
					var payload = {
						day: reqData.day,
						uninstall: 1,
						uninstallIDs: {}
					}
					payload.uninstallIDs[reqData.userID] = true;
					await new ColorDropper(
						payload
					).save();
				}
			}

			else{
				return 	res.status(404).send({ message: "Invalid Extension Name", error: true });
			}

		}

		else{
			return 	res.status(404).send({ message: "User Not Found", error: true });
		}

		res.status(200).send({ message: "ok working", error: false });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error", error: true });
	}
});


export default router;
