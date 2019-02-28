import Vue from 'vue';
import axios from 'axios';
window.axios = Vue.prototype.axios = axios;
window.reqList={};
/**
 * POST方法
 * @param {String} url 请求接口地址
 * @param {Object} data 传递的参数
 * @param {Function} resolve 请求成功执行的方法
 * @param {Function} reject 请求失败执行的方法
 */
const post = Vue.prototype.$post = window.$post = function post(url, data) {
    // if(window.reqList[url]){
    //     // return new Promise(function(){
    //     //     return new Error();
    //     // });
    //     return Promise.reject(new Error())
    // }else {
    //     window.reqList[url]=true;
    // }
    return axios({
        url,
        method: 'post',
        data,
        transformRequest: [function(data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(res) {
        //window.reqList[res.config.url]=false;
        let routeName = app.$route.name;
        try {
            //未登陆状态
            if (res.data.code == 'error') {
                if(routeName == 'login') {
                    return Promise.resolve(res);
                }
                return Promise.reject(res);
            }
            //登陆状态
            if(routeName==='login') {
                app.$router.push({name:'index'});
                return;
            }
            return Promise.resolve(res);            
        } catch(e) {
            return Promise.reject(e);
        }


    }).catch((err,res) => {
        console.log(err,res);
        debugger;
        if(err instanceof Error) return;
        app.$router.push({
            name:'login',
        })
    });
};
const get = Vue.prototype.$get = window.$get = function post(url, params) {
    return axios.get(url, {
        params

    }).then(function(res) {
        if (res.data.status == -1) {
            return Promise.reject(res);
        }
        return Promise.resolve(res);
    }).catch(err => {

        window.location.href=window.location.origin+'/manage';
    });
};

export default {
    post,
    get
}
