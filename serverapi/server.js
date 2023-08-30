import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();
import csrf from "csurf";
import cookieParser from "cookie-parser";
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const secretKey = 'sagry82qt48921642';
const csrfProtection = csrf({ cookie: true });

/* create express server  */
const app = express();

/* database connection */
mongoose.connect(process.env.DATABASE_MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("*** DB Connected ***"))
.catch((err) => console.log("DB Connection failed...", err));

/* apply middlewares */
app.use(cors());
app.use(express.json({ limit: "4mb"}));
app.use(cookieParser());
app.use(morgan('dev'));


/* route */
readdirSync("./routes").map((r) => 
    app.use(require(`./routes/${r}`)) 
); 
// CSRF 
// app.use(csrfProtection);

// app.get("/csrf-token", (req, res) =>{
//     res.json({ csrfToken: req.csrfToken() });
// });

app.post('/mylogin', (req, res) => {
    try{
   
    // // Assuming authentication is successful, create a JWT token
    const user = { id: 123, username: 'exampleuser' };
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  
    // Set the JWT token as a cookie in the response
    res.cookie('jwtToken', token, {
      httpOnly: true, // The cookie can only be accessed via HTTP (not JavaScript)
      secure: true,   // The cookie should only be transmitted over HTTPS
      sameSite: 'strict', // Restrict cookie sharing to same-site requests
      maxAge: 3600000,    // Cookie expiration time in milliseconds (1 hour)
      path: '/'           // The path for which the cookie is valid
    });
  
    res.send('We hit server end point..');
}
catch(err){
    console.log(err.message)
}
  });

/* PORT */
const port = process.env.PORT || 9000;

/* start listen server */
app.listen(port, () => {
    console.log(`Express server is running on port http://localhost:${port}`);
});