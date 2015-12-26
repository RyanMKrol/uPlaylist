function onYouTubePlayerAPIReady() {

    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: '6q0dsG8fTHY',
      playerVars: { 'controls': 1, 'modestbranding': 0, 'showinfo': 1, 'autoplay': 1 }, //change the autoplay thing here
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

$( document ).ready(function(){
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
  console.log("state of player has changed");
    // when a video ends
    // if(event.data === 0) {
    //     if(counter != counters.length - 1){
    //         // change the colour of the text to be that of the next video in the list
    //         changeTextColour(counter, counter+1);
    //         // change the source of the video to be that of the next video in the list
    //         setSource(counters[counter]);
    //     } else {
    //         changeTextColour(counter, undefined);
    //     }
    // }
}
