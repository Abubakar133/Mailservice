import express from "express";
import { sendContactUsMessage } from "../controllers/authControllers.mjs";

const router = express.Router();


router.post("/feedback", sendContactUsMessage) ;



export default router;
