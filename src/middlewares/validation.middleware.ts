import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import logger from "../logs/logger";

const validate = (
  schema: Schema,
  property: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[property]);

    if (error) {
      logger.error(`Validation error: ${error.details[0].message}`);
      res
        .status(400)
        .json({ status: 102, message: error.details[0].message, data: null });
    } else {
      next();
    }
  };
};

export default validate;
