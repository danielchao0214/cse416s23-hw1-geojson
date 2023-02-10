import React, { useState } from "react";
import { MapContainer, GeoJSON, TileLayer, useMap } from "react-leaflet";
import L from 'leaflet';
// import northAmerica from "./../geoJson Files/data.json";\
import "leaflet/dist/leaflet.css";
import './MainMap.css'

const MainMap = (props) => {
    const [currentGeoJSON, setCurrentGeoJSON] = useState({});
    function MyComponent() {
        const map = useMap();
        console.log(map.getCenter());
        return null;
    }

    // default style fot the GeoJson file on Load
    let countryStyle = {
        fillColor: "red",
        fillOpacity: 0.15,
        color: "blue",
        weight: 1
    }

    function getCountryName(country) {
        return country.properties.name
    }

    function setCountryName(country, name) {
        return country.properties.name = name;
    }

    function showFile(e) {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            setCurrentGeoJSON(JSON.parse(text));
        };
        reader.readAsText(e.target.files[0]);
    }

    // this handle the submit for the form in "onEachCountry" function
    function handleForm(event, country, layer) {
        console.log(event);
        event.preventDefault();
        let newName = document.getElementById("textfield").value;
        setCountryName(country, newName);

        layer.closePopup();

    }

    // This function is loaded for every feature in the GeoJSON Object

    function onEachCountry(country, layer) {
        layer.bindPopup(getCountryName(country));

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
                layer.bindPopup(getCountryName(country));
                event.target.setStyle({
                    fillOpacity: .5,
                    fillColor: "green"
                })
            },

            dblclick: (event) => {

                // form for inside the popup window
                var x = document.createElement("FORM");
                x.setAttribute("id", "myForm");
                x.addEventListener('submit', (event) => { handleForm(event, country, layer) });
                document.body.appendChild(x);

                //textfield to add to the form
                var y = document.createElement("INPUT");
                y.setAttribute("id", "textfield");
                y.setAttribute("type", "text");
                y.setAttribute("value", getCountryName(country));
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



    return (
        <div className="Map">
            <div id="leafletmap"></div>
            <MapContainer
                style={{ height: "80vh", width: "80vw" }}
                zoom={4}
                center={[39.63568661947377, -102.07068046738928]}
                doubleClickZoom={false}
                id="leafletmap"
            >
                <MyComponent />
                {/* This is where the GeoJSON file is Loaded in the Data section*/}
                {currentGeoJSON.features && (
                    <GeoJSON
                        style={countryStyle}
                        data={currentGeoJSON.features}
                        onEachFeature={onEachCountry}
                    />
                )}

                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=Sp0j87JpClPB8cs9tlUR"
                >

                </TileLayer>
            </MapContainer>
            <div>
                <input type="file" onChange={showFile} />
            </div>
        </div>
    )
}

export default MainMap;