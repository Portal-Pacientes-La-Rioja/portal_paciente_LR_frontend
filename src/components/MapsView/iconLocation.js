import L from 'leaflet'
import icon from '../../assets/images/icon.svg'

export const iconLocation = L.icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
})
