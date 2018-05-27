/**
 * Staff模式下获取名字并启动staff模式
 * @requires ./staffMode
 */
var btn = document.getElementById('stfSubmitBtn');
btn.addEventListener('click', function () {
    var name = document.getElementById('nameInput').value;
    var instance = M.Modal.getInstance(document.getElementById('staffModal'));
    staffMode(name);
    instance.close();
})