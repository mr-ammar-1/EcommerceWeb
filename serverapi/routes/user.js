import express from "express";
const router = express.Router();


import {getUsers, delUser,editUser,getUser} from "../controllers/users"

router.get("/users", getUsers);
router.delete("/users/:id", delUser);
router.get("/user/:id", getUser)
router.put("/user/:id", editUser)



module.exports = router;
