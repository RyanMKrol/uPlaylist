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
    playerVars: {
      'controls': 1,
      'modestbranding': 1,
      'showinfo': 0,
      'autoplay': 0
    },
    events: {
      'onReady': function(){
        $(document).trigger("finished_loading_player");
        var first_element = $('.title').eq(0);
        changePlayerSource(first_element, uPlaylist.currentPlaylist.attributes.songs[0].song_id);
      },
      'onStateChange': onPlayerStateChange,
      'onError' : onPlayerError
    }
  });
}

function onPlayerError(event){

  // error handling - I mainly expect this to be embedded issues, but I've included
  // the others just in case
  if(event.data === 2){
    alert('Error 2  - Something very strange occured. Playing next video!');
  } else if(event.data === 5){
    alert('Error 5  - HTML5 Video Player error. Playing next video!');
  } else if(event.data === 100){
    alert('Error 100  - Video was somehow not found. Playing next video!');
  } else if(event.data === 101){
    alert('Error 101  - Video Cannot be played in embedded players, Sorry! Playing next video!');
  } else if(event.data === 150){
    alert('Error 150  - Video Cannot be played in embedded players, Sorry! Playing next video!');
  }

  // gets the next song
  getNextPosition();
}

//when the video changes state
function onPlayerStateChange(event) {

  console.log("state changed");
  console.log(event.data);

  // when a video ends
  if(event.data === 0) {

    // gets the next videoe to play
    getNextPosition();
  }
}

function changePlayerSource(element, id){

  // resets the colour of the text to white, so i can set the colour of the next item
  $('li').css('color', 'white');

  // sets up the new currently playing song
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
      $('.playlistItem').each(function(list_key, list_val){

        // gets something that i can then search to find the right element
        var thing = String($(list_val).html());

        // checks to see if this is the element with the currently playing id
        if(thing.indexOf(uPlaylist.currentlyPlaying) !== -1){

          // highlights the new currently playing song, uses child to allow uniform
          // behaviour in the changePlayerSource function which relies on clicking a child
          // when manually changing the song
          changePlayerSource($(list_val).children().eq(0), uPlaylist.currentlyPlaying);
        }
      });
    }
  });
}
