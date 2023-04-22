let map;

async function initMap(arrayMarker) {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: 39.6394, lng: -86.8635 },
    zoom: 15,
  });

  let arrayTest = [
    {
      _id: 1,
      latitude: 39,
      longitude: -86
    },
    {
      _id: 1,
      latitude: 35,
      longitude: -89
    },
    {
      _id: 1,
      latitude: 41,
      longitude: -85
    },

  ]

  // Loop through the array of data and add a marker for each item
  arrayMarker.forEach(item => {
    const position = { lat: item.latitude, lng: item.longitude };
    const image = {
      url: "https://www.vhv.rs/dpng/d/215-2151356_warning-ico-opera-browser-icon-png-transparent-png.png",
      scaledSize: new google.maps.Size(15, 15),
    };
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: item.title,
      icon: image
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
