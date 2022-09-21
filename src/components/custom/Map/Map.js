import React from "react";
import PropTypes from "prop-types";
import { Loader } from '@googlemaps/js-api-loader';

const Map = (props) => {
    Map.propTypes = {
        id: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        isAutocomplete: PropTypes.string
    }

    // Load map configuration https://github.com/googlemaps/js-api-loader
    const loader = new Loader({
        apiKey: "AIzaSyBWli4_eVF7TD7Pj7cb0AiChiOY3xDjZvs",  //apiKey from Google
        version: "weekly",
        language: 'pt-BR',
        region: 'BR',
        libraries: ['places'],
    });

    const mapOptions = {
        center: {
            lat: -14.235004,
            lng: -51.92528
        },
        zoom: 6
    }

    loader.load().then((google) => {
        console.log({props})
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

        const input = document.getElementById('map-autocomplete');

        const options = {
            fields: ["address_components", "geometry", "name"],
            strictBounds: false,
            types: ["establishment"],
        };

        const autocomplete = new google.maps.places.Autocomplete(input, options);

        const marker = new google.maps.Marker({
            map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        marker.setVisible(false);

        autocomplete.addListener("place_changed", () => {
            marker.setVisible(false);

            const place = autocomplete.getPlace();

            console.log(place.geometry);

            if (!place.geometry || !place.geometry.location) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            console.log(place.geometry.location.lat());

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            console.log(place.name);
            console.log(place.address_components);
        })
    })
    .catch(e => {
        // do something
    });

    return(
        <div id={props.id} style={{ minHeight: props.height }}></div>
    );
}

export default Map;
