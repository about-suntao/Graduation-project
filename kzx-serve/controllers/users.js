var db =require('../util/dbpool')
const createToken = require('../token/createToken');
const checkToken = require('../token/checkToken');
var moment = require('moment');
let fs = require('fs'); 
let path = require('path');
const multiparty = require('multiparty');
const { search } = require('../routes');


//主页请求文章列表
article=(req,res)=>{
    let radio =req.body.radio;
    let sql ="select * from article where radio= '"+radio+"'";
    let sqlArr = [];
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            throw err
            return
        }else{
            res.send(data)
        }
    })
}


//登录接口
login=(req,res)=>{
    let name = req.body.userName;
    let pwd = req.body.userPassword;
    let sql ="select password,userpic from k_user where name = '"+name+"'" 
    let sqlArr =[];
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            throw err
            return;
        }
        else{
            if(data.length>0){
                console.log(data)
                let uPasswordString = JSON.stringify(data);
                let userPassword = JSON.parse(uPasswordString)[0].password;
                let uuserpic =JSON.parse(uPasswordString)[0].userpic;
                if(userPassword ==pwd){
                    let token = createToken(name);
                    let sql1 = "update  k_user SET  token = '"+token+"' where name = '"+name+"'"
                    let sqlArr1 =[]
                    db.sqlConnect(sql1,sqlArr1,(err,data)=>{
                        if(err){
                            throw err
                            return
                        }
                    })
                    res.send({statusCode:200, msg:'登录成功',token:token,userName:name,userpic:uuserpic})
                    return
                }else{
                    res.send({ statusCode:0, msg:'密码不正确'})
                    return
                }
            }
        }
        res.send({ statusCode:0, msg:'用户名不正确或不存在'})
    })
}



//注册接口
register=(req,res)=>{
    let name = req.query.userName
    let pwd = req.query.userPassword
    let phone = req.query.phone
    let sql = "SELECT * FROM k_user WHERE name = '"+name+"'"
    let sql1 = 'INSERT INTO k_user SET  ?'
    let sqlArr  = []
    // let token = createToken(name);
    let  current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    console.log(current_time)
    let sqlArr1 ={name:name,password:pwd,phone:phone,create_time:current_time}
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        let uName = data[0]
        if(uName==undefined){
            db.sqlConnect(sql1,sqlArr1,(err,data)=>{
                if(err){
                    res.send({statusCode:0, msg:'注册失败，请重试'})
                    return
                }else{
                    res.send({statusCode:200, msg:'注册成功'})
                    return 
                }
            })
        }else{
            res.send({statusCode:0, msg:'用户名已存在'})
        }
    })
}

//修改密码接口
modifypassword=(req,res)=>{
    let psd =req.body.password;
    let name =req.body.username;
    let sql="update  k_user SET  password = '"+psd+"' where name = '"+name+"'"
    let sqlArr=[]
    console.log(sql);
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            throw err
            return
        }else{
            res.send({
                statuscode:200,
                msg:'密码修改成功'
            })
        }
    })
}

//图片上传
upload=(req,res)=>{
    const file=req.file 
    let suffix =path.parse(req.file.originalname).ext;//切图片后缀
    let oldname = req.file.path //获取path: 'public\\upload\\0f625978d5d1a783b12e149718f8b634',
    let newname = req.file.path + path.parse(req.file.originalname).ext //.jpg
    fs.renameSync(oldname, newname)//将老的文件名改成新的有后缀的文件 #同步写法
    file.url ='http://localhost:3000/static/images/'+file.filename+suffix
    res.send(file)
}

//个人信息修改请求
personal=(req,res)=>{
    let getname =req.body.username;
    let sql = "SELECT * FROM k_user WHERE name = '"+getname+"'"
    let sqlArr=[]
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            throw err
            return
        }else{
            res.send({data:data})
        }
    })

}


//修改个人信息接口
person=(req, res) => {
    let form = new multiparty.Form()
    form.parse(req,(err, fields, files) => {
        let Name=fields.username[0];
        let Phone=fields.phone[0];
        let Userpic=fields.userpic[0];
        let sql="update  k_user SET  phone='"+Phone+"', userpic='" +Userpic+"' where name = '"+Name+"'"
        console.log(sql)
        let sqlArr=[]
        db.sqlConnect(sql,sqlArr,(err,data)=>{
            if(err){
                throw err
                return
            }else{
                res.send({statusCode:200,msg:'信息修改成功'})
            }
        })
    })
}


//添加美食游记文章详情
addarticle=(req,res)=>{
    let form = new multiparty.Form()
    form.parse(req,(err, fields, files) => {
        let username=fields.username[0];
        let userpic=fields.userpic[0];
        let title=fields.title[0];
        let cover=fields.cover[0];
        let radio=fields.radio[0];
        let content=fields.content[0];
        let address=fields.address[0];
        let  current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        let sqlArr ={username:username,userpic:userpic,radio:radio,title:title,cover:cover,address:address,create_time:current_time,content:content}
        let sql='INSERT INTO article SET  ?'
        db.sqlConnect(sql,sqlArr,(err,data)=>{
            if(err){
                throw err
                return
            }else{
                res.send({
                    statusCode:200,
                    msg:'发布成功'
                })
            }
        })
        
    })
}

searchkey=(req,res)=>{
    let keyword = req.query.keyword;
    console.log(keyword)
    let sql=`SELECT * FROM article where title like '%${keyword}%'`
    let sqlArr=[]
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        console.log(sql)
        if(err){
            throw err
            return
        }else{
            if(data.length>0){
                res.send({
                    msg:'为你找到如下结果：',
                    data
                })
            }else{
                res.send({
                    msg:'未找到相关结果'
                })
            }
        }
    })
}



module.exports = {
    article,login,register,modifypassword,upload,personal,person,addarticle,searchkey
}