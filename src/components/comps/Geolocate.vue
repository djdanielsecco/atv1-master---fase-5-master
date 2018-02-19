<template>
  <div  class="geolocate">
    <h1>{{ msg }}</h1>
   
    <p id="demo">Lat</p>
  </div>
</template>

<script>
	//var tata = furlf;
    	var firebase = require('firebase');
var $ = require('jquery');
     
    window.getLocationV = function getLocation() {
   
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        $("#demo").append( "Geolocation is not supported by this browser.");
        
    }

function showPosition(position) {
  
 $("#demo").text("Latitude: " + position.coords.latitude + 
    " Longitude: " + position.coords.longitude );
    /* $("#demo").append("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude );*/
   window.latData = position.coords.latitude;
    window.longData = position.coords.longitude;
}
    
  }  


export default {
    

    
  name: 'geolocate',
  data () {
    return {
      msg: 'Geo Locate',
		
		
    }
  }
}
    
    getLocationV();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, p {
  font-weight: normal;
    color:beige;
}

    
    
</style>








