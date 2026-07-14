import { Request, Response } from "express";
import { getHealthData } from "../services/health.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getHealth = asyncHandler(async (req: Request, res: Response) => {

    const data = getHealthData();

    res.status(200).json(
        new ApiResponse(
            true,
            "Health check successful",
            data
        )
    );

});