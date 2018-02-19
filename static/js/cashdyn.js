//This is the service worker with the Cache-first network
var CACHE_STATIC_NAME = 'static-v410';
var CACHE_DYNAMIC_NAME = 'dynamic-v66';
var CACHE = 'pwabuilder-precache';
var precacheFiles = [
   '/',
    '/index.html',
	'/static/offline.html',
    '/service-worker.js',
'/static/js/idb.js'
    ];
var STATIC_FILES = [
   '/',
    '/index.html',
	'/static/offline.html',
    '/service-worker.js',
'/static/js/idb.js',
'static/js/cashdyn.js',
'static/js/fetch.js',
"static/js/material.min.js",
'static/js/promise.js',
"static/js/utility.js"
    ];
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request)
		.then(function (response) {
			if (response) {
				return response;
			} else {
				return fetch(event.request)
					.then(function (res) {
						return caches.open(CACHE_DYNAMIC_NAME)
							.then(function (cache) {
								cache.put(event.request.url, res.clone());
								return res;
							})
					})
					.catch(function (err) {
						return caches.open(CACHE_STATIC_NAME)
							.then(function (cache) {
								return cache.match('/offline.html');
							});
					});
			}
		})
	);
});
self.addEventListener('fetch', function (event) {
	event.respondWith(
		fetch(event.request)
		.then(function (res) {
			return caches.open(CACHE_DYNAMIC_NAME)
				.then(function (cache) {
					cache.put(event.request.url, res.clone());
					return res;
				})
		})
		.catch(function (err) {
			return caches.match(event.request);
		})
	);
});
//Cache-only
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request)
	);
});
//Network-only
self.addEventListener('fetch', function (event) {
	event.respondWith(
		fetch(event.request)
	);
});
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
self.addEventListener('install', function (event) {
	console.log('[Service Worker] Installing Service Worker ...', event);
	event.waitUntil(
		caches.open(CACHE_STATIC_NAME)
		.then(function (cache) {
			console.log('[Service Worker] Precaching App Shell');
			cache.addAll(STATIC_FILES);
		})
	)
});
self.addEventListener('activate', function (event) {
	console.log('[Service Worker] Activating Service Worker ....', event);
	event.waitUntil(
		caches.keys()
		.then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
					console.log('[Service Worker] Removing old cache.', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});
function isInArray(string, array) {
	var cachePath;
	if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
		console.log('matched ', string);
		cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
	} else {
		cachePath = string; // store the full request (for CDNs)
	}
	return array.indexOf(cachePath) > -1;
}
self.addEventListener('fetch', function (event) {
	var url = 'https://pwagram-99adf.firebaseio.com/posts';
	if (event.request.url.indexOf(url) > -1) {
		event.respondWith(fetch(event.request)
			.then(function (res) {
				var clonedRes = res.clone();
				clearAllData('posts')
					.then(function () {
						return clonedRes.json();
					})
					.then(function (data) {
						for (var key in data) {
							writeData('posts', data[key])
						}
					});
				return res;
			})
		);
	} else if (isInArray(event.request.url, STATIC_FILES)) {
		event.respondWith(
			caches.match(event.request)
		);
	} else {
		event.respondWith(
			caches.match(event.request)
			.then(function (response) {
				if (response) {
					return response;
				} else {
					return fetch(event.request)
						.then(function (res) {
							return caches.open(CACHE_DYNAMIC_NAME)
								.then(function (cache) {
									// trimCache(CACHE_DYNAMIC_NAME, 3);
									cache.put(event.request.url, res.clone());
									return res;
								})
						})
						.catch(function (err) {
							return caches.open(CACHE_STATIC_NAME)
								.then(function (cache) {
									if (event.request.headers.get('accept').includes('text/html')) {
										return cache.match('/offline.html');
									}
								});
						});
				}
			})
		);
	}
});
//Install stage sets up the cache-array to configure pre-cache content
/*
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[ServiceWorker] Skip waiting on install');
      return self.skipWaiting();
  })
  );
});
//allow sw to control of current page
self.addEventListener('activate', function(event) {
console.log('[ServiceWorker] Claiming clients for current page');
      return self.clients.claim();
});
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}
function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});
function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
function fromServer(request){
  //this is the fallback if it is not in the cahche to go to the server and get it
return fetch(request).then(function(response){ return response})
}
*/
console.log(CACHE, ' <<<<<<<');