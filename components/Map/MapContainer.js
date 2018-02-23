import React, { Component } from 'react'
import axios from 'axios';

import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 100, width: 300, top: -20, left: -30,    
    fontSize: '30px'
  }}>
    {text}
  </div>
);

class MapContainer extends Component {
  constructor(props) {
    super(props)
    axios.get('http://localhost:3000/api/request/12345')
    .then(function (res) {
      console.log('hi', res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  centerMapOnUsersLocation (google, map, maps){
    var infoWindow;
    initMap()
    function initMap() {
      infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
  }  

  render() {
    const defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    }

    return (
       <GoogleMapReact
        onGoogleApiLoaded={ ({map, maps}) => {
            // console.log('google', google);
            // console.log('map', map)
            // console.log('maps', maps)
            this.centerMapOnUsersLocation(google, map, maps)
          }
        }
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: "AIzaSyCZ4augeW0kEooAcyLHfF8C6I0_SuI13G0" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent 
          lat={59.955413} 
          lng={30.337844} 
          text={'HELLO'} 
        />
      </GoogleMapReact>
    );
  }
}

export default MapContainer
