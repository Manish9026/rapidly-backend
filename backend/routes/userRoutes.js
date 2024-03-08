import  express  from "express"
const router =express.Router();
import userController from "../controllers/userController.js"

// public routes
router.post("/register",userController.userRegistration)



// private routes
export default router