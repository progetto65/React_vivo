import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { NavBar, Space, Toast, Tabs, Badge } from "antd-mobile";

import request from "../utils/request";

import "./Category.scss";

export default () => {
  const history = useHistory();

  const [category, changeCg] = useState([]);
  const [TabName, setTabName] = useState([
    "手机",
    "手机充电",
    "手机配件",
    "音乐设备",
    "智能硬件",
    "游戏摄影",
    "日用出行",
  ]);

  const doSearch = async (val) => {
    const { data } = await request.get("/category/sort", {
      params: {
        sort: val,
      },
    });
    changeCg(data.data);
  };
  // 指定空依赖，类似于componentDidMount
  useEffect(() => {
    doSearch("手机");
  }, []);

  const right = (
    <div style={{ fontSize: 18 }}>
      <Link
        to="/search"
        style={{ fontSize: 14, color: "blue", textDecoration: "none" }}
      >
        搜索
      </Link>
    </div>
  );

  const back = () => {
    history.goBack();
  };

  return (
    <>
      {/* 顶部栏 */}
      <NavBar right={right} onBack={back}>
        分类
      </NavBar>

      {/* 标签页 */}
      <Tabs
        defaultActiveKey={TabName[0]}
        onChange={(e) => {
          doSearch(e);
        }}
      >
        {TabName.map((oneTab, index) => {
          return (
            <Tabs.Tab title={TabName[index]} key={TabName[index]}>
              <div className="hot">
                {/* 标题 */}
                <div className="hot-title">
                  <span className="phonetitle">{oneTab}</span>
                </div>

                {/* 商品 */}
                <div className="hot-list">
                  {category.map((item) => {
                    return (
                      <div
                        className="hot-item"
                        key={item.skuID}
                        onClick={() => {
                          history.push("/details/" + item.skuID);
                        }}
                      >
                        <img
                          src={
                            require("../assets/images/" + item.images).default
                          }
                        />
                        <h3>{item.skuName}</h3>
                        <p className="promo">{item.brief}</p>
                        <p className="item-price">{item.salePrice}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </>
  );
};
