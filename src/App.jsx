import React from "react";
import { Route, Switch } from "react-router-dom";

import { Redirect, withRouter } from "react-router";

import { NavBar, Space, TabBar, Badge } from "antd-mobile";
import {
  UserOutline,
  AppOutline,
  UnorderedListOutline,
  AppstoreOutline,
} from "antd-mobile-icons";

import "./App.scss";

import Category from "./views/Category";
import Details from "./views/Details";
import Mine from "./views/Mine";
import Search from "./views/Search";
import Home from "./views/Home";
import Login from './views/Login';
import Reg from './views/Reg';

class App extends React.Component {
  goto = (url) => {
    this.props.history.push(url);
  };

  render() {
    const { pathname } = this.props.location;

    // 底部导航
    const tabs = [
      {
        key: "/home",
        title: "首页",
        icon: <AppOutline />,
        badge: Badge.dot,
      },
      {
        key: "/search",
        title: "搜索",
        icon: <UnorderedListOutline />,
      },
      {
        key: "/category",
        title: "分类",
        icon: <AppstoreOutline />,
      },
      {
        key: "/mine",
        title: "个人中心",
        icon: <UserOutline />,
      },
    ];

    return (
      <div className="appTabBar">
        {/* 底部标签栏 */}
        <div className="bottom">
          <TabBar
            activeKey={pathname}
            onChange={(e) => {
              this.goto(e);
            }}
          >
            {tabs.map((item) => (
              <TabBar.Item
                key={item.key}
                icon={item.icon}
                title={item.title}
                badge={item.badge}
              />
            ))}
          </TabBar>
        </div>

        <Switch>
          <Route path="/category" component={Category} />
          <Route path="/details" component={Details} />
          <Route path="/mine" component={Mine} />
          <Route path="/search" component={Search} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/reg" component={Reg} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
