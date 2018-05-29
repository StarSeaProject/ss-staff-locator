'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * 获取位置类 
 */
var getLocation = function () {
    /**
     * 构造器
     * 在WS上监听location update和staff disconnect
     * @requires socket socket.io对象
     */
    function getLocation() {
        _classCallCheck(this, getLocation);

        this.getStaffLocation = this.getStaffLocation.bind(this);
        this.getStaffLocationFromSocket = this.getStaffLocationFromSocket.bind(this);
        this.staffDisconnect = this.staffDisconnect.bind(this);
        this.resizeMap = this.resizeMap.bind(this);
        socket.on('staff init join', this.resizeMap);
        socket.on('location update', this.getStaffLocationFromSocket);
        socket.on('staff disconnect', this.staffDisconnect);
    }
    /**
     * 将WS数据存储到类中
     * @requires this.staffLocation
     * @param {*} data 从WS中获取的信息
     */


    _createClass(getLocation, [{
        key: 'getStaffLocationFromSocket',
        value: function getStaffLocationFromSocket(data) {
            this.staffLocation = data;
        }
        /**
         * 获取Staff地理位置
         * @requires this.staffLocation
         * @returns {Object} 所有Staff的地理位置
         */

    }, {
        key: 'getStaffLocation',
        value: function getStaffLocation() {
            return this.staffLocation;
        }
        /**
         * Staff断开链接
         * @param {Object} data 从WS中获取的信息
         * @requires this.staffLocation
         * @requires markers 本地Staff Markder序列
         */

    }, {
        key: 'staffDisconnect',
        value: function staffDisconnect(data) {
            this.staffLocation.staffList.splice(data.index, 1);
            markers[data.index].setMap(null);
            markers.splice(data.index, 1);
        }

        /**
         * Staff加入
         */

    }, {
        key: 'resizeMap',
        value: function resizeMap() {
            map.setFitView();
        }
    }]);

    return getLocation;
}();