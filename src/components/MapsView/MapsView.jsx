import { MapContainer, TileLayer, Popup, Marker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './MapsView.css'
import { iconLocation } from './iconLocation'

const MapView = (props) => {
    const { latitud, longitud, descripcion } = props;
    const position = [latitud, longitud];
    const zoom = 13;
  
    const coordinates = [
      [-28.5548034, -66.8154158],
      [-28.5558655, -66.8151173],
      [-28.5563716, -66.8179665],
      [-28.5542241, -66.81851379999999],
      [-28.5542781, -66.8188169],
      [-28.5465212, -66.81867500000001],
      [-28.5459146, -66.81665509999999],
      [-28.3149694, -67.0487942],
      [-28.3151051, -67.04923029999999],
      [-28.99860559999999, -67.49441689999999],
      [-28.8754475, -67.5563971],
      [-28.8773876, -67.5594022],
      [-28.8762062, -67.56160919999999],
      [-28.8766779, -67.5616534],
      [-28.8873001, -67.5645997],
    ];
  
    const polylineOptions = { color: 'red' };
  
    return (
      <MapContainer className='leaflet-container' center={position} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{descripcion}</Popup>
        </Marker>
        <Polyline positions={coordinates} pathOptions={polylineOptions} />
      </MapContainer>
    );
  };

export default MapView;