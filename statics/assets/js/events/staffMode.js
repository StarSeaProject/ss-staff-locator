/**
 * Staff模式
 * @requires sendLocation
 * @requires getLocation
 * @param {String} name staff名字 
 */
function staffMode(name) {

    checkGeolocation();

    const staff = new sendLocation({
        name
    });
    const client = new getLocation();

    const lastUpdate = document.getElementById('lastUpdate');
    const stfName = document.getElementById('stfName');
    const socketId = document.getElementById('socketId');

    const warningText = document.getElementById('warning-text');

    setInterval(update, 1000);

    /**
     * 以一个对象里面的key在Array里面查找对应的数值并返回index值
     * @param {Array} arr Array序列
     * @param {any} key Key键
     * @param {any} val 需要的数值
     * @returns {number} 查找到的Index位置，未找到将返回-1
     */
    function findObjInArr(arr, key, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == val) {
                return i
            }
        }
        return -1;
    }

    function update() {
        navigator.geolocation.getCurrentPosition(geolocation => {
            var log = staff.setStaffLocation(geolocation);
            var server = client.getStaffLocation();
            var element = document.getElementById("staffLog");
            var sysLog = document.getElementById('sysLog');  

            if(server.staffList){
                var index = findObjInArr(server.staffList,'sid',log.sid);
                if(index > -1){
                    lastUpdate.innerHTML = moment(server.staffList[index].lastUpdate).fromNow();
                    stfName.innerHTML = server.staffList[index].name;
                    socketId.innerHTML = server.staffList[index].sid;
                }
            }

            sysLog.innerHTML = JSON.stringify(server, null, 2);
            element.innerHTML = JSON.stringify(log, null, 2) + "<br>";
            element.scrollTop = element.scrollHeight;
        })
    }
}