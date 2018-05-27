function clientMode() {

    checkGeolocation();

    const client = new getLocation();
    addClientMarker(0, 0);
    setInterval(update, 1000);

    function update() {
        navigator.geolocation.getCurrentPosition(geolocation => {
            var log = client.getStaffLocation();
            updateClientMarker(geolocation.coords.longitude, geolocation.coords.latitude);
            for (var i = 0; i < log.staffList.length; i++) {
                if (!markers[i] || log.staffList[i].sid !== markers[i].getExtData().sid) {
                    addStaffMarker(0, 0, log.staffList[i].name, log.staffList[i].sid);
                }
                console.log(log.staffList[i].sid+","+markers[i].getExtData().sid+i);
                if (markers[i] && log.staffList[i].sid == markers[i].getExtData().sid && log.staffList[i].locationInfo) {
                    updateMarker(log.staffList[i].location.longitude, log.staffList[i].location.latitude, i, log.staffList[i].sid);
                }
                markers[i].setMap(map);
            }
        })
    }
}