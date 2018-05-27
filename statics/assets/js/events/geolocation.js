function checkGeolocation(){
    if(!navigator.geolocation){
        alert('无法使用geolocation');
        return false;
    }else{
        navigator.geolocation.getCurrentPosition(()=>{
            alert('启动成功');
            return true;
        },(err)=>{
            alert('无法启动');
            return false;
        })
    }
}