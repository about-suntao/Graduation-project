const jwt = require('jsonwebtoken');
 
 
module.exports = function(user_id){
    const token = jwt.sign({
        user_id: user_id
    }, '1025886304@qq.com', {
        expiresIn: 60,  //过期时间设置为60  
        issuer:"zzuly"     //发行人
    });
    return token;
};