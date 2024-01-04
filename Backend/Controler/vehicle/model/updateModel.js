// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const Joi = require('joi');
const connection = require('../../../Model/dbConnection');



// Update Users Status
const Update = (req, res) => {
    try {

        let id = req.params.m_id;
            let data = [
                req.body.name,
                req.body.categoryUpdate,
                req.body.companyUpdate,
            ];
            let sqlQuery = `UPDATE tbl_vehicle_modal SET model_name = ?, v_id = ?, vb_id = ? Where m_id = '${id}'`
            connection.query(sqlQuery, data, function (error, result) {
                if (error) {
                    console.log("ERROR", error.sqlMessage);
                    res.send({
                        message: error.sqlMessage
                    })
                }
                else {
                    res.send({
                        message: "Successful"
                    })
                }

            })
    } catch (error) {
        
        console.log(req.body)
        res.send({
            message: 'Error in Catch Block '+error
        });
    }
}

module.exports = Update
