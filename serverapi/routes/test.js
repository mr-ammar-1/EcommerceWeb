import express from 'express';
const router = express.Router();


import { testLogin } from "../controllers/test";

router.post("/testLogin",testLogin);

module.exports = router;

