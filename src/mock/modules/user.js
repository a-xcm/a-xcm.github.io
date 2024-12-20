import { Random } from 'mockjs'

function login (req) {
    console.log("login参数",req.body)
    return {
        code: 200,
        data: {
            username:Random.cname(),
            token: Random.guid(),
            message:'登录成功'
        }
    }
}

export default {
    login
}