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

    // resets the colour of the text to white, so i can set the colour of the next item
    $('li').css('color', 'white');
    getNextPosition();
  }
}

function changePlayerSource(element, id){
  uPlaylist.currentlyPlaying = id;
  $(element).parent().css('color', 'blue');
  uPlaylist.player.loadVideoById(id, 0);
}

// gets the next song in the list to play
function getNextPosition(){
  var current_position = 0;

  // goes through the list of songs looking for the one we're currently playing
  $.each(uPlaylist.currentPlaylist.attributes.songs, function(key, val){
    if(val.song_id == uPlaylist.currentlyPlaying){
      // finds it and parses the position
      current_position = (parseInt(val.position)+1) % uPlaylist.currentPlaylist.attributes.songs.length;
    }
  });

  // goes through the list again looking for the next song to play
  $.each(uPlaylist.currentPlaylist.attributes.songs, function(key, val){
    if(val.position == current_position){
      // finds it, changes the currentlyPlaying variable and plays the next song
      uPlaylist.currentlyPlaying = val.song_id;

      // trying to do a text search on the divs here to find the id
      console.log($('.title:contains(uPlaylist.currentlyPlaying)'));
      changePlayerSource(null, uPlaylist.currentlyPlaying);
    }
  });
}
