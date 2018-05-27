/**
 * 在地图上添加Staff Marker
 * @param {Float} lng 经度
 * @param {Float} lat 纬度 
 * @param {String} name Staff名字
 * @param {String} sid Socket ID
 * @requires markers Makers队列
 * @requires AMap 高德地图类
 */
function addStaffMarker(lng, lat, name, sid) {
    const marker = new AMap.Marker({
        icon: "https://png.icons8.com/office/32/000000/administrator-male.png",
        position: [lng, lat],
        animation: "AMAP_ANIMATION_DROP",
        extData: {
            sid
        }
    })
    marker.setLabel({
        offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
        content: name
    })
    markers.push(marker);
}
/**
 * 在地图上添加客户端Marker
 * @param {Float} lng 经度
 * @param {Float} lat 纬度
 * @requires map 高德地图本地对象
 */
function addClientMarker(lng, lat) {
    const marker = new AMap.Marker({
        icon: "https://png.icons8.com/ios-glyphs/32/000000/street-view.png",
        position: [lng, lat],
        animation: "AMAP_ANIMATION_DROP"
    });
    clientMarker = marker;
    marker.setMap(map);
}
/**
 * 更新Staff Marker位置
 * @param {Float} lng 经度
 * @param {Float} lat 纬度 
 * @param {String} name Staff名字
 * @param {String} sid Socket ID
 * @requires markers Makers队列
 */
function updateMarker(lng, lat, index, sid) {
    markers[index].setPosition([lng, lat]);
}
/**
 * 更新客户端Marker
 * @param {Float} lng 经度
 * @param {Float} lat 纬度
 * @requires clientMarker 本地客户端Marker对象
 */
function updateClientMarker(lng, lat) {
    clientMarker.setPosition([lng, lat]);
}