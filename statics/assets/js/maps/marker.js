function addStaffMarker(lng,lat,name,sid){
    const marker = new AMap.Marker({
        icon:"https://png.icons8.com/office/32/000000/administrator-male.png",
        position: [lng,lat],
        animation:"AMAP_ANIMATION_DROP",
        extData:{
            sid
        }
    })
    marker.setLabel({
        offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
        content: name
    })
    markers.push(marker);
}

function addClientMarker(lng,lat){
    const marker = new AMap.Marker({
        icon:"https://png.icons8.com/ios-glyphs/32/000000/street-view.png",
        position:[lng,lat],
        animation:"AMAP_ANIMATION_DROP"
    });
    clientMarker = marker;
    marker.setMap(map);
}

function updateMarker(lng,lat,index,sid){
    markers[index].setPosition([lng,lat]);
}

function updateClientMarker(lng,lat){
    clientMarker.setPosition([lng,lat]);
}