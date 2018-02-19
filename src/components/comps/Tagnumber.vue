<template>
  <div  class="tagnumber">
    <h1>{{ msg }}</h1>
   <input id="tagNum" v-on:change="sendop" type="number" v-model.number="num"/>
    
  </div>
</template>

<script>
    var $ = require('jquery');

export default {
  name: 'tagnumber',
  data () {
    return {
      
        msg: 'Numero da tag',
		num: ''
		
    }
  },
    methods: {
       sendop: function(event){

         window.tagNum1 = this.num;
        console.log(window.tagNum1);
    return window.tagNum1;
    
    }
        
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
    color:beige;
}

</style>