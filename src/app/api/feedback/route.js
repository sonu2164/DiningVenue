import { resolve } from "dns/promises";
import Feedback from "../../../models/feedbackModel";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const { orderId, feedback } = await req.json();
        console.log(orderId, feedback);

        if (!orderId || !feedback) {
            return res.status(400).json({ error: 'Bad Request: orderId and feedback are required' });
        }

        const newFeedback = new Feedback({
            orderId,
            feedback,
        });

        const savedFeedback = await newFeedback.save();

        return Response.json(savedFeedback);
    } catch (error) {
        console.error('Error submitting feedback:');
        return Response.json({ error: 'Internal Server Error' });
    }
}




export async function GET(req) {
    try {
        mongoose.connect(process.env.MONGO_URL)


        const res = await Feedback.find({});

        return Response.res;
    } catch (error) {
        console.error('Error submitting feedback:');
        return Response.json({ error: 'Internal Server Error' });
    }
}

