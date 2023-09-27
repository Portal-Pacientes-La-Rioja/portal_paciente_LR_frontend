import { MapContainer, TileLayer, Popup, Marker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './MapsView.css'
import { iconLocation } from './iconLocation'

const MapView = (props) => {
    const { latitud, longitud, descripcion, coordinates } = props;
    const position = [latitud, longitud];
    const zoom = 13;

    // Obtengo el primer elemento del arreglo coordinates
    let firstCoordinate = null;
    if (coordinates && coordinates.polygon.length > 0) {
      firstCoordinate = coordinates.polygon[0];
    }

    return (
      <MapContainer className='leaflet-container' center={position} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates ? (
          <>
            <Marker position={position} icon={iconLocation}>
              <Popup>{descripcion}</Popup>
            </Marker>
            <Polyline positions={coordinates.polygon} pathOptions={{ color: 'red' }} />
            <Marker position={firstCoordinate} icon={iconLocation}>
              <Popup>Usted está aquí</Popup>
            </Marker>
          </>
        ) : (
          <Marker position={position} icon={iconLocation}>
            <Popup>{descripcion}</Popup>
          </Marker>
        )}
      </MapContainer>
    );
  };

export default MapView;