const jwt = require('jsonwebtoken');
export const testLogin = async (req, res) => {

    const user = { id: 123, username: 'exampleuser' };
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
    // Set the JWT token as a cookie in the response
    res.cookie('jwtToken', token, {
      httpOnly: true, // The cookie can only be accessed via HTTP (not JavaScript)
      secure: true,   // The cookie should only be transmitted over HTTPS
      sameSite: 'strict', // Restrict cookie sharing to same-site requests
      maxAge: 3600000,    // Cookie expiration time in milliseconds (1 hour)
      path: '/'           // The path for which the cookie is valid
    });
}