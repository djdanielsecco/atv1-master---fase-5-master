<template>
  <div  class="database">
    <h1>{{ msg }}</h1>
   <div id="imgf" class="container"></div>
    
  </div>
</template>

<script>
	//var tata = furlf;

export default {
  name: 'database',
  data () {
    return {
      msg: 'Imagens on Firebase',
		
		
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
	.database {
		
		padding: 150px;
		
	}
	#imgf {
		position: inherit;
		
		border: 2px solid #BBB;
 	width: 500px;
 	height: 500px;

 	overflow: auto;
		
	}
</style>
