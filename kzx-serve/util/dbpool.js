const mysql  = require('mysql');

module.exports ={
    config:{
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'kzx',
        charset  : 'utf8'
    },
    sqlConnect:function(sql,sqlArr,callback){
        var pool =mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                console.log('连接失败')
            }
            conn.query(sql,sqlArr,callback);
            conn.release();
        })

    }
}
