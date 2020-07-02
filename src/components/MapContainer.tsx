import * as React from "react";
import { Map, Polyline, CircleMarker, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, GeoJSON } from "leaflet";
import getColour from './utils'

import color_ref from '../json/color_ref.json'
import line_data from '../json/lines.json'
import recent_points from '../json/most_recent_points.json'

import Header from './Header'

import styles from './MapContainer.module.css'

export default class MapContainer extends React.Component<{}, {}> {

  adjustGeoJSON = function(feature: any): any{

    var lng: Array<number> = feature.geometry.coordinates.map(function(item: any){return(item[0])})
    var lat: Array<number> = feature.geometry.coordinates.map(function(item: any){return(item[1])})

    var coords: any = []
    var i;
    for (i = 0; i < lng.length; i++) {
      coords[i] = [lat[i], lng[i]]
    }

    feature.geometry.coordinates = coords

    return(feature)

  }


  render() {

    console.log(line_data)

    //adjust coordinates of line data
    line_data.features.map(this.adjustGeoJSON)
    console.log(recent_points[0].lat)

    return(
      <Map center={[-1.371844, -89.685379]} zoom={14} zoomControl={ false }>
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { line_data.features.map((line: any) => (
          <Polyline key = { line.properties.id } positions = { line.geometry.coordinates }
          color = { getColour(line.properties.id, color_ref) }
          onMouseOver={(e: any) => { e.target.openPopup(); }}
          onMouseOut={(e: any) => {e.target.closePopup();}}>
            <Popup>{ line.properties.id }</Popup>
          </Polyline>
        )) }
        { recent_points.map((point: any) => (
          <CircleMarker center = { [point.lat, point.lng] } radius = { 4 } stroke = { false }
          fill = { true } fillColor = "#00872E" fillOpacity = { 0.5 }
          onMouseOver={(e: any) => { e.target.openPopup();}}
          onMouseOut={(e: any) => {e.target.closePopup();}}>
            <Popup>{ point.summary }</Popup>
          </CircleMarker>
        ))}
      </Map>
    );
  }
}
