import React, { Component } from "react";

import { Input, List, Button,Modal } from "antd-mobile";
import { withRouter } from "react-router-dom";

import request from "../utils/request";
import "./Reg.scss";

import vivo from "../assets/vivo.png";

class Reg extends Component {
  state = {
    username: "",
    password: "",
  };

  doReg = async ()=>{
    await request.post('/user/reg',{
        username:this.state.username,
        password:this.state.password
    })
    this.props.history.push('/login')
  }


  render() {
    return (
      <>
        <div className="usercenter">
          <div className="logo">
            <img src={vivo} />
            <p>注册账号</p>
          </div>
        </div>

        <List
          style={{
            "--prefix-width": "6em",
          }}
        >
          <List.Item prefix="用户名">
            <Input
              placeholder="请输入用户名"
              clearable
              onChange={(e) => {
                this.setState({ username: e });
              }}
            />
          </List.Item>
          <List.Item prefix="密码">
            <Input
              placeholder="请输入密码"
              clearable
              type="password"
              onChange={(e) => {
                this.setState({ password: e });
              }}
            />
          </List.Item>
        </List>
        <div className="btn">
          <Button
            block
            shape="rounded"
            color="primary"
            style={{ width: 300, marginTop: 12 }}
            onClick={() => {
                Modal.alert({
                    content:'注册成功！'
                })
                this.doReg()
            }}
          >
            注册
          </Button>

          <Button
            block
            shape="rounded"
            
            style={{ width: 300, marginTop: 12 }}
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            已有账号？点击登录
          </Button>
        </div>
      </>
    );
  }
}
export default withRouter(Reg);
