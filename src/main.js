// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//importScripts('../static/js/idb.js');
//importScripts('../static/js/utility.js');
require('../static/js/promise.js')
require('../static/js/fetch.js')
//require('../static/js/cashdyn.js')
require('../static/js/idb.js')
require('../static/js/material.min.js')
require('../static/js/utility.js')
Vue.config.productionTip = false
var firebase = require('firebase');
var $ = require('jquery')
var config = {
    apiKey: "AIzaSyCZLUzrohM-sSo6xdNozSj45tw7JO161Bw",
    authDomain: "fotogeo-16a78.firebaseapp.com",
    databaseURL: "https://fotogeo-16a78.firebaseio.com",
    projectId: "fotogeo-16a78",
    storageBucket: "fotogeo-16a78.appspot.com",
    messagingSenderId: "1093165096555"
};
var linksFB;
var jhg = document.getElementById("imgf");
var uio = [];
var dados1 = [];
var furlf;
var defaultApp = firebase.initializeApp(config);
var database = firebase.database();

console.log(defaultApp.name); // "[DEFAULT]"

/////////////////PROMISE//////////////////////
var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('This is executed once the timer is done!');
        reject({
            code: 500,
            message: 'An error occurred!'
        });
        //console.log('This is executed once the timer is done!');
    }, 3000);
});

if(!window.Promise){
    window.Promise= promise;
}


/*

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('../static')
      .then(function (cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.add('/');
          cache.add('/index.html');
          cache.add('/src/js/utility.js');
      })
  )
});

*/






////// XHR METHOD
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://fotogeo-16a78.firebaseio.com/registro.json');
//xhr.open('GET', 'https://fotogeo-16a78.firebaseio.com/trees.json');
xhr.responseType = 'json';
xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr.onload = function () {
    console.log(xhr.response);
};

xhr.onerror = function () {
    console.log('Error!');
};

xhr.send();



/////////////////////////////////////////////////
function createCard(data) {
    $("#imgf").append('<img  src="' + data.foto + '" width="100px" height="auto"/>');
    //jhg.innerHTML = furlf;
    //console.log(data.foto + '  <  >');


}

function updateUI(data) {

    for (var i = 0; i < data.length; i++) {
        createCard(data[i]);
    }
}
/*var url2 = 'http://192.168.0.10:8081/';
var xhr1 = createCORSRequest('GET', url2);
xhr1.send();*/
////////////////////////////////////////
var url = 'https://fotogeo-16a78.firebaseio.com/registro.json';
var networkDataReceived = false;

fetch(url)
    .then(function (res) {
   
     console.log(res);
        return res.json();
    })
    .then(function (data) {
        networkDataReceived = true;
        window.furlf = data.foto;

       // console.log(data.foto + '<???>' + jhg);

        console.log('From web FETCH 1 >', data);
        var dataArray = [];
        for (var key in data) {
            dataArray.push(data[key]);
            uio.push(data[key]);
          
            
            
        }
    
    
        updateUI(dataArray);
        window.dados1 = uio;
    
       // console.log(uio.length + '<???>' + jhg);
    

        return window.dados1, window.furlf;
    }).catch(function (err) {
        console.log(err);
    });



fetch('https://fotogeo-16a78.firebaseio.com/trees.json')
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {

        var dataArrayTree = [];
        for (var key in data) {
            dataArrayTree.push(data[key]);

        }
          
        console.log('From web FETCH 0 >', dataArrayTree);
    })
    .catch(function (err) {
        console.log(err);
    });
var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});



/*
if ('caches' in window) {
  caches.match(url)
    .then(function(response) {
      if (response) {
        return response.json();
      }
    })
    .then(function(data) {
      console.log('From cache', data);
      if (!networkDataReceived) {
        var dataArray = [];
        for (var key in data) {
          dataArray.push(data[key]);
        }
        updateUI(dataArray)
      }
    });
}

*/


fetch('https://fotogeo-16a78.firebaseio.com/atest.json')
  .then(function(response) {
    console.log('r1f ', response);
    return response.json();
  })
  .then(function(data) {
    console.log('d1f ', data);
  })
  .catch(function(err) {
    console.log(err);
  });

/////////////////////////////////////////xxxxxx////////////////


if ('indexedDB' in window) {
  readAllData('posts')
    .then(function(data) {
      if (!networkDataReceived) {
        console.log('From cache', data);
        updateUI(data);
      }
    });
}











new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})

promise.then(function (text) {
    return text;
}).then(function (newText) {
    console.log(newText);
}).catch(function (err) {
    console.log(err.code, err.message);
});

console.log('This is executed right after setTimeout()');

/*fetch('https://fotogeo-16a78.firebaseio.com/trees.json')
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {

        var dataArrayTree = [];
        for (var key in data) {
            dataArrayTree.push(data[key]);

        }
          if ('indexedDB' in window) {
          readAllData('trees')
            .then(function(data) {
              if (!networkDataReceived) {
                console.log('From cache tree> ', data);
                updateUI(data);
              }
            });
        }
        console.log(dataArrayTree);
    })
    .catch(function (err) {
        console.log(err);
    });*/







/*
fetch('https://fotogeo-16a78.firebaseio.com/registro.json', {
  method: 'POST',
  headers: {
       "key" : "Access-Control-Allow-Origin",
    "value" : "*",
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: 'cors',
 // body: JSON.stringify({message: 'Does this work?'})
})
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

*/





/*
fetch('https://fotogeo-16a78.firebaseio.com/atest.json', {
  method: 'POST',
  headers: {
      'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: 'cors',
 body: JSON.stringify({message: 'Does this work?', Text: 'foi'})
}).then(function(response) {
    console.log('response > ',response);
    return response.json();
  })
  .then(function(data) {
    console.log('data get >',data);
  })
  .catch(function(err) {
    console.log(err);
  });
*/





