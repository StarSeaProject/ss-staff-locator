/**
 * 发送地理位置类
 */
class sendLocation {
    /**
     * 构造器
     * 监听WS事件:staff join和staff join cb
     * @param {Object} params {name:名字}
     * @requires socket Socket.io对象
     */
    constructor(params) {
        this.name = params.name;
        this.setStaffLocation = this.setStaffLocation.bind(this);
        socket.emit('staff join', JSON.stringify(this))
        socket.on('staff join cb', data => {
            this.sid = data.sid
        })
    }
    /**
     * 设置Staff位置
     * @param {*} geolocation 浏览器Geolocation对象
     * @returns {object} 给WS发送的数据包
     */
    setStaffLocation(geolocation) {
        this.packet = JSON.stringify({
            sid: this.sid,
            location: this.location,
            lastUpdate: this.lastUpdate
        })
        this.location = {
            latitude: geolocation.coords.latitude,
            longitude: geolocation.coords.longitude,
            accuracy: geolocation.coords.accuracy
        };
        this.lastUpdate = Date.now();
        socket.emit('staff location update', this.packet)
        return JSON.parse(this.packet);
    }

}