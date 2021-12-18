
let userInfo = localStorage.getItem('userInfo');
try{
    userInfo = JSON.parse(userInfo) || {}
}catch(err){
    userInfo = {}
}

const initState = {
    userInfo,
}

const reducer = function(state=initState,action){
    // 模块化后，state为当前state
    switch(action.type){
        case 'login':
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
            return {
                ...state,
                userInfo:action.payload
            }
        case 'logout':
            localStorage.removeItem('userInfo')
            return {
                ...state,
                userInfo:{}
            }
        
        default:
            return state;
    }
}

export default reducer;