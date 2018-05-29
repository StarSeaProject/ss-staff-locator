/**
 * 获取位置类 
 */
class getLocation {
    /**
     * 构造器
     * 在WS上监听location update和staff disconnect
     * @requires socket socket.io对象
     */
    constructor() {
        this.getStaffLocation = this.getStaffLocation.bind(this);
        this.getStaffLocationFromSocket = this.getStaffLocationFromSocket.bind(this);
        this.staffDisconnect = this.staffDisconnect.bind(this);
        this.resizeMap = this.resizeMap.bind(this);
        socket.on('staff init join',this.resizeMap);
        socket.on('location update', this.getStaffLocationFromSocket);
        socket.on('staff disconnect', this.staffDisconnect);
    }
    /**
     * 将WS数据存储到类中
     * @requires this.staffLocation
     * @param {*} data 从WS中获取的信息
     */
    getStaffLocationFromSocket(data) {
        this.staffLocation = data
    }
    /**
     * 获取Staff地理位置
     * @requires this.staffLocation
     * @returns {Object} 所有Staff的地理位置
     */
    getStaffLocation() {
        return this.staffLocation;
    }
    /**
     * Staff断开链接
     * @param {Object} data 从WS中获取的信息
     * @requires this.staffLocation
     * @requires markers 本地Staff Markder序列
     */
    staffDisconnect(data) {
        this.staffLocation.staffList.splice(data.index, 1);
        markers[data.index].setMap(null);
        markers.splice(data.index, 1);
    }

    /**
     * Staff加入
     */
    resizeMap(){
        map.setFitView();
    }

}