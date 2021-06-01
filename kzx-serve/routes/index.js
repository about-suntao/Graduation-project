var express = require('express');
var router = express.Router();
var user =require('../controllers/users')
var admin = require('../controllers/admin')
const multer =require('multer')
/* GET home page. */

//app接口请求
router.post('/article',user.article)
router.post("/login",user.login)
router.get("/register",user.register)
router.post("/modifypassword",user.modifypassword)
const upload = multer({dest:__dirname+'/../public/images'})
router.post('/upload',upload.single('file'),user.upload)
router.post('/personal',user.personal)
router.post('/person', user.person);
router.post('/addarticle',user.addarticle)
router.get('/searchkey',user.searchkey)


//后台管理系统请求
router.post('/user', admin.user);
router.post('/geteditinfo',admin.geteditinfo)
router.post('/edituser',admin.edituser)
router.post('/deleteuser',admin.deleteuser)
router.post('/geteditfood',admin.geteditfood)
router.post('/editfood',admin.editfood)
router.post('/deletearticle',deletearticle)
router.post('/htlogin',admin.htlogin)

module.exports = router;
