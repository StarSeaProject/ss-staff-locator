const scope = require('./scope');
const findArr = require('../helpers/findObjInArr');
module.exports = io => {
    /**
     * WS Event
     */
    io.on('connection', (socket) => {
        scope.cureentConnection++;
        /**
         * Staff地理位置更新
         * @returns {Object} 广播本地内存Scope
         */
        socket.on('staff location update', (data) => {
            var data = JSON.parse(data);
            var index = findArr(scope.staffList, 'sid', data.sid);
            if (index < -1) {
                socket.emit('error', index)
            }
            scope.staffList[index] = { ...scope.staffList[index],
                ...data,
                locationInfo: true
            }
            io.emit('location update', scope);
        })
        /**
         * Staff进入
         * @returns {string} Socket ID 
         */
        socket.on('staff join', (data) => {
            var data = JSON.parse(data)
            scope.staffList.push({
                sid: socket.conn.id,
                name: data.name,
                locationInfo: false
            })
            socket.emit('staff join cb', {
                sid: socket.conn.id
            })
        })
        /**
         * WS断开链接
         * @returns {Socket} 断开Staff的Socket ID
         */
        socket.on('disconnect', () => {
            scope.cureentConnection--;
            var index = findArr(scope.staffList, 'sid', socket.conn.id);
            if (index > -1) {
                io.emit('staff disconnect', {
                    index,
                    sid: socket.conn.id
                })
                scope.staffList.splice(index, 1);
            }
        })
    });
}