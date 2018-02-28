import React, { Component } from 'react'

class SelectParkMap extends Component {
  componentDidMount() {
    const NY = { lat: 40.74, lng: -73.94 }
    this.marker = null

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: NY,
      zoom: 12
    })

    this.map.addListener('click', (e) => {
      if(e && e.latLng) {
        this.createMarker(e.latLng)
        this.handleSelectLocation(e.latLng)
      } else {
        console.error('GoogleMaps: Issue finding latLang')
      }
    })
  }

  handleSelectLocation = (location) =>{
    const geocoder = new google.maps.Geocoder
    const geocodeError = "GoogleMaps: Issue selecting location - please select somewhere else"
    geocoder.geocode({
      'latLng': location
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {

          // Store location in state
          this.props.handleSetLocation(location, results[0].formatted_address)

        } else {
          console.error(geocodeError)
        }
      } else {
        console.error(geocodeError)
      }
    })
  }

  centerMapOnUsersLocation = (map) => {
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
        infoWindow.open(this.map)
        this.map.setCenter(pos)
        this.map.setZoom(18)

        // Show markers for parks nearby
        // this.showParksOnMap(map, pos)

      }, () => {
        // Please allow location services because we fucked
        this.handleLocationError()
      })
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError()
    }
  }

  createMarker = (location) => {
    if(this.marker) {
      this.marker.setPosition(location);
    } else {
      this.marker = new google.maps.Marker({
        map: this.map,
        position: location
      })
    }
  }

  render() {
    return (
      <div id="map" style={{ height: '100%' }}></div>
    )
  }
}

export default SelectParkMap
