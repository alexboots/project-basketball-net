import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class Map extends Component {
  centerMapOnUsersLocation = (google, map, maps) => {
    const infoWindow = new google.maps.InfoWindow

    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        infoWindow.setPosition(pos)
        infoWindow.setContent('You are here :D')
        infoWindow.open(map)
        map.setCenter(pos)
        map.setZoom(18)

        // const service = new google.maps.places.PlacesService(map);
        // service.nearbySearch(request, callback);

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pos,
          radius: 500,
          type: ['park']
        }, callback);

        function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i], infoWindow);
            }
          }
        }

        function createMarker(place,) {
          const placeLoc = place.geometry.location;
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          google.maps.event.addListener(marker, 'click', function() {
            const infoWindow = new google.maps.InfoWindow
            console.log('place.name', place);
            console.log('place.name', place.name);
            // infowindow.setContent(place.name);
            // infowindow.open(map, this);
          });
        }


      }, () => {
        this.handleLocationError()
      })
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError()
    }
  }

  handleLocationError = () => {
    console.warn('GeoLocation data not available')
  }

  render() {
    const defaultProps = {
      center: { lat: 40.74, lng: -73.94 },
      zoom: 12
    }

    return (
       <GoogleMapReact
        libraries={["places"]}
        onGoogleApiLoaded={ ({map, maps}) => {
            this.centerMapOnUsersLocation(google, map, maps)
          }
        }
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={ defaultProps.center }
        defaultZoom={ defaultProps.zoom }
      />
    )
  }
}

export default Map
