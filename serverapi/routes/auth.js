import express from 'express';
const router = express.Router();
const authMiddleware = require("../middlewares/index");


import { signup,  logout ,sendToEmail,
    forgotPassword, login, resetPassword,fetchLoggedUser, testFunc } from "../controllers/auth";

router.post("/SignUp",signup);
router.post("/login",login);
router.get("/logout",logout);
router.get("/send-email",sendToEmail);
router.get("/fetch-logged-user",authMiddleware, fetchLoggedUser);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);


module.exports = router;

