import express from "express";
import cors from "cors";
import connectdb from './config/db.js';
// -----------Routes---------------
import dateCollect from "./APIs/dataCollect.js";
// --------------------------------
import * as dotenv from 'dotenv'; 
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

connectdb();
app.listen(process.env.PORT || 8080, function(){
    console.log("➡️ Server listening on port %d in %s mode 👍", this.address().port, app.settings.env);
});

// routes
app.use("/api/collect", dateCollect);



