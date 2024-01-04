const express = require('express');
const cors  = require('cors')
const vehicleModelRoute = express.Router();
let multer = require('multer')
let multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3');
const AddModel = require('../Controler/vehicle/model/addModel');
const ListCompany = require('../Controler/vehicle/model/viewModel');
const Update = require('../Controler/vehicle/model/updateModel');

let app = express();
// app.use(express.json())
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
//     credentials: true
// }))

vehicleModelRoute.use(express.json())
vehicleModelRoute.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))


let s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

let storage = multerS3({
    s3: s3,
    bucket: 'owlseye',
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage })


vehicleModelRoute.post('/view', ListCompany);
vehicleModelRoute.post('/add', upload.single('photo'), AddModel);
// vehicleModelRoute.put('/update', upload.single('photo'), Update); // When photo updated
vehicleModelRoute.put('/update/:m_id', Update);

// It is for Testing Purpose
vehicleModelRoute.post('/test', (req, res) =>{
    try {
       
        res.send("Hey I'm Tom (^o^) ")
    } catch (error) {
        res.send(error)
    }

})

module.exports = vehicleModelRoute;