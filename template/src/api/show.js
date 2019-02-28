//demo
function getData(data) {
    return $post('/test',data)
}

let show = {
    getData,
}

export default show