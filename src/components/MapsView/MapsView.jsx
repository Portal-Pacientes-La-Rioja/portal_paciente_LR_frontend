import { MapContainer, TileLayer, Popup, Marker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './MapsView.css'
import { iconLocation } from './iconLocation'


const MapView = (props) => {
    const { latitud, longitud, descripcion } = props
    const position = [latitud, longitud]
    const zoom = 15

    // ADAPTACION EN CASO DE QUE SEA NECESARIO MARCAR UNA RUTA
    // const ruta = [
    //     [-29.420726707970225, -66.84854594316938],
    //     [-29.419760699124183, -66.84837508978968],
    //     [-29.41909342732294, -66.85062830512607],
    //     [-29.421130417392504, -66.85421709384202],
    //     [-29.42244807736086, -66.85803655951781],
    //     [-29.42945685545743, -66.85827726004617],
    //     [-29.429577520188374, -66.86010909357451]
    // ];

    return (
        <MapContainer className='leaflet-container' center={position} zoom={zoom} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={iconLocation}>
                <Popup>
                 {descripcion}
                </Popup>
            </Marker>

            {/* // ADAPTACION EN CASO DE QUE SEA NECESARIO MARCAR UNA RUTA */}
            {/* <Polyline positions={ruta} color="red" weight={3} /> */}
        </MapContainer>
    )
}

export default MapView;