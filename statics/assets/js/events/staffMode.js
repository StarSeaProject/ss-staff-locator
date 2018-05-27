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
    setInterval(update, 1000)

    function update() {
        navigator.geolocation.getCurrentPosition(geolocation => {
            var log = staff.setStaffLocation(geolocation);
            var element = document.getElementById("staffLog");
            var sysLog = document.getElementById('sysLog');
            sysLog.innerHTML = JSON.stringify(client.getStaffLocation(), null, 2);
            element.innerHTML = JSON.stringify(log, null, 2) + "<br>";
            element.scrollTop = element.scrollHeight;
        })
    }
}