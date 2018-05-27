class sendLocation{
    constructor(params) {
        this.name = params.name;
        this.setStaffLocation = this.setStaffLocation.bind(this);
        socket.emit('staff join',JSON.stringify(this))
        socket.on('staff join cb',data=>{
            this.sid = data.sid
        })
    }

    setStaffLocation(geolocation){
        this.packet = JSON.stringify({
            sid:this.sid,
            location:this.location,
            lastUpdate:this.lastUpdate
        })
        this.location = {
            latitude: geolocation.coords.latitude,
            longitude: geolocation.coords.longitude,
            accuracy: geolocation.coords.accuracy
        };
        this.lastUpdate = Date.now();
        socket.emit('staff location update',this.packet)
        return JSON.parse(this.packet);
    }

}