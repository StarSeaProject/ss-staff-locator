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
 * 发送地理位置类
 */
var sendLocation = function () {
    /**
     * 构造器
     * 监听WS事件:staff join和staff join cb
     * @param {Object} params {name:名字}
     * @requires socket Socket.io对象
     */
    function sendLocation(params) {
        var _this = this;

        _classCallCheck(this, sendLocation);

        this.name = params.name;
        this.setStaffLocation = this.setStaffLocation.bind(this);
        socket.emit('staff join', JSON.stringify(this));
        socket.on('staff join cb', function (data) {
            _this.sid = data.sid;
        });
    }
    /**
     * 设置Staff位置
     * @param {*} geolocation 浏览器Geolocation对象
     * @returns {object} 给WS发送的数据包
     */


    _createClass(sendLocation, [{
        key: 'setStaffLocation',
        value: function setStaffLocation(geolocation) {
            this.packet = JSON.stringify({
                sid: this.sid,
                location: this.location,
                lastUpdate: this.lastUpdate
            });
            this.location = {
                latitude: geolocation.coords.latitude,
                longitude: geolocation.coords.longitude,
                accuracy: geolocation.coords.accuracy
            };
            this.lastUpdate = Date.now();
            socket.emit('staff location update', this.packet);
            return JSON.parse(this.packet);
        }
    }]);

    return sendLocation;
}();