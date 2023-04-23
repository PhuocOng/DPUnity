let map;

async function initMap(arrayMarker) {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: 39.6394, lng: -86.8635 },
    zoom: 15,
  });

  const arraySafeSpot = [
    {title: "Safe Spot" ,
     icon: "https://cdn-icons-png.flaticon.com/512/1160/1160358.png",
     latitude: 39.638588512509585, 
     longitude: -86.86245562990172,
     description: "SafeSpot1",
     available: "2-4pm Monday-Tuesday-Thursday"
    },
    {title: "Safe Spot" ,
     icon: "https://cdn-icons-png.flaticon.com/512/1160/1160358.png",
     latitude: 39.63643258705497,  
     longitude: -86.86338127931376,  
     description: "SafeSpot2",
     available: "2-4pm Monday-Tuesday-Thursday"
    },
    {title: "Safe Spot" ,
     icon: "https://cdn-icons-png.flaticon.com/512/1160/1160358.png",
     latitude: 39.64071693318094, 
     longitude: -86.86431961336234,  
     description: "SafeSpot3",
     available: "2-4pm Monday-Tuesday-Thursday"
    },
  ]


  // Loop through the array of data and add a marker for each item
  arrayMarker.forEach(item => {
    const position = { lat: item.latitude, lng: item.longitude };
    const image = {
      url: 'data:image/svg+xml;utf8,<svg fill="%23f20707" width="232px" height="232px" viewBox="0 0 256.00 256.00" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="%23f20707" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)" stroke-width="0.00256"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(38.400000000000006,38.400000000000006), scale(0.7)"><rect x="0" y="0" width="256.00" height="256.00" rx="128" fill="%23fffafa" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="%23CCCCCC" stroke-width="0.512"></g><g id="SVGRepo_iconCarrier"> <path d="M128,24A104,104,0,1,0,232,128,104.11759,104.11759,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"></path> </g></svg>',
      scaledSize: new google.maps.Size(20, 20),
    };
  

    const contentString =  //content for marker
      '<div id="content" >' +
      '<h4 id="firstHeading" class="firstHeading">'+ "Violence/Discrimination/Sexual Harrasment" + '</h4>' +
      '<div id="bodyContent">' +
      '<p> Location: '    + item.location + '<br>' +
          'Time: '        + item.time     + '<br>' +
          'Date: ' + item.date + '<br>' +
          'Description: ' + item.description + '<br>' +
          '</p>' + 
      "</div>" +
      "</div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: "Uluru",
    });
    const marker = new google.maps.Marker({ //make a marker
      position: position,
      map: map,
      title: item.title,
      animation: google.maps.Animation.DROP,
      icon: image
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  });

  arraySafeSpot.forEach(item => {
    const position = { lat: item.latitude, lng: item.longitude };
    const image = {
      url: "https://png.pngtree.com/png-vector/20220108/ourmid/pngtree-green-shield-warranty-icon-png-image_4267067.png",
      scaledSize: new google.maps.Size(20, 20),
    };

    const contentString = 
    '<div id="content" >' +
      '<h4 id="firstHeading" class="firstHeading">'+ "Safe Spot" + '</h4>' +
      '<div id="bodyContent">' +
      '<p>' +  'Available: '   + item.available   + '<br>' +
               'Description: ' + item.description + '<br>' +
          '</p>' + 
      "</div>" +
      "</div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: "Uluru",
    });    

    const marker = new google.maps.Marker({ //make a marker
      position: position,
      map: map,
      title: item.title,
      animation: google.maps.Animation.DROP,
      icon: image
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  });
}

console.log("Begin js")  
fetch('/reports/data') 
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const arrayMarker = data;
    initMap(arrayMarker);
  })
  .catch(error => console.error(error));
