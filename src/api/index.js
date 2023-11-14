/*
统一管理项目中的ajax请求
 */
import ajax from './ajax'

export const reqVerifyCode = (phone)=>ajax.post('/login/digits',{phone})
export const reqLogin = (phone,code)=>ajax.post('/login/phone',{phone,code})


//请求校验用户身份
export const reqVerifyToken = () =>
    ajax.post('/login/verify')

export const reqLogout = (id) =>
    ajax.post('/logout',{id})