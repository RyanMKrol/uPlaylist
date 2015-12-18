//because of recursive calls to functions i need to store some variables globally
var returnBoolean = false;
var nextPageToken = undefined;
var requestURL = "";
var apiKey        = 'AIzaSyAILBP5kYFfluEpZReamdHDFM68dtLEWro';

var videoIDs          = []; //an array of the video IDs
var thumbnails        = []; //an array of the sources for the thumbnails
var videoTitles       = []; //an array of the video titles
var counters          = []; //an array of indexes, this will change for the randomise function
var normaliseCounters = []; //an array of the standard indexes - just 0-x in order
var runtimes          = []; //an array of the runtimes
var counter           = 0;
var skipPoints        = []; //an array of points where a video has been made private or deleted in the original playlist
var player;                 //the variable that holds the video player
var enlargedVideo     = false;

//so all of the validation looks fine at this point
function validateInput(input) {

    //checks to see if the browser supports storage
    if(typeof(Storage) != "undefined") {
        //if it does store the URL
        sessionStorage.playlistURL      = input.playlistURL.value;
        sessionStorage.currentlyPlaying = "";
    } else {
        //else alert the user and suggest a browser that will support it
        alert("Sorry, session storage is not supported in your browser, try our website on Google Chrome!");
        return false;
    }

    //checks that the URL is from youtube
    var youtubeCheck = sessionStorage.playlistURL.search('www.youtube.com/');
    //checks that the link is of a playlist
    var playlistCheck = sessionStorage.playlistURL.search('list=');
    //checks to see if the user was playing a video in the playlist when the link was copied
    var currentlyPlayingCheck = sessionStorage.playlistURL.search('watch');

    //if the search is invalid '-1' will be returned and the user should be alerted
    if( (youtubeCheck == (-1)) || (playlistCheck == (-1)) ){
        alert("The playlist must be from YouTube and have a playlist ID, i.e. this will not work on your history.\n An example URL would be: https://www.youtube.com/playlist?list=PLMNUXrGDzNpA_HRobzHdGpOfSb4O2OUlB");

        //highlights the text in the textbox
        highlightText(input.playlistURL);
        //stop the form from submitting
        return false;
    } else {
        //if they were playing a video, find the index of the video they were playing
        if(currentlyPlayingCheck != (-1)){
            var currentIndexCheck = sessionStorage.playlistURL.search('index');
            //if there is an index, parse which index the video is at
            if(currentIndexCheck != (-1)){
                sessionStorage.currentlyPlaying = parseInt(splitOnTwo(sessionStorage.playlistURL, "index=", "&"));
            }
        }
        sessionStorage.playlistID = splitOnTwo(sessionStorage.playlistURL, "list=", "&")

        //starts the loading animation
        $('body').switchClass("loaded", "loading");
        $('input').css("z-index", "0");

        //waits for the animation on the loading to finish and then continues
        setTimeout(function(){
            getPlaylistData(input);
        }, 1000);
        //doesn't currently get the playlist data, this will happen once i have a loading screen in there
        return false;
    }
}

//i use this pattern a couple of times so i'm having a function for it
function splitOnTwo(string, first, second){
    return string.split(first)[1].split(second)[0];
}

//a function to get the information from YouTube's API. it takes in the form from the previous function, that it'll use later on to do some
//fancy highlighting
function getPlaylistData(input){
    //this is how i build up the URL that then enables me to request data from the youtube API. the base URL is just how the URL begins
    //the API key is specific to this website, and it's just some security to check who the data is going to
    //the getRequestURL is then the whole thing together with the playlistID that the user should have provided
    var baseURL         = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=49&playlistId=';
    requestURL          = baseURL.concat(sessionStorage.playlistID).concat('&key=').concat(apiKey);

    //this is where i store certain bits of data for the next stage of the website
    sessionStorage.playlistItems      = "";
    sessionStorage.tempPlaylistItems  = "";
    sessionStorage.thumbnails         = "";
    sessionStorage.titles             = "";
    sessionStorage.runTimes           = "";
    sessionStorage.skipPoints         = "";

    //will store all of the playlist data in session storage
    var returnBoolean = apiInteraction();

    //i check here for the value of a boolean, if the previous API interaction was successful, the value will be true
    //elsewise it'll be false, and the following alert message will be shows, and the textbox will highlight all of what's in it

    //*** need to put some error checking in there ***

    /*if(!returnBoolean){
        alert("Sorry, the playlist you entered is not available on YouTube");
        highlightText(input.playlistURL);
    }*/

    //the boolean is sent back up the chain to tell the form whether to proceed or not
    //return returnBoolean;
}

function apiInteraction(){

    // the modified URL is used to include the page token, i save the base URL for subsequent calls
    var modifiedURL = requestURL;

    // if there is a next page token, append it to the end of the URL so that i can get the data
    if(nextPageToken != undefined){
        modifiedURL   = modifiedURL.concat("&pageToken=").concat(nextPageToken);
    }

    //i request the data from the API using an XMLHTTPRequest item that is handled using jquery's ajax method
    $.ajax({
        //stops the other events on the page from firing
        async    : true,
        //the URL is what we built up earlier
        url      : modifiedURL,
        // the method of ajax i'm using is get
        type     : 'GET',
        // the function that will be carried out on success
        success  : function(data) {
            parseAllTheData(data);
        }
    });
}

//a small function to highlight all of the text inside a text input field
function highlightText(textInput){
    textInput.setSelectionRange(0, textInput.value.length);
}

/* window.location.href = "http://www.google.com"; */

function parseAllTheData(data) {

    // sets the global variable to the next page token in the returned data
    nextPageToken = data.nextPageToken;
    //i go through each of the items in the JSON response and build up a string of video ID's and thumbnails
    $.each(data.items, function (key, val){
        //the following if statement will stop the errors occuring when the video is made private
        if((val.snippet.title != "Private video") && (val.snippet.title != "Deleted video")){
            sessionStorage.tempPlaylistItems  = sessionStorage.tempPlaylistItems.concat(val.snippet.resourceId.videoId).concat("%2C+");
            sessionStorage.thumbnails         = sessionStorage.thumbnails.concat(val.snippet.thumbnails.default.url).concat(" ");
            sessionStorage.titles             = sessionStorage.titles.concat(val.snippet.title).concat(",,,");
        } else {
            // if the video is private or deleted, the counters still need something to represent it, or the ordering get's dodgey
            sessionStorage.tempPlaylistItems  = sessionStorage.tempPlaylistItems.concat('skip').concat("%2C+");
            sessionStorage.thumbnails         = sessionStorage.thumbnails.concat('skip').concat(" ");
            sessionStorage.titles             = sessionStorage.titles.concat('skip').concat(",,,");
            sessionStorage.skipPoints         = sessionStorage.skipPoints.concat(val.snippet.position).concat(' ');
        }
    });

    // uses the list of video ids instead of individual ids to get the runtime in an array, this call can only take 49 items however
    // so i use a temporary array to store the video ids, which then get put in the final array. the temporary array is then cleared
    // for any follow up calls
    getRunTime();
}

function getRunTime(){
    console.log("in the time");
    var baseURL = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=';
    var requestURL = baseURL.concat(sessionStorage.tempPlaylistItems).concat('&key=').concat(apiKey);

    $.ajax({
        //stops the other events on the page from firing
        async    : true,
        //the URL is what we built up earlier
        url      : requestURL,
        // the method of ajax i'm using is get
        type     : 'GET',
        // the function that will be carried out on success
        success  : function(data) {
            // gets the time from the youtube api, splits it all up according to the format, and then converts the minutes
            // to seconds, adds that to the seconds, and then stores it in sessionStorage

            $.each(data.items, function(key, val){
                var seconds      = 0;
                var minutes      = 0;
                var timeReturned = val.contentDetails.duration;

                if(timeReturned.search('M') != -1){
                    minutes      = (parseInt(timeReturned.split("PT")[1].split('M')[0])*60);

                    if(timeReturned.search('S') != -1){
                        seconds      = parseInt(timeReturned.split("M")[1].split('S')[0]);
                    }

                } else {
                    seconds      = parseInt(timeReturned.split("PT")[1].split('S')[0]);
                }
                var time         = minutes + seconds;
                sessionStorage.runTimes = sessionStorage.runTimes.concat(time).concat(" ");
            });

            // appending the temporary array onto the final and resetting the temporary array
            sessionStorage.playlistItems     = sessionStorage.playlistItems.concat(sessionStorage.tempPlaylistItems);
            sessionStorage.tempPlaylistItems = "";

            // if there is a next page token in the returned data, then call this function with the base url, the token
            // will be stored in the global variable of this file
            if(nextPageToken != undefined){
                apiInteraction();
            } else {
                restylePage();
                extractData();
                setupList();
                //the loading will now diasappear
                $('body').switchClass("loading", "loaded");
                //removes the loading things otherwise they'll carry on animating and using resources
                setTimeout(function(){
                    $('#loader-wrapper').remove();
                }, 1000);
            }
        }
    });
}

// a small function to extract the data from the session storage
function extractData(){
    var i = 0;
    var skipIndex;
    if(sessionStorage.currentlyPlaying != undefined)
        counter = parseInt(sessionStorage.currentlyPlaying);

    videoIDs     = sessionStorage.playlistItems.split("%2C+");
    thumbnails   = sessionStorage.thumbnails.split(" ");
    videoTitles  = sessionStorage.titles.split(",,,");
    runtimes     = sessionStorage.runTimes.split(" ");
    skipPoints   = sessionStorage.skipPoints.split(" ");

    { //this whole sequence is for the purpose of moving the currentlyPlaying index to where it should be
        //given the number of private or deleted videos in the playlist
        if(sessionStorage.currentlyPlaying != undefined)
            for(i = 0; i < skipPoints.length - 1; i++)
                if(skipPoints[i] < parseInt(sessionStorage.currentlyPlaying))
                    counter--;
    }

    { //this sequence is to remove the deleted or private videos from the list of videos we're going to work on
        skipIndex = videoIDs.indexOf('skip');
        while(skipIndex != (-1)){
            videoIDs.splice(skipIndex, 1);
            thumbnails.splice(skipIndex, 1);
            videoTitles.splice(skipIndex, 1);
            skipIndex = videoIDs.indexOf('skip');
        }
    }

    // creates an array of indexes
    for(i = 0; i < (videoIDs.length - 1); i++){
        counters.push(i);
    }

    // if you just make one array equal to the other it acts as a reference, meaning that if you change the value of counters
    // you also change the value of normaliseCounters. using the slice function copies one array starting from the first index
    normaliseCounters = counters.slice();
}

//removing all other html elements and setting the page up for the actual playlist
function restylePage(){
    $('.content').remove();

    newDiv = document.createElement("div");
    newDiv.setAttribute("id", "playerContainer");
    newDiv.setAttribute("style", "display: none;");
    document.getElementsByTagName('body')[0].appendChild(newDiv);

    newDiv = document.createElement("div");
    newDiv.setAttribute("id", "player");
    document.getElementById('playerContainer').appendChild(newDiv);
}

function setupList(){

    // variables for the loop counter, and the outside <ul> tag
    var i;
    var list  = document.getElementById("sortable");

    // the reason that this is based on the length - 1, is because the string is built up by appending and then adding a space,
    // and is then later split on the space. this means that the list is always 1 extra because of the last space being put in
    for(i = 0; i < (videoIDs.length - 1); i++){

        //this is the basic list item that will hold everything
        var listElement = document.createElement('li');

        //the index has now been done
        var indexSpan   = createCustomElement('div', [['class', 'indexHolder']]);
        var indexText   = document.createTextNode(i+1);
        indexSpan.appendChild(indexText);

        //the title has now been done
        var titleSpan   = createCustomElement('span', [['class', 'title']]);
        var titleText   = document.createTextNode(videoTitles[i]);
        titleSpan.appendChild(titleText);

        //the time has now been done
        var timeSpan    = createCustomElement('div', [['class', 'time']]);
        var timeText    = document.createTextNode(runtimes[i]);
        timeSpan.appendChild(timeText);

        listElement.appendChild(indexSpan);
        listElement.appendChild(titleSpan);
        listElement.appendChild(timeSpan);

        list.appendChild(listElement);
    }
}

// a function that takes in the type of element you want to build as well as a two dimensional array of
// and their associated values
function createCustomElement(type, attributes){

    var i = 0;
    var customElement = document.createElement(type);
    var attribute;
    var attributeValue;
    var attributeNode;

    // goes through each index in the array, and assigns the attribute and it's associated value
    // to the element tag
    for(; i < attributes.length; i++){
        attribute = attributes[i][0];
        attributeValue = attributes[i][1];
        attributeNode = document.createAttribute(attribute);
        attributeNode.value = attributeValue;
        customElement.setAttributeNode(attributeNode);
    }
    return customElement;
}
