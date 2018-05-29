/**
 * 查询浏览器Geolocation情况
 * @returns {Boolean} true为可用,false为不可用
 */
function checkGeolocation(bootBtn=document.getElementById('bootBtn'),status=document.getElementById('status'),fitViewBtn=document.getElementById('fitViewBtn')) {
    if (!navigator.geolocation) {
        alert('无法使用geolocation');
        bootBtn.style.display = 'block';
        return false;
    } else {
        navigator.geolocation.getCurrentPosition(() => {
            alert('启动成功');
            bootBtn.style.display = 'none';
            status.innerHTML = '正在运行';
            if(fitViewBtn){
                fitViewBtn.style.display = 'block';
            }
            return true;
        }, (err) => {
            alert('无法启动\n'+"错误代码:"+err.code+"错误消息:"+err.message);
            status.innerHTML = '错误';
            bootBtn.style.display = 'block';
            if(fitViewBtn){
                fitViewBtn.style.display = 'block';
            }
            console.error(err);
            return false;
        })
    }
}