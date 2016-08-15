// catch simple errors
"use strict";

// declare uPlaylist-app namespace if it doesn't already exist
var uPlaylist =  uPlaylist || {};

// set the list to be sortable
function setSortable() {
  $( "#listContent" ).sortable({
    handle: ".handle_content",
    revert: 75,
    scrollSensitivity: 100,
    scrollSpeed: 10,
    stop: elementDropped,
    cursor: '-webkit-grabbing'
  });

  $( "#listContent" ).disableSelection();
}

// callback for when an element is dropped
function elementDropped(event, ui){

  // dictionary to hold the positions and the titles
  var title_position_dict = [];

  // go through each of the playlist items getting the title and the corresponding position
  $('.playlistItem').each(function(key,val){

    // puts entries in the dictionary
    title_position_dict[$(val).find('.title_text').text()] = padNum(key);

    // updating all of the position spans with the new correct position
    $(val).find('.position_text').text(padNum(key));
  });


  // go through the persisted collection and update the positions
  $.each(uPlaylist.currentPlaylist.attributes.songs, function(inner_key, inner_val){
    inner_val.position = title_position_dict[inner_val.title];
  });

  // array to hold the new songs
  var new_songs_array = [];

  // instead of needing to sort the array, i can just insert items based on the position
  $.each(uPlaylist.currentPlaylist.attributes.songs, function(inner_key, inner_val){
    new_songs_array[parseInt(inner_val.position)] = inner_val;
  });

  // persists the playlist
  uPlaylist.currentPlaylist.save({songs: new_songs_array}, {
    success: function(){
      console.log("Saving successful");
    },
    error: function(){
      console.log("Saving unsuccessful");
    }
  });
}
