import React, { Component } from "react";

import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import northAmerica from "./../geoJson Files/data.json";
import "leaflet/dist/leaflet.css";
import './MainMap.css'

class MainMap extends Component {
    state = { map: {} };

    // default style fot the GeoJson file on Load
    countryStyle = {
        fillColor: "red",
        fillOpacity: 0.15,
        color: "blue",
        weight: 1
    }

    getCountryName(country) {
        return country.properties.name
    }

    setCountryName(country, name) {
        return country.properties.name = name;
    }
    showFile = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            this.setState(({ map }) => ({ map: JSON.parse(text) }));
        };
        reader.readAsText(e.target.files[0]);
    };

    // this handle the submit for the form in "onEachCountry" function
    handleForm(event, country, layer) {
        console.log(event);
        event.preventDefault();
        let newName = document.getElementById("textfield").value;
        this.setCountryName(country, newName);

        layer.closePopup();

    }

    // This function is loaded for every feature in the GeoJSON Object

    onEachCountry = (country, layer) => {
        layer.bindPopup(this.getCountryName(country));

        layer.on({
            mouseover: (event) => {
                event.target.setStyle({
                    fillColor: "yellow",
                    fillOpacity: 0.2,
                })
            },

            mouseout: (event) => {
                event.target.setStyle({
                    fillColor: "red",
                    fillOpacity: 0.15,
                })
            },


            click: (event) => {
                layer.bindPopup(this.getCountryName(country));
                event.target.setStyle({
                    fillOpacity: .5,
                    fillColor: "green"
                })
            },

            dblclick: (event) => {

                // form for inside the popup window
                var x = document.createElement("FORM");
                x.setAttribute("id", "myForm");
                x.addEventListener('submit', (event) => { this.handleForm(event, country, layer) });
                document.body.appendChild(x);

                //textfield to add to the form
                var y = document.createElement("INPUT");
                y.setAttribute("id", "textfield");
                y.setAttribute("type", "text");
                y.setAttribute("value", this.getCountryName(country));
                document.getElementById("myForm").appendChild(y);

                //set the popup to the form
                layer.bindPopup(x);

                //change color to reflect double click
                event.target.setStyle({
                    fillColor: "red",
                    fillOpacity: 0.5,
                })

            }

        })
    }

    render() {
        return (
            <div className="Map">
                <MapContainer
                    style={{ height: "80vh", width: "80vw" }}
                    zoom={4}
                    center={[39.63568661947377, -102.07068046738928]}
                    doubleClickZoom={false}
                >
                    {/* This is where the GeoJSON file is Loaded inthe Data section*/}
                    <GeoJSON style={this.countryStyle} data={this.state.map.features} onEachFeature={this.onEachCountry} />

                    <TileLayer
                        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                        url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=Sp0j87JpClPB8cs9tlUR"
                    >

                    </TileLayer>
                </MapContainer>
                <div>
                    <input type="file" onChange={this.showFile} />
                </div >
            </div>
        )
    }
}

export default MainMap;