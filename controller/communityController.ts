import express from "express";
import communityService from "../service/communityService";

const communityRouter = express.Router();

communityRouter.get("/", async (req, res, next) => {
    try {
        const response = await communityService.getAllCommunities("token");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
})

export default communityRouter;