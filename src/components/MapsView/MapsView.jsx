import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './MapsView.css'
import { iconLocation } from './iconLocation'


const MapView = (props) =>{
    const {latitud, longitud, descripcion} = props
    const position = [latitud, longitud]
    const zoom = 15
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
        </MapContainer>
    )
}

export default MapView;