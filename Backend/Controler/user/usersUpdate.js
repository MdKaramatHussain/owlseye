
// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
// const connection = require('../../../Model/dbConnection')
const connection = require('../../Model/dbConnection');
app.use(express.json())
app.use(cors());

////update user details
const updateUser = (req, res) => {
    const userData = req.body;
    const id = req.params.user_id;
    // res.send(req.file.location)
    // console.log(req.body)
    

    const sqlQuery = `UPDATE tbl_admin SET ?, profile_photo = '${req.file.location}' WHERE admin_id = '${id}'`;

    connection.query(sqlQuery, [userData], function (error, result) {
        if (error) {
            console.error("Error updating employee:", error);
            res.status(500).json({ error: "An error occurred while updating employee data." });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Employee data updated successfully." });
            } else {
                res.status(404).json({ error: "Employee not found or no changes made." });
            }
        }
    });
};


module.exports = updateUser;