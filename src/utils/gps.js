import utmLatlng from 'utm-latlng'

var utm = new utmLatlng()

const gpsUtil = (coords1) => {
    return utm.convertUtmToLatLng(coords1.latitude, coords1.longitude, '31', 'T')
}

export default { gpsUtil }