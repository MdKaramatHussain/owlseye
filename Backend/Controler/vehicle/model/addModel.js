

// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const Joi = require('joi');
const connection = require('../../../Model/dbConnection');


// Validation 
const vehicleCompanyValidate = Joi.object({
    m_id: Joi.string().max(5).required(),
    v_id: Joi.string().max(5).required(),
    vb_id: Joi.string().max(5).required(),
    model_name: Joi.string().max(15).required(),
})


///// Add Vehicles
const AddModel = (req, res) => {
    try {
        const { error, value } = vehicleCompanyValidate.validate(req.body);

        if (error) {
            return res.send(error.details[0].message)
        }
        else {
            const value = [
                req.body.m_id,
                req.body.v_id,
                req.body.vb_id,
                req.body.model_name,
                req.file.location

            ]
            let sqlQuery = "INSERT INTO tbl_vehicle_modal(m_id, v_id, vb_id, model_name, photo) VALUES ( ?, ?, ?, ?, ?)";
            connection.query(sqlQuery, value, function (error, result) {
                if (error) {
                    console.log(error.sqlMessage);
                    if (error.code === 'ER_DUP_ENTRY') {
                        res.send("Alert!!! Please check vehicle Id And Name ")
                    }
                    else {
                        res.send({
                            message: error
                        })
                    }
                }
                else {
                    res.send({
                        message: "Vehicle company added"
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.send("Error in vehicle company Registration: ", error);
    }
}


module.exports = AddModel 