import express from 'express'
import { Delete, Getme, LoginUser, Logout, RegisterUser, Update } from '../controllers/userController.js'
import { Protect } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);
router.get("/me", Protect, Getme);
router.put("/update", Protect, Update);
router.post("/delete", Protect, Delete);
router.post("/logout", Protect, Logout);

export default router;
