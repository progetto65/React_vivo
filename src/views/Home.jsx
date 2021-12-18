import React, {Component} from 'react'
import request from '../utils/request'

import { NavBar, Space, Swiper, Image} from 'antd-mobile'
import {
    SearchOutline,
    UserOutline,
    }from 'antd-mobile-icons'

import './Home.scss'


import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.png'
import banner5 from '../assets/banner5.png'

export default class Home extends Component {
    state = {
        data:[],
        attach:[]
    }


    goto = (url)=>{
        this.props.history.push(url)
    }

    getData = async () =>{
        const {data} = await request.get('/category/list',{
            params:{
                page:1,
                size:10
            }
        })
        this.setState({
            data:data
        })
    }
    getAttach = async () =>{
        const {data} = await request.get('/category/sort',{
            params:{
                sort:'手机配件'
            }
        })
        this.setState({
            attach:data.data
        })
    }

    componentDidMount(){
        this.getData();
        this.getAttach();
    }

    render() {
        
        // 顶部栏右侧
        const right = (
            <div style={{ fontSize: 22, fontWeight:400 }}>
              <Space>
                <SearchOutline style={{ marginRight:16 }} onClick={()=>{this.goto('/search')}}/>
                <UserOutline onClick={()=>{this.goto('/mine')}}/>
              </Space>
            </div>
          )
        // 顶部栏
        const back = () =>{
            this.props.history.goBack();
        }

        // 轮播图
        const imgs = [banner1,banner2,banner3,banner4,banner5]
        const items = imgs.map((img, index) => (
        <Swiper.Item key={index}>
            <div
            style={{width:375, height:256 }}
            onClick={() => {
                this.goto('/details/'+'122206')
            }}
            >
            <Image src={img}/>
            </div>
        </Swiper.Item>
        ))
 
        return (
            <div id="home">
                {/* 顶部导航 */}
                <NavBar right={right} onBack={back}>
                        <span style={{fontSize:24}}>vivo</span>
                </NavBar>
                {/* 轮播图 */}
                <Swiper loop>{items}</Swiper>

                {/* 热销商品 */}
                <div className="hot">
                    {/* 热销标题 */}
                    <div className="hot-title">
                        <span className="phonetitle">精品手机</span> 
                    </div>

                    {/* 热销商品 */}
                    <div className="hot-list">
                        {
                            this.state.data.map(item=>{
                                return (
                                    <div className="hot-item" key={item.skuID} onClick={()=>{this.goto('/details/'+item.skuID)}}>
                                        <img src={require("../assets/images/"+item.images).default} />
                                        <h3>{item.skuName}</h3>
                                        <p className="promo">{item.brief}</p>
                                        <p className="item-price">{item.salePrice}</p>
                                    </div>
                                )
                            })
                        }
                        
                        
                    </div>
                </div>

                {/* 精品配件 */}
                <div className="hot attach">
                    {/* 标题 */}
                    <div className="hot-title">
                        <span className="phonetitle">精品配件</span> 
                    </div>
                    {/* 商品 */}
                    <div className="hot-list">
                        {
                            this.state.attach.map(item=>{
                                return (
                                    <div className="hot-item" key={item.skuID} onClick={()=>{this.goto('/details/'+item.skuID)}}>
                                        <img src={require("../assets/images/"+item.images).default} />
                                        <h3>{item.skuName}</h3>
                                        <p className="promo">{item.brief}</p>
                                        <p className="item-price">{item.salePrice}</p>
                                    </div>
                                )
                            })
                        }
                        
                        
                    </div>
                </div>

            </div>
        )
    }
}
