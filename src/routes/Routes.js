import { Router } from "express";

const router = Router();

router.get('/healthz', (req, res) => {
  res.status(200).send({
    message:"Service is running",
    timestamp: new Date().getTime()
  });
});

export default router;