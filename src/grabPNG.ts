const lat = 42.9313534;
const lng = -70.8358848;
let map: google.maps.Map;

map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 20,
    center: { lat, lng},
    mapTypeId: "hybrid",
  });

//  example api request 
// https://maps.googleapis.com/maps/api/staticmap?center=42.9313534,-70.8358848&zoom=20&size=640x640&maptype=satellite&key=