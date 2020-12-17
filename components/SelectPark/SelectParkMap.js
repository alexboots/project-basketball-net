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

  componentDidUpdate() {
    if(this.props.unfulfilledLocations.length) {
      this.placeRequestsOnMap()
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
      // todo: also save place_id so we can look up place name if it exists: https://developers.google.com/places/web-service/details
      if(e && e.latLng) {
        this.createMarker(e.latLng)
        this.handleSelectLocation(e.latLng)
      } else {
        console.error('GoogleMaps: Issue finding latLang')
      }
    })
  }

  placeRequestsOnMap = () => {
    if(this.props.unfulfilledLocations.length > 5) {
      // geocode API only allows 5 (or 10 maybe?) requests every 2 seconds for cheapskates like ourselves
      let timesToCall = Math.ceil(this.props.unfulfilledLocations.length / 5)
      let locationsToPass = 0
      let interval = setInterval(() => {
        if(timesToCall  === 0) {
          clearInterval(interval)
        } else {
          const lookupStart = locationsToPass * 5
          const lookupEnd = lookupStart + 5
          const locations = this.props.unfulfilledLocations.slice(lookupStart, lookupEnd)
          this.placeRequestMarkers(locations)
          locationsToPass++
          timesToCall--
        }
      }, 2001)
    } else {
      this.placeRequestMarkers(this.props.unfulfilledLocations)
    }
  }

  placeRequestMarkers = (locations) => {
    const geocoder = new google.maps.Geocoder
    locations.forEach((location) => {
      geocoder.geocode({ 'address': location.formattedAddress}, (results, status) => {
        if (status == 'OK') {
          const contentString = `Needs ${location.netsRequested} nets`
          const infowindow = new google.maps.InfoWindow({
            content: contentString
          }) 
          const iconImageUrl = 'https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-container-bg_4x.png,icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1520-basketball_4x.png&highlight=ff000000,F57C00&scale=1.0'
          const marker = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              icon: iconImageUrl
          })
          marker.addListener('click', function() {
            infowindow.open(this.map, marker);
          })
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      })
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
          const placeId = results[0].place_id
          const formattedAddress = results[0].formatted_address
          this.props.handleNetRequest(location, formattedAddress, placeId)

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
            Zoom into my location
            { this.state.loadingLocation && 
                <Loader size='mini' inline active />  
            }
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
