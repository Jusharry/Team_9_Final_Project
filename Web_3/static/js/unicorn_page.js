// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
let base = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [base]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Countries": base

};

// 1. Add layers for the clusters.
let gold = new L.LayerGroup();
let silver = new L.LayerGroup();
let bronze = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Gold": gold,
  "Silver": silver,
  "Bronze": bronze
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Access Unicorn data 
let goldData = "https://raw.githubusercontent.com/Jusharry/Team_9_Final_Project/Harry/Resources/co-ord_Database_new.geojson";
let silverData = "https://raw.githubusercontent.com/Jusharry/Team_9_Final_Project/Harry/Resources/co-ord_Database_new.geojson";
let bronzeDta = "https://raw.githubusercontent.com/Jusharry/Team_9_Final_Project/Harry/Resources/co-ord_Database_new.geojson"

// Create Unicorn icons
var unicornIcon = L.Icon.extend({
  options: {
      iconSize:     [38, 95],
      iconAnchor:   [22, 94],
      popupAnchor:  [-3, -76]
  }
});

var goldIcon = new UnicornIcon({iconUrl: 'horse-gold.png'}),
    silverIcon = new UnicornIcon({iconUrl: 'horse-silver.png'}),
    bronzeIcon = new UnicornIcon({iconUrl: 'horse-bronze.png'});

// Retrieve the Unicorn GeoJSON data.
d3.json(goldData).then(function(data) {

  // This function returns the style data for each of the countries we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  // function styleInfo(feature) {
  //   return {
  //     opacity: 1,
  //     fillOpacity: 1,
  //     fillColor: getColor(feature.properties.Cluster),
  //     color: "#000000",
  //     radius: getRadius(feature.properties.Cluster),
  //     stroke: true,
  //     weight: 0.5
  //   };
  // }

  // // This function determines the color of the marker based on the magnitude of the earthquake.
  // function getColor(cluster_group) {

  //   if (cluster_group = 3) {
  //     return "#ffcc80";
  //   }
  //   if (cluster_group = 2) {
  //     return "#c0c0c0";
  //   }
  //   if (cluster_group = 1) {
  //     return "#996633";
  //   }
  //   return "#ffcc80";
  // }

  // // This function determines the radius of the earthquake marker based on its magnitude.
  // // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  // function getRadius(cluster_group) {
  //   if (cluster_group === 0) {
  //     return 1;
  //   }
  //   return cluster_group * 8;
  // }
//------------------------------------Gold Layer--------------------------------------------------------------------------------------------------------------------------
  // Creating a GeoJSON layer with the gold data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.Marker([latlng],{icon: goldIcon});
        },
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Cluster: " + feature.properties.Cluster + "<br>Location: " + feature.properties.Country + "<br>Industry: " +  feature.properties.Industry);
    }
  }).addTo(gold);

  // Then we add the earthquake layer to our map.
  gold.addTo(map);
});

//--------------------------------Silver Layer-------------------------------------------------------------------------------------------------------------------------------

d3.json(silverData).then(function(data) {
// Creating a GeoJSON layer with the gold data.
L.geoJson(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.Marker([latlng+1],{icon: silverIcon});
    },
 onEachFeature: function(feature, layer) {
  layer.bindPopup("Cluster: " + feature.properties.Cluster + "<br>Location: " + feature.properties.Country + "<br>Industry: " +  feature.properties.Industry);
}
}).addTo(silver);

// Then we add the earthquake layer to our map.
silver.addTo(map);
});

//-------------------------------Bronze Layer------------------------------------------------------------------------------------------------------------------------------------

d3.json(bronzeData).then(function(data) {
  // Creating a GeoJSON layer with the gold data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.Marker([latlng -1],{icon: bronzeIcon});
      },
   onEachFeature: function(feature, layer) {
    layer.bindPopup("Cluster: " + feature.properties.Cluster + "<br>Location: " + feature.properties.Country + "<br>Industry: " +  feature.properties.Industry);
  }
  }).addTo(bronze);
  
  // Then we add the earthquake layer to our map.
  bronze.addTo(map);
  });

// Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const clusters = [ 1, 2, 3];
  const colors = [
    "#996633",
    "#c0c0c0",
    "#ffcc80"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < clusters.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      clusters[i] + (clusters[i + 1] ? "&ndash;" + clusters[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);


