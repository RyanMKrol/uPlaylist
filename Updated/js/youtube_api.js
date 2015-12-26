'use strict';

var uPlaylist =  uPlaylist || {};

function onYouTubePlayerAPIReady() {

    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: uPlaylist.currentPlaylist.attributes.songs[0].song_id,
      playerVars: { 'controls': 1, 'modestbranding': 1, 'showinfo': 0, 'autoplay': 0 }, //change the autoplay thing here
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

$( document ).ready(function(){
  console.log(uPlaylist.currentPlaylist);
  $.getScript( "https://www.youtube.com/iframe_api", function( data, textStatus, jqxhr ) {
    console.log( "Load was performed." );
  });
});

// when the player is successfully loaded to the screen, start playing the first video
function onPlayerReady(event) {
  console.log("player is ready");
    // setupList(counter);

    // this has to be done because the jquery methods that i want to use will look at the html first and change their functionality
    // according to what i want to do. for instance i want to make certain elements draggable, but that first requires them to be on the page
    // so i have to therefore include the script AFTER these elements have been created in the list as follows:
    // var script = document.createElement('script');
    // script.src = "supplementaryJQuery.js";
    // document.getElementsByTagName('head')[0].appendChild(script);
    // changePosition(counter);
}


// when video ends move to the next video in the playlist
function onPlayerStateChange(event) {
  // when a video ends
  if(event.data === 0) {
    console.log("video has ended");
  }
}
