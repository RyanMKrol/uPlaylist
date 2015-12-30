'use strict';

var uPlaylist =  uPlaylist || {};

//when this script is loaded, load youtube's player api
$( document ).ready(function(){

  //gets external script
  $.getScript( "https://www.youtube.com/iframe_api");
});


//triggers when the youtube api is ready, this will be triggered once this script
// has loaded it using jQuery's getScript method
function onYouTubePlayerAPIReady() {

  //creates a new player using a div with the player id
  uPlaylist.player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: uPlaylist.currentPlaylist.attributes.songs[0].song_id,
    playerVars: {
      'controls': 1,
      'modestbranding': 1,
      'showinfo': 0,
      'autoplay': 0
    },
    events: {
      'onReady': function(){$(document).trigger("finished_loading_player");},
      'onStateChange': onPlayerStateChange
    }
  });
}

//when the video changes state
function onPlayerStateChange(event) {

  // when a video ends
  if(event.data === 0) {
    console.log("video has ended");
  }
}

function changePlayerSource(id){
  uPlaylist.player.loadVideoById(id, 0);
}
