import React, { Component } from 'react'

class SelectParkMap extends Component {
  componentDidMount() {
    const NY = { lat: 40.74, lng: -73.94 }
    const map = new google.maps.Map(document.getElementById('map'), {
      center: NY,
      zoom: 12
    })

    // map.addListener('center_changed', () => {
    //     console.log('LOL');
    //     console.log(map.getCenter().lat());
    //     // map.getZoom()
    //     const pos = { lat: map.getCenter().lat(), lng: map.getCenter().lng() }
    //     this.showParksOnMap(map, pos)
    // })

    // map.addListener('zoom_changed', () => {
    //     console.log('zoom');
    //     const pos = { lat: map.getCenter().lat(), lng: map.getCenter().lng() }
    //     this.showParksOnMap(map, pos)
    // })

    const geocoder = new google.maps.Geocoder
    map.addListener('click', (e) => {
      console.log('e.latLng', e.latLng);
      
      geocoder.geocode({
        'latLng': e.latLng
      }, function(results, status) {
        console.log('results', results);
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            results[0].formatted_address
          }
        }
      })
    })

    this.centerMapOnUsersLocation(map)
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
        infoWindow.open(map)
        map.setCenter(pos)
        map.setZoom(18)

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
  //       handleSetPark(place)
  //     })
  //   }
  // }

  handleLocationError = () => {
    console.warn('GeoLocation data not available')
  }

  render() {
    return (
      <div id="map" style={{ height: '100%' }}></div>
    )
  }
}

export default SelectParkMap
