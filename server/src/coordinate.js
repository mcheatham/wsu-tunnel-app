exports.distanceTo = function(nextNode, endNode) {
    // Radius at ground level at WSU = 6,369,712m  Radius at sea level at WSU= 6,369,424m
    let radius = 6369712;

    //Compute the differences in latitude, longitude, and elevation between the two points
    let dLat = toRad(nextNode.lat) - toRad(endNode.lat);
    let dLong = toRad(nextNode.long) - toRad(endNode.long);
    let dElev = nextNode.elev - endNode.elev;

    let a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(toRad(nextNode.long)) * Math.cos(toRad(endNode.long)) * Math.pow(Math.sin(dLong / 2), 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = radius * c;

    return Math.sqrt(d*d + dElev * dElev);
}

function toRad(deg) {
    return deg * Math.PI / 180;
}
