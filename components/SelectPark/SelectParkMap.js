import React, { Component } from 'react'
import { Button, Loader, Segment } from 'semantic-ui-react'

class SelectParkMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingLocation: false,
      locationError: false,
      googleMapsError: false // TODO: add error message for goolge maps failure

    }
  }
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
    this.setState({ loadingLocation: true })

    const infoWindow = new google.maps.InfoWindow
    const geoLocationError = "Geolocation: Issue finding your location"

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

        this.setState({ loadingLocation: false })
      }, () => {
        // Please allow location services because we fucked
        console.error(geoLocationError)
        this.setState({ 
          loadingLocation: false,
          locationError: true
        })
      })
    } else {
      // Browser doesn't support Geolocation
      console.error(geoLocationError)
      this.setState({ 
        loadingLocation: false,
        locationError: true
      })
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
      <span>

        <div className="btn-find-me">
          <Button 
            size='small' 
            onClick={ this.centerMapOnUsersLocation }
            disabled={ this.state.loadingLocation } 
          >
            { this.state.loadingLocation ? <Loader size='small' inline active /> : 'Zoom into my location' }
          </Button>
        </div>

        { this.state.locationError && 
          <Segment color='red'>
            Could not find your location :/
          </Segment>
        }

        <div id="map" style={{ height: '100%' }}></div>
      </span>
    )
  }
}

export default SelectParkMap
