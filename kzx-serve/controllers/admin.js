var db =require('../util/dbpool')
const createToken = require('../token/createToken');


htlogin=(req,res)=>{
    let name = req.body.userName;
    let pwd = req.body.userPassword;
    let sql ="select password from users where username = '"+name+"'" 
    console.log(sql)
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
                console.log(userPassword)
                if(userPassword ==pwd){
                    let token = createToken(name);
                    let sql1 = "update users SET  token = '"+token+"' where username = '"+name+"'"
                    let sqlArr1 =[]
                    db.sqlConnect(sql1,sqlArr1,(err,data)=>{
                        if(err){
                            throw err
                            return
                        }
                    })
                    res.send({statusCode:200, msg:'登录成功',token:token,userName:name})
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

//请求用户表
user=(req,res,next)=>{
    let sql = "select * from k_user";
    let sqlArr = [];
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            console.log('连接出错')
        }else{
            res.send({
                'data':data
            })
        }
    })
}
//用户编辑请求数据
geteditinfo=(req,res,next)=>{
    let id=req.body.id
    let sql = "select * from k_user where id="+id+"";
    let sqlArr = [];
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            console.log('连接出错')
        }else{
            res.send({
                'data':data
            })
        }
    })
}
//编辑用户表
edituser=(req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let phone =req.body.phone
    let userpic = req.body.userpic
    let id =Number(req.body.id)
    let sql="update  k_user SET phone= '"+phone+"', userpic='"+userpic+"',name='" +username+"',password='" +password+"' where id = "+id+""
    console.log(sql)
    let sqlArr=[]
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            throw err
            return
        }else{
            res.send({
                statuscode:200
            })
        }
    })
}
//删除用户表
deleteuser=(req,res)=>{
    console.log(req.body)
    let id =req.body.id
    let sql ="delete from k_user where id="+id+""
    let sqlArr=[]
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            throw err
            return
        }else{
            res.send({
                statuscode:200
            })
        }
    })
}


//美食编辑展示
geteditfood=(req,res,next)=>{
    let id=req.body.id
    let sql = "select * from article where id="+id+"";
    let sqlArr = [];
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            console.log('连接出错')
        }else{
            res.send({
                'data':data
            })
        }
    })
}
//编辑美食
// editfood=(req,res)=>{
//     console.log(req.body)
//     let username = req.body.username
//     let password = req.body.password
//     let phone =req.body.phone
//     let userpic = req.body.userpic
//     let id =Number(req.body.id)
//     let sql="update  k_user SET phone= '"+phone+"', userpic='"+userpic+"',name='" +username+"',password='" +password+"' where id = "+id+""
//     console.log(sql)
//     let sqlArr=[]
//     db.sqlConnect(sql,sqlArr,(err,data)=>{
//         if(err){
//             throw err
//             return
//         }else{
//             res.send({
//                 statuscode:200
//             })
//         }
//     })
// }
//删除美食信息
deletearticle=(req,res)=>{
    console.log(req.body)
    let id =req.body.id
    let sql ="delete from article where id="+id+""
    let sqlArr=[]
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            throw err
            return
        }else{
            res.send({
                statuscode:200
            })
        }
    })
}

//旅游编辑展示
getedittravel=(req,res,next)=>{
    let id=req.body.id
    let sql = "select * from article where id="+id+"";
    let sqlArr = [];
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            console.log('连接出错')
        }else{
            res.send({
                'data':data
            })
        }
    })
}
//编辑旅游
editfood=(req,res)=>{
    let username = req.body.username
    let address =req.body.address
    let title =req.body.title
    let cover =req.body.cover
    let userpic = req.body.userpic
    let id =Number(req.body.id)
    let sql="update  article SET address= '"+address+"',title= '"+title+"',cover= '"+cover+"', userpic='"+userpic+"',username='" +username+"' where id = "+id+""
    console.log(sql)
    let sqlArr=[]
    db.sqlConnect(sql,sqlArr,(err,data)=>{
        if(err){
            throw err
            return
        }else{
            res.send({
                statuscode:200
            })
        }
    })
}

module.exports = {
    user,htlogin,geteditinfo,edituser,deleteuser,geteditfood,editfood,deletearticle
}