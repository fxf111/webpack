import commom from './common';

import show from './show'; //demo
const API_URL_PREFIX = ''; //
const api = {
    ...commom,      //get和post方法
    ...show,		//demo
};
export default api;