/**
 * 查询浏览器Geolocation情况
 * @returns {Boolean} true为可用,false为不可用
 */
function checkGeolocation() {
    if (!navigator.geolocation) {
        alert('无法使用geolocation');
        return false;
    } else {
        navigator.geolocation.getCurrentPosition(() => {
            alert('启动成功');
            return true;
        }, (err) => {
            alert('无法启动\n'+"错误代码:"+err.code+"错误消息:"+err.message);
            console.error(err);
            return false;
        })
    }
}