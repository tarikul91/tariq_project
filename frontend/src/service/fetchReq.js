const axios = require('axios')
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.headers.post['Content-Type'] = 'application/json';
export const postReq = async(url,data,params=null,token=null) =>{
    try{
        const request = await axios({
            url:url,
            method:'post',
            data:data,
            
        })
        .then(res =>{
            if(res){
                return res.data
            }
            
        })
        .catch(er =>{
            if(er){
                throw er
            }
        })
        return request
    }
    catch(err){
        console.log(err);
        return 
    }
}

export const getReq = async(url,params=null,token=null) =>{
    try{
        const request = await axios({
            url:url,
            method:'get',
            params:params,
            headers:{
                "x-auth-token":token
            }
        })
        .then(res =>{
            if(res){
                return res.data
            }
        })
        .catch(er =>{
            if(er){
                throw er
            }
        })
        return request
    }
    catch(err){
        console.log(err);
        return 
    }
}