import express from "express";
import cors from "cors";
import { inject } from '@vercel/analytics';
import connectdb from './config/db.js';
// -----------Routes---------------
import dateCollect from "./APIs/dataCollect.js";
import reviewCollect from "./APIs/reviewCollect.js";
import opinion from "./APIs/opinion.js";
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

// --------------Vercel------------
inject();
// --------------------------------

// routes
app.use("/api/collect", dateCollect);
app.use("/api/reviews", reviewCollect);
app.use("/api/opinion", opinion);

app.get('*', (req, res)=>{
    res.send({'404': "Page not found!"});
});

