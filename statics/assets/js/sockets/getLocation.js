class getLocation{
    constructor(params) {
        this.getStaffLocation = this.getStaffLocation.bind(this);
        this.getStaffLocationFromSocket = this.getStaffLocationFromSocket.bind(this);
        this.staffDisconnect = this.staffDisconnect.bind(this);
        socket.on('location update',this.getStaffLocationFromSocket);
        socket.on('staff disconnect',this.staffDisconnect);
    }

    getStaffLocationFromSocket(data){
        this.staffLocation = data
    }

    getStaffLocation(){
        return this.staffLocation;
    }

    staffDisconnect(data){
        this.staffLocation.staffList.splice(data.index,1);
        markers[data.index].setMap(null);
        markers.splice(data.index,1);
    }

}