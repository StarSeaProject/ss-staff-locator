var btn = document.getElementById('stfSubmitBtn');
btn.addEventListener('click',function(){
    var name = document.getElementById('nameInput').value;
    var instance = M.Modal.getInstance(document.getElementById('staffModal'));
    staffMode(name);
    instance.close();
})