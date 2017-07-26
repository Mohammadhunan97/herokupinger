window.onload = function(){
	console.log("dom loaded")
	document.getElementsByTagName("body")[0].style.backgroundImage = "url('https://s-media-cache-ak0.pinimg.com/originals/2b/ee/6d/2bee6d511ed7cf38084283f7921eb30c.jpg')";

window.addEventListener('load', function () {
    navigator.serviceWorker.register('/static/service-worker.js', {
            scope: './static/'
        })
        .then(function (r) {
            console.log('Registered Service Worker');
        })
        .catch(function (whut) {
            console.error('Uh oh, there is a problem... ');
            console.error(whut);
        });
    window.addEventListener('beforeinstallprompt', function (e) {
       		console.log('beforeinstallprompt Event fired');
    });
});
}