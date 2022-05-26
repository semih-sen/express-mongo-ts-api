import express from 'express';
const router: express.Router = express.Router();

import auth from "./auth"

router.use("/auth", auth);

router.get("/error", (req:express.Request, res: express.Response, next:express.NextFunction) => {
  res.status(200).send("AAAA");
});

export default router;
