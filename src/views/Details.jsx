import React, { useState, useEffect } from "react";
import request from "../utils/request";
import "./Details.scss";

import compare from "../assets/compare.png";
import like from "../assets/like.png";
import newgoods from "../assets/newgoods.png";
import Vbuy from "../assets/Vbuy.png";

export default (props) => {
  const [state, setState] = useState([]);

  useEffect(async () => {
    const skuID = props.location.pathname.substring(9);
    const { data } = await request.get("/category/details", {
      params: {
        id: skuID,
      },
    });

    setState(data.data);
  }, []);

  return (
    <>
      {state.map((item) => {
        return (
          <div key={item.skuID}>
            <div className="logo">
              <img src={require("../assets/images/"+item.images).default} />
              <div className="content"></div>
            </div>

            <div className="promotion">
              <div className="price-item">
                <span>{item.salePrice}</span>
                <del>{item.marketPrice}</del>
                <div className="discount">3期免息</div>
              </div>
              <div className="quickbuy">
                <img src={Vbuy} />
              </div>
            </div>

            <div className="product-info">
              <div className="header-info">
                <div className="left">
                  <img src={newgoods} />
                  <span>{item.skuName}</span>
                </div>
                <div className="right">
                  <div className="pk">
                    <img src={compare} />
                    <span>对比</span>
                  </div>
                  <div className="like">
                    <img src={like} />
                    <span>收藏</span>
                  </div>
                </div>
              </div>

              <div className="intro">
                { item.brief + item.promotion}
              </div>
            </div>
          </div>
        );
      })}

     
    </>
  );
};
