import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const defaultPosition = { lat: 40.74, lng: -73.94 }
class SelectParkMap extends Component {
  centerMapOnUsersLocation = (google, map, maps) => {
    const infoWindow = new google.maps.InfoWindow

    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        infoWindow.setPosition(pos)
        infoWindow.setContent('You are here')
        infoWindow.open(map)
        map.setCenter(pos)
        map.setZoom(18)

        
        this.showParksOnMap(google, map, maps, pos)

      }, () => {
        // Please allow location services because we fucked
        this.handleLocationError()
      })
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError()
    }
  }

  showParksOnMap = (google, map, maps, pos) => {
    const { handleSetPark } = this.props
    const service = new google.maps.places.PlacesService(map)
    service.nearbySearch({
      location: pos,
      radius: 1000,
      type: ['park']
    }, placeParks)

    function placeParks (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      const placeLoc = place.geometry.location;
      const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      })

      google.maps.event.addListener(marker, 'click', function () {
        const placeInfoWindow = new google.maps.InfoWindow
        console.log('place.name', place)
        console.log('place.name', place.name)
        placeInfoWindow.setContent(`${place.name} (selected)`)
        placeInfoWindow.open(map, this)

        // and pass data
        handleSetPark(place)
      })
    }
  }

  handleLocationError = () => {
    console.warn('GeoLocation data not available')
  }

  render() {
    const defaultProps = {
      center: defaultPosition,
      zoom: 12
    }

    return (
       <GoogleMapReact
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

export default SelectParkMap
