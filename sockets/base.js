const scope = require('./scope');
const findArr = require('../helpers/findObjInArr');
module.exports = io => {
    io.on('connection', (socket) => {
        scope.cureentConnection++;
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