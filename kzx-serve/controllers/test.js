var db =require('../util/db')

getuser=(req,res,next)=>{
    var sql = "select * from users";
    var sqlArr = [];
    db.query(sql,sqlArr,function(results,fields){
        res.send({
        'data':results,
        })
    })
}

useredit=(req,res,next)=>{
    let{id}=req.query;
    var sql ='select * from users where id=?'
    let sqlArr=[id];
    db.query(sql,sqlArr,function(err,results,fields){
        res.send({
        'data':results,
        })
    })
}

module.exports = {
    getuser,useredit
}