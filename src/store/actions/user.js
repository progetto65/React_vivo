import request from '@/utils/request'


export function login(data){
    return {
        type:'login',
        payload:data
    }
}
export function logout(){
    return {
        type:'logout'
    }
}

// 异步操作：redux-thunk中间件（支持函数action）
export function loginAsync(values){
    return async function(dispatch){
        const {data} = await request.get('/user/login',{
            params:values
        })
        // 登录成功后，修改redux数据
        dispatch(login(data.data))

        return data;
    }
}

export default {
    login,
    logout,
    loginAsync
}