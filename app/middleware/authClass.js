const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
    }
    get check() {
        return async (ctx, next) => {
            try {
                var decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.cert)
            } catch (error) {
                if (error.name == 'TokenExpiredError'){
                    ctx.status = 401
                    ctx.body = {
                        errcode: 1,
                        msg: 'token已过期,请重新登录'
                    }
                    return
                }
                ctx.status = 401
                ctx.body = {
                    status: 1,
                    msg: '授权失败，请重新登录'
                }
                return
            }

            if(decode.scope < this.level){
                ctx.status = 401
                ctx.body = {
                    errcode: 1,
                    msg: '权限不足'
                }
                return
            }
            await next()
        }
    }
}

module.exports = {
    Auth
}