import React, { useEffect } from "react";
import { List } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useDispatch} from 'react-redux'

import {logout} from '../store/actions/user'

import {
  UnorderedListOutline,
  PayCircleOutline,
  EyeInvisibleOutline,
  KeyOutline,
  BankcardOutline,
  PhoneFill,
} from "antd-mobile-icons";

import c45 from "../assets/C45.webp";
import vivo from "../assets/vivo.png";
import "./Mine.scss";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let userInfo = localStorage.getItem("userInfo");
  try {
    userInfo = JSON.parse(userInfo) || {};
  } catch (err) {
    userInfo = {};
  }

  useEffect(() => {
    if (!userInfo.username) {
      history.push("/Login");
    }
  }, []);

  return (
    <>
      <div className="usercenter">
        <div className="logo">
          <img src={vivo} />
          <p>账号中心</p>
        </div>
      </div>

      <div className="userInfo">
        <img src={c45} />
        <p>{userInfo.username}</p>
      </div>

      <div className="list">
        <List>
          <List.Item
            prefix={<UnorderedListOutline />}
            arrow={false}
            onClick={() => {
              dispatch(logout())
              history.push("/login");
            }}
          >
            退出登录
          </List.Item>
          <List.Item prefix={<PayCircleOutline />} arrow={false}>
            我的订单
          </List.Item>
          <List.Item prefix={<EyeInvisibleOutline />} arrow={false}>
            修改密码
          </List.Item>
          <List.Item prefix={<PhoneFill />} arrow={false} >
            安全手机
          </List.Item>
          <List.Item prefix={<BankcardOutline />} arrow={false}>
            安全邮箱
          </List.Item>
          <List.Item prefix={<KeyOutline />} arrow={false} >
            密保问题
          </List.Item>
        </List>
      </div>
    </>
  );
};
