import {Button, InputItem, NavBar, Toast} from "antd-mobile";
import './index.less'
import github from './imgs/github.png'
import qq from './imgs/qq.png'
import wechat from './imgs/wechat.png'
import {Component} from "react";
import regs from '../../utils/reg'
import {reqLogin, reqVerifyCode} from "../../api";
export default class Login extends Component{

    state = {
        phone:'',
        verifyCode:'',
        canClick:true,
        time:10
    }
    githubLogin= ()=>{
        window.location.href='https://github.com/login/oauth/authorize?client_id=908ba7f76c6df2f6ac33'
    };

    saveData(type) {
        return (value)=>{
            let reg = regs[type];
            if (reg.test(value)) {
                this.setState({[type]:value})
            } else {
                this.setState({[type]:''})
            }
        };
    }

    login = async ()=>{
        const {phone,verifyCode} = this.state;
        if (!(phone&&verifyCode)) {
            return Toast.fail('请检查手机号或验证码格式',2)
        }
        let result = await reqLogin(phone,verifyCode)
        const {code,message} = result
        if (code===20000){
            Toast.success('登录成功！')
            this.props.history.push('/usercenter')
        } else {
            Toast.fail(message,2)
        }
    }

    getVerifyCode = async ()=>{
        const {phone,canClick} = this.state;
        console.log('获取验证码')
        // 如果按钮不能点，直接退出
        if (!canClick) return
        // 校验手机号是否存在
        if (!phone) {
            return Toast.fail('手机号码格式不合法')
        }
        // 设置状态，使按钮不可点击
        this.setState({canClick: !canClick})
        // 开启定时器更新倒计时
        this.timer = setInterval(()=>{
            let {time} = this.state
            time--
            if (time<0){
                clearInterval(this.timer)
                return this.setState({canClick: true,time: 10})
            }
            this.setState({time})
        },1000)

        await reqVerifyCode(undefined)
        Toast.success('验证码发送成功')

    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const {time,canClick,phone,verifyCode} = this.state
        return (
            <div>
                <div className="login">
                    {/* 顶部导航区 */}
                    <NavBar mode="light">手机验证码登录</NavBar>
                    {/* 手机验证码输入框 */}
                    <InputItem onChange={this.saveData('phone')} clear placeholder="请输入手机号"/>
                    {/* 验证码输入框 */}
                    <div className="verify-input">
                        <InputItem onChange={this.saveData('verifyCode')} clear placeholder="请输入验证码"/>
                        <button onTouchEnd={this.getVerifyCode}
                                style={{color:canClick ? '#F40700' : 'gray'}}
                                className="verify-btn">获取验证码{canClick?'':`(${time})`}</button>
                    </div>
                    <Button
                        onTouchEnd={this.login}
                        type="primary"
                        disabled={(!(phone && verifyCode))}>登录</Button>
                    {/* 底部其他登录方式区 */}
                    <footer className="footer">
                        <span className="other">其他登录方式</span>
                        <div className="login-type">
                            <img onTouchEnd={this.githubLogin} src={github} alt=""/>
                            <img src={qq} alt=""/>
                            <img src={wechat} alt=""/>
                        </div>
                        <span className="footer-text">未注册的手机号，验证后会自动创建硅谷账号，登录即代表您同意：
					<a href="http://www.atguigu.com">《硅谷隐私政策》</a>
					</span>
                    </footer>
                </div>
            </div>
        )
    }


}