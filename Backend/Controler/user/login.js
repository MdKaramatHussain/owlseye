
// Required Module
const connection = require('../../Model/dbConnection');
const jwt = require('jsonwebtoken')


const Login = (req, res) => {
    const sql = "SELECT * FROM tbl_admin_login WHERE email = ?";
    connection.query(sql, req.body.email, (err, data) => { //data = result 
        if (data) {
            const name = data[0].name;
            const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' })//extra
            res.cookie('token', token)
            return res.json({ Status: "Success" });

        } else {
            return res.json({ Error: "No email existed" });
        }
    })
}

module.exports = Login