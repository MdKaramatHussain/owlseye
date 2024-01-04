

// Required Module
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors());
const connection = require('../../../Model/dbConnection');

///// View Vehicles Model
const ListCompany = (req, res) => {
    try {
        let sqlQuery = "SELECT tbl_vehicle_modal.m_id AS ID, tbl_vehicle_modal.v_id, tbl_vehicle_modal.vb_id, tbl_vehicle_category.type AS Category, tbl_vehicle_brand.name AS Company, tbl_vehicle_modal.model_name AS Name, tbl_vehicle_modal.photo, tbl_vehicle_modal.added_on FROM tbl_vehicle_modal LEFT JOIN tbl_vehicle_brand ON  tbl_vehicle_modal.vb_id = tbl_vehicle_brand.vb_id LEFT JOIN tbl_vehicle_category ON tbl_vehicle_modal.v_id = tbl_vehicle_category.v_id"
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log(error.sqlMessage);
            }
            else {
                res.send(result)
            }
        })

    } catch (error) {
        console.log(error)
        res.send("Error in vehicle company List: ", error);
    }
}


module.exports = ListCompany