import React, { Component } from "react";
import { Input, List, Button } from "antd-mobile";
import {withRouter} from 'react-router-dom'

import store from '../store'
import {login} from '../store/actions/user'

import request from '../utils/request'
import "./Login.scss";

import vivo from "../assets/vivo.png";

class Login extends Component {
  state = {
    username:'',
    password:''
  };

  doLogin = async () =>{
    await request.post('/user/login',{
      username:this.state.username,
      password:this.state.password
    }).then(res =>{
      const {data} = res.data || [];
      if(data){
        console.log(data[0]);
        const oneuser = {
          username:data[0].username
        }
        store.dispatch(login(oneuser))
        this.props.history.push('/home')
      }else{
        window.alert('用户名或密码错误')
      }
    })
    
  }

  render() {

    return (
      <>
        <div className="usercenter">
          <div className="logo">
            <img src={vivo} />
            <p>用户登录</p>
          </div>
        </div>

        {/* 输入框 */}
        <List
          style={{
            "--prefix-width": "6em",
          }}
        >
          <List.Item prefix="用户名">
            <Input placeholder="请输入用户名" clearable onChange={(e)=>{this.setState({username:e})}}/>
          </List.Item>
          <List.Item prefix="密码">
            <Input placeholder="请输入密码" clearable type="password" onChange={(e)=>{this.setState({password:e})}}/>
          </List.Item>
        </List>
        <div className="btn">
          <Button
            block
            shape="rounded"
            color="primary"
            style={{ width: 300, marginTop: 12 }}
            onClick={()=>{this.doLogin()}}
          >
            登录
          </Button>

          <Button
            block
            shape="rounded"
            style={{ width: 300, marginTop: 12 }}
            onClick={() => {
              this.props.history.push("/reg");
            }}
          >
            注册
          </Button>
        </div>
      </>
    );
  }
}

export default withRouter(Login);