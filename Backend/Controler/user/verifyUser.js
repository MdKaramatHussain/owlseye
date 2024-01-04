const jwt = require('jsonwebtoken')

// Verifying user by token
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("Token not available")
        return res.json({ Error: "You are not authenticated" })
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is  not ok" });
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

module.exports = verifyUser;