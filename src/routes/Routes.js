import { Router } from "express";
import { createUserController } from '../controllers/UsersController.js';
const router = Router();

router.get('/healthz', (req, res) => {
  res.status(200).send({
    message:"Service is running",
    timestamp: new Date().getTime()
  });
});



router.post('/create-user', createUserController);

export default router;