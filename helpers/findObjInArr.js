module.exports = (arr,key,val) => {
    for(var i = 0;i < arr.length;i++){
        if(arr[i][key] == val){
            return i
        }
    }
    return -1;
}