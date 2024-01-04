const express = require('express');
const cors  = require('cors')
const userRoute = express.Router();
let multer = require('multer')
let multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3');
const cookieParser = require('cookie-parser')
let app = express();
// app.use(express.json())
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ['POST', 'PUT', 'PATCH'],
//     credentials: true
// }))

app.use(cookieParser())
// let app = express();
userRoute.use(express.json())
userRoute.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['POST', 'PUT', 'PATCH'],
    credentials: true
}))

userRoute.use(cookieParser())

const userList = require('../../Controler/user/userList');
const userReg = require('../../Controler/user/userReg');
const updateUsersStatus = require('../../Controler/user/updateStatus');
const SearchUser = require('../../Controler/user/searchUser');
const userDetail = require('../../Controler/user/userDetails');
const updateUser = require('../../Controler/user/usersUpdate');
const Login = require('../../Controler/user/login');

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


userRoute.post('/userlist', userList);
userRoute.post('/reguser', upload.array('image', 5), userReg);
userRoute.post('/userfind/:userSearch', SearchUser);
userRoute.put('/userupdate/:user_id', upload.single('profile_photo'), updateUser);
userRoute.patch('/status/:admin_id/:state', updateUsersStatus);
userRoute.post('/userdetail/:uid', userDetail)
userRoute.post('/login', Login)
userRoute.post('/test',upload.array('image', 2), (req, res) =>{
    try {
        console.log(req.files[0].location)
        res.send(req.file)
    } catch (error) {
        res.send(error)
    }

})

module.exports = userRoute;