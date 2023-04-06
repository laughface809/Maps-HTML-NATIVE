/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_event_closure]

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: 1.286920, lng: 103.854570 },
      styles: styles
    });
  
    // Add markers to map at random locations with AJAX
    // For each of these markers, give them a title with their index, and when
    // they are clicked they should open an infowindow with text from a secret
    // message.
    
    $.ajax({
      type : 'GET',
      dataType : 'json',
      url: '/assets/data.json',
      success : function(data) {
        console.log(data)
        for (let i = 0; i < data.length; ++i) {
          const marker = new google.maps.Marker({
            position: {
              lat: Number(data[i].latitude),
              lng: Number(data[i].longitude),
            },
            map: map,
          });
      
          attachSecretMessage(marker, data[i].place_name);
        }
      } 
    });

  }
  
  // Attaches an info window to a marker with the provided message. When the
  // marker is clicked, the info window will open with the secret message.
  function attachSecretMessage(marker, secretMessage) {
    const infowindow = new google.maps.InfoWindow({
      content: secretMessage,
    });
  
    marker.addListener("click", () => {
      infowindow.open(marker.get("map"), marker);
    });
  }
  // [END maps_event_closure]

  window.initMap = initMap;