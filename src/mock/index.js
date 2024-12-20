import Mock from 'mockjs'

import user from './modules/user'

const { mock } = Mock;
mock("/api/user/login","post",user.login)