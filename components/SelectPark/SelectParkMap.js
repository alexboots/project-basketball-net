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
        this.handleSelectLocation(e.latLng)
        this.createMarker(e.latLng)
      } else {
        console.error('GoogleMaps: Issue finding latLang')
      }
    })
  }

  handleSelectLocation = (location) =>{
    console.log('location', location);
    const geocoder = new google.maps.Geocoder
    const geocodeError = "GoogleMaps: Issue selecting location - please select somewhere else"
    geocoder.geocode({
      'latLng': location
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.props.handleSetPark({
              location,
              fullAddress: results[0].formatted_address
          })
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


  // Maybe delete all this = need to play around with it. It doesn't show all parks :(
  //
  // showParksOnMap = (map, pos) => {
  //   const { handleSetPark } = this.props
  //   const that = this
    
  //   const service = new google.maps.places.PlacesService(map)
  //   service.nearbySearch({
  //     location: pos,
  //     radius: 50,
  //     // type: ['park', 'point_of_interest']
  //   }, placeParks)

  //   function placeParks (results, status) {
  //     if (status === google.maps.places.PlacesServiceStatus.OK) {
  //       for (let i = 0; i < results.length; i++) {
  //         createMarker(results[i]);
  //       }
  //     }
  //   }

  //   function createMarker(place) {
  //     const placeLoc = place.geometry.location;
  //     const marker = new google.maps.Marker({
  //       map: map,
  //       position: place.geometry.location
  //     })

  //     google.maps.event.addListener(marker, 'click', function () {
  //       const placeInfoWindow = new google.maps.InfoWindow()

  //       placeInfoWindow.setContent(`${place.name} (selected)`)
  //       placeInfoWindow.open(map, this)

  //       // and pass data
        // handleSetPark(place)
  //     })
  //   }
  // }

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
