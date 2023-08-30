import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
const jwt = require('jsonwebtoken');
import AWS from "aws-sdk";
import { nanoid } from "nanoid";
const authMiddleware = require("../middlewares/index");

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
    
};

const SES = new AWS.SES(awsConfig);


export const signup = async (req, res) => {
    try {
        //console.log(req.body);
        const { name, email, password } =  req.body;
        if (!name) return res.status(400).send("Name is required");
        if(!password || password.length < 5) {
            return res.status(400).send("Password is required and should be min 5 characters long");
        }   
        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(400).send("Email is already taken by some other user");

        
        /* hash passsword */
        const hashedPassword = await hashPassword(password);

        /* register new user */
        const user = new User({
                name,
                email,
                password: hashedPassword,
        });
        await user.save();
        
        //console.log("New user created:", user);
        
        return res.json({ ok: true });
    }
    catch (err){
        console.log(err);
        return res.status(400).send("Error: try again");
    }   
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        /* check if our database has user with that email */
        const user = await User.findOne( {email} ).exec();
        console.log(user)
        if(!user) return res.status(400).send("No User found!");
        /* check password */
        const match = await comparePassword(password, user.password);
        if(!match) return res.status(400).send("Password not matched");

        /* create signed jwt */
        const token = jwt.sign({ _id:user._id }, process.env.JWT_SECRET_KEY, 
            {expiresIn: "7d",
        });
        /* return user and token to client, exclude hashed password*/
        user.password = undefined;
        /* send token in cookie */
        res.cookie('jwtToken', token, {
            httpOnly: true, // The cookie can only be accessed via HTTP (not JavaScript)
            // secure: true,   // The cookie should only be transmitted over HTTPS
            sameSite: 'strict', // Restrict cookie sharing to same-site requests
            maxAge: 3600000,    // Cookie expiration time in milliseconds (1 hour)
            path: '/'           // The path for which the cookie is valid
          });
       
        /* send user as json response */
        res.json(user);
        //console.log(req.body);
    } catch(err){
          console.log(err);
          return res.status(400).send("Error. Try again");
    }

}

export const logout = async (req, res) => {
    try {
      res.clearCookie("token");
      return res.json({ message: "Signout successfully!"});
    } catch (err) {
            console.log(err)
    }
}


/* Fetch Current user from database */
export const fetchLoggedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.send({
          success: true,
          message: "User successfully fetched from mongdb",
          data: user,
          ok:true
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
};

export const testFunc = (req, res) => {
    res.cookie('jwtToken', "token", {
        httpOnly: true, // The cookie can only be accessed via HTTP (not JavaScript)         // The path for which the cookie is valid
      });
      return res.json({
        test: "ÖK"
      })
}



/* Send email using SES */
export const sendToEmail = async (req, res) => {
    // console.log("Send email using SES");
    // res.json({ ok: true });
    const params = {
        Source: process.env.EMAIL_FROM,
        Destination: { 
            ToAddresses: ["stylish_bilal2003@hotmail.com"]
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
               Html: {
                 Charset: "UTF-8",
                 Data: `
                    <html>
                        <h1> Reset Password Link</h1>
                        <p>Please use the following link to reset your password </p>
                    </html>
                    `,
               },      
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Password Reset Link",  
            }
        }
    };
    const emailSent = SES.sendEmail(params).promise();

    emailSent
    .then((data) => {
       console.log(data);
       res.json({ ok: true });      
    })
    .catch((err) => {
        console.log(err);
    });
};

/* Forgot Password */
export const forgotPassword = async (req, res) => {
      try {
          const { email } = req.body;
          //console.log(email);
          const code = nanoid(6).toUpperCase();
          const user = await User.findOneAndUpdate(
            { email },
            { passwordResetCode: code}
          );
          if (!user) return res.status(400).send("User not found");
          /* prepare for email */
          const params = {
            Source: process.env.EMAIL_FROM,
            Destination: {
                ToAddresses: [email]
          },
          Message: {
            Body: {
                Html:{
                   Charset: 'UTF-8',
                   Data: `
                      <html>
                           <h1>Reset Password</h1>
                           <p>Use this code to reset your password </p>
                           <h2 style="color:red">
                             <mark>${code}</mark>
                           </h2> 
                           <i>http://www.educators.com</i>
                      </html>
                     `,     
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Reset Password (Educators)"
             },
          },
        };  

        const sentEmail = SES.sendEmail(params).promise();
        sentEmail
            .then((data) => {
                console.log(data);
                res.json({ ok: true });
            })
            .catch((err) => {
                console.log(err);
            });
      } catch (err) {
        console.log(err);   
      }
};


/* Reset Password */
export const resetPassword = async (req, res) => {
    try {
        const {email, code, newPassword} = req.body;

        /* check if our database has user with that email */
        // const checkCode = await User.findOne( {code} ).exec();
        // if(!checkCode) return res.status(400).send("You entered a wrong code! try again");

        //console.table({email, code, newPassword});
        const hashedPassword  = await hashPassword(newPassword);

        const user = User.findOneAndUpdate(
            {
                email,
                passwordResetCode: code,
            },
            {
                password: hashedPassword,
                passwordResetCode: "",
            }
        ).exec();
        res.json({ ok: true });
    } catch (err) {
        console.log(err);  
        return res.status(400).send("Error! Try again"); 
      }
};
