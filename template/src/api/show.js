//demo
import API_URL_PREFIX from 'types'
function getData(data) {
    return $post(API_URL_PREFIX + '/test',data)
}

let show = {
    getData,
}

export default show