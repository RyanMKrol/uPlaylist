'use strict';

var uPlaylist =  uPlaylist || {};

$( document ).ready(function(){
  $.getScript( "https://www.youtube.com/iframe_api", function( data, textStatus, jqxhr ) {
    console.log( "Load was performed." );
  });
});

function onYouTubePlayerAPIReady() {

  uPlaylist.player = new YT.Player('player', {
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

function onPlayerReady(){
  console.log("player is ready");
  $(document).trigger("finished_loading_player");
}

// when video ends move to the next video in the playlist
function onPlayerStateChange(event) {
  // when a video ends
  if(event.data === 0) {
    console.log("video has ended");
  }
}
