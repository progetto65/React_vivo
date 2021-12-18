import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import request from '../utils/request'
import { Button, SearchBar, Space, Toast } from 'antd-mobile'

import './Search.scss'

export default  ()=>{
    const history = useHistory();
    const [res,setRes] = useState([])
   
    const doSearch = async (val) =>{
        const {data} = await request.get('/search',{
            params:{
                msg:val
            }
        })
        setRes(data);
    }

    return (
        <>
        <div className="searchbox">

            <Space block direction='vertical'>
                <SearchBar
                    placeholder='圣诞降临，优惠不断！'
                    showCancelButton
                    onSearch={val => {
                        doSearch(val)
                    }}
                />
            </Space>

            <p className='content-title'>大家都在搜</p>
            <Button size="mini" onClick={()=>{doSearch('IQOO')}}>IQOO</Button>
            <Button size="mini" onClick={()=>{doSearch('vivo S')}}>vivo S</Button>
            <Button size="mini" onClick={()=>{doSearch('耳机')}}>耳机</Button>
            <Button size="mini" onClick={()=>{doSearch('充电')}}>充电</Button>
            <Button size="mini" onClick={()=>{doSearch('飞智')}}>飞智</Button>
        </div>

        {/* 搜索结果 */}
            
                <div className="hot">
                    {/* 标题 */}
                    <div className="hot-title">
                        <span className="phonetitle">搜索结果</span> 
                    </div>

                    {/* 商品 */}
                    <div className="hot-list">
                        {
                            res.map(item=>{
                                return (
                                    <div className="hot-item" key={item.skuID} onClick={()=>{history.push('/details/'+item.skuID)}}>
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
        </>
    )
}

