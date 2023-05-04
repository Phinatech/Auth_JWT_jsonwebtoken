import { Request, Response, NextFunction } from "express";

import { HTTPS, mainAppErroHandling } from "./errorDefiner";

const errorbuilder = (err: mainAppErroHandling, res: Response) => {
  res.status(HTTPS.INTERNAL_SERVER_ERROR).json({
    name: err.name,
    message: err.message,
    status: err.status,
    stack: err.stack,
    error: err,
  });
};

export const errorHandler = (
  err: mainAppErroHandling,
  req: Request,
  res: Response,
  NEXT: NextFunction
) => {
  errorbuilder(err, res);
};
