/*
对axios的统一封装，目的是，统一处理请求的错误，返回服务器的数据
 */
import axios from "axios";
import NProgress from 'nprogress'
import {Toast} from "antd-mobile";

// 请求拦截器
axios.interceptors.request.use(config=>{
    NProgress.start(); // 进度条开始
    return config
});

// 响应拦截器
axios.interceptors.response.use(
    response =>{
        NProgress.done();
        return response.data;
    },
    error=>{ // 如果状态码不是以2开头，就会进入该回调
        NProgress.done()
        Toast.fail(error.message);
        return new Promise(()=>{})
    }
)

export default axios

