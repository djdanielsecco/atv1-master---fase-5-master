<template>
  <div class="hello">
      <geolocate></geolocate>          
                
      <br />
      <tagnumber></tagnumber>
      
      <br />

    <imgg></imgg>
 <br />
 <database></database>

  </div>
</template>

<script>
    var firebase = require('firebase');






    import Database from './comps/Database.vue'
    import Imgg from './comps/Imgg.vue'
    import Geolocate from './comps/Geolocate.vue'
    import Tagnumber from './comps/Tagnumber.vue'

    export default {
        name: 'hello',
        components: {
            Tagnumber,
            Geolocate,
            Database,
            Imgg
        }
    }
</script>

<style>
    body,
    header {
        margin: 0;
        height: 56px;
        padding: 0 16px 0 24px;
        background-color: #35495E;
        color: #ffffff;
    }
</style>