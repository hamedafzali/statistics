import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//import "leaflet/dist/leaflet.css";
class Map extends Component {
  state = {};
  render() {
    const position = [35.723527, 51.416198];
    return (
      <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            پست بانک ایران <br /> شعبه میرزای شیرازی.
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default Map;
