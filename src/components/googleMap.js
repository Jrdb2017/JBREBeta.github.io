import React, { Component } from "react"

class Map extends Component {
  componentDidMount() {
    this.renderMap()
  }
  componentDidUpdate() {
    // console.log(this.props.locations)
    //window.mM.setCenter({ lat: 0, lng: 0 })
    if (this.props.locations.length > 0) {
      this.renderMap()
    }
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDWnVaN7bioFAhNklEIRbXRSlYfJQezDM8&libraries=places&callback=initMap"
      //"https://maps.googleapis.com/maps/api/js?key=AIzaSyDWnVaN7bioFAhNklEIRbXRSlYfJQezDM8&callback=initMap"
    )
    window.initMap = this.initMap
  }
  initMap = () => {
    // Create A Map

    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.75718, lng: -73.98719 },
      zoom: this.props.locations.length > 0 ? 18 : 14,
    })
    /* var marker1 = new window.google.maps.Marker({
      map: map,
      position: { lat: 40.75718, lng: -73.98719 },
    })
    map.myMarkers = [marker1]
    window.mM = map */
    var infowindow = new window.google.maps.InfoWindow()
    var requests = []
    for (var i = 0; i < this.props.locations.length; i++) {
      requests.push({
        query: this.props.locations[i],
        fields: ["name", "geometry", "formatted_address"],
      })
    }

    var service = new window.google.maps.places.PlacesService(map)
    for (var j = 0; j < requests.length; j++) {
      service.findPlaceFromQuery(requests[j], function(results, status) {
        //console.log(requests)
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          //console.log(requests)
          createMarker(results[0], map, infowindow)
          //for (var i = 0; i < this.props.locations.length; i++) {
          //createMarker(results[i], map, infowindow)
          // }
          map.setCenter(results[0].geometry.location)
        } else {
          console.log(status)
        }
      })
    }
  }

  render() {
    return <div />
  }
}
function createMarker(place, map, infowindow) {
  var marker = new window.google.maps.Marker({
    map: map,
    position: place.geometry.location,
  })
  window.google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(place.name)
    //https://www.google.com/maps/search/?api=1&query=Name+name
    infowindow.open(map, this)
  })
}
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Map
/*console.save = function(data, filename){

  if(!data) {
      console.error('Console.save: No data')
      return;
  }

  if(!filename) filename = 'console.json'

  if(typeof data === "object"){
      data = JSON.stringify(data, undefined, 4)
  }

  var blob = new Blob([data], {type: 'text/json'}),
      e    = document.createEvent('MouseEvents'),
      a    = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}*/

/* var requests = []
    for (var i = 0; i < this.props.locations.length; i++) {
      requests.push({
        query: this.props.locations[i],
        fields: ["name", "geometry", "formatted_address"],
      })
    }

    var service = new window.google.maps.places.PlacesService(map)
    for (var j = 0; j < requests.length; j++) {
      service.findPlaceFromQuery(requests[j], function(results, status) {
        //console.log(requests)
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          //console.log(requests)
          for (var i = 0; i < spots.length; i++) {
            createMarker(spots[i], map, infowindow)
          }
          map.setCenter(results[0].geometry.location)
        } else {
          console.log(status)
        } 
      })
    }*/
