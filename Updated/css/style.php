<?php
// randomised the background style
header("Content-type: text/css; charset: UTF-8");

// first array of colour
$array1 = array("F1F2B5",
"7b4397",
"136a8a",
"00bf8f",
"ffb347",
"43cea2",
"D38312",
"73C8A9",
"83a4d4",
"52c234",
"fe8c00",
"556270",
"9D50BB",
"B3FFAB",
"DAD299",
"215f00",
"3D7EAA",
"1CD8D2",
"134E5E",
"2BC0E4",
"085078",
"1D976C",
"4CB8C4",
"1A2980",
"F09819",
"3CA55C",
"348F50");

// second array of colour
$array2 = array("135058",
"dc2430",
"267871",
"001510",
"ffcc33",
"185a9d",
"A83279",
"373B44",
"b6fbff",
"061700",
"f83600",
"FF6B6B",
"6E48AA",
"12FFF7",
"B0DAB9",
"e4e4d9",
"FFE47A",
"93EDC7",
"71B280",
"EAECC6",
"85D8CE",
"93F9B9",
"3CD3AD",
"26D0CE",
"EDDE5D",
"B5AC49",
"56B4D3");

// gets a random index into these array
$index  = rand(0, count($array1)-1);

// gets each colour
$colour1 = $array1[$index];
$colour2 = $array2[$index];

// decodes them into hex values
$colour3 = dechex((hexdec($colour1) + hexdec($colour2))/2);

// applies the style to the body
echo "body {";
echo "background: -webkit-linear-gradient(90deg, #$colour1 10%, #$colour2 90%);"; /* Chrome 10+, Saf5.1+ */
echo "background:    -moz-linear-gradient(90deg, #$colour1 10%, #$colour2 90%);"; /* FF3.6+ */
echo "background:     -ms-linear-gradient(90deg, #$colour1 10%, #$colour2 90%);"; /* IE10 */
echo "background:      -o-linear-gradient(90deg, #$colour1 10%, #$colour2 90%);"; /* Opera 11.10+ */
echo "background:         linear-gradient(90deg, #$colour1 10%, #$colour2 90%);"; /* W3C */
echo "background-attachment: fixed;";
echo "font-family: \"HelveticaNeue-Thin\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;";
echo "font-size: 24px;";
echo "color: white;";
echo "}";
?>

/*resets all margin and padding values*/
* {
  margin:0;
  padding:0;
}

/*sets all things holding content to fit the window fully*/
html, body, main, #mainrow, #content {
  height: 100%;
  width: 100%;
}

/* centers the content */
.centered{
  text-align: center;
}

/* styling the input box */
.user_input{

    width: 45%;
    height: 50px;

    /* border properties */
    border: 1px solid white;
    text-align: center;

    /* padding properties */
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7px;
    padding-right: 7px;

    background-color:rgba(0, 0, 0, 0.50);
    -webkit-transition: all 0.3s ease-out;
            transition: all 0.3s ease-out;

    /* stops the browser from outlining the input in a blue shadow */
    outline: none;

    /*font properties*/
    font-family: "HelveticaNeue-Thin", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-size: 24px;
    color: white;

    /* puts a black shadow around the box */
    box-shadow: 0px 0px 5px #000000;
    -moz-box-shadow: 0px 0px 5px #000000;
    -webkit-box-shadow: 0px 0px 5px #000000;

    margin-top: 7.5%;
}

/* dims the box when focus is on it */
.user_input:focus {
  background-color:rgba(0, 0, 0, 0.20);

  -webkit-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;
}

/*the list holding the thumbnails representing each playlist*/
#playlistsAvailableHome {

  /* gives the list only so much space */
  width: 80%;
  height: 315px;

  /* centers the list */
  margin: auto;
  margin-top: 75px;

  /*shows the playlists if they overflow*/
  overflow-y: visible;
}

/*the style for the youtube player*/
#player_holder{

  /*positional properties*/
  position: fixed;
  top: 50%;
  left: 50%;

  /*centers the component*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  display:none;
}

.playlist_navigation{
  position: fixed;
  top: 0px;
  left: -206px;
  -webkit-transition: all 0.4s; /* Safari */
    transition: all 0.4s;
}

.playlist_navigation.revealed{
  position: fixed;
  top: 0px;
  left: 0px;
  -webkit-transition: all 0.4s; /* Safari */
    transition: all 0.4s;
}

#tab {
  position: absolute;
  left: 200px;
  top: -5px;

  height: 100px;
  width: 0px;

  border-left: 25px solid #dedede;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}


.toggle_fullscreen{
  position: fixed;
  left: 2%;
  bottom: 5%;
  cursor: pointer;
  text-align:center;
  border-style: solid;
  border-width: 1px;
  border-color: white;
  border-radius: 10px;
}
.toggle_fullscreen i {

  /*the icon is a little one sided, so i need extra padding on the left*/
  padding: 5px 5px 5px 7px;
}

.active_button{
  color:blue;
  background-color: #eee;
  outline: 0;
}
.inactive_button{
  color:white;
  background-color:#dedede;
  outline: 0;
}

/* div holding the image tags */
.link_holder{

  /*position properties*/
  position: relative;
  display:inline-block;

  /*size properties*/
  width: 200px;
  height: 150px;

  background-color:black;

  margin: 2px;

  /*border properties*/
  border-style: solid;
  border-color: #bfbfbf;
  border-width: 1px;

  /*shadow properties*/
  box-shadow: 0px 0px 5px #000000;
  -moz-box-shadow: 0px 0px 5px #000000;
  -webkit-box-shadow: 0px 0px 5px #000000;

}

/* styling for the image tags */
img {

  /* width of the image */
  width: 200px;
  height: 150px;

  /* standard opacity and the transition to be applied when it changes*/
  opacity: 1;
  -webkit-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;

}

/* behaviour for when the user hovers over the image*/
img:hover {
  opacity: 0.4;
  -webkit-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;
}

/* the style associated with the text in the thumbnails */
.link_holder p {

  /* positional and size properties */
  position: absolute;
  top: 55px;
  width: 100%;
  margin: auto;

  /* text that is too long will have an ellipsis */
  overflow: hidden;
  text-overflow: ellipsis;

  /* stops the cursor from interfering with hover event */
  pointer-events: none;

  /* by default text is not visible */
  opacity: 0;
  -webkit-transition: opacity 0.3s ease-out;
          transition: opacity 0.3s ease-out;
}
/* when this is activated, the text will appear */
.link_holder p.show {

  opacity: 1;
  -webkit-transition: opacity 0.2s ease-out;
          transition: opacity 0.2s ease-out;
}

/*i currently don't want to display this on the content page*/
#playlistsAvailableContent{
  position: absolute;
    left: 0%;
    width: 200px;
    z-index: 1000;
    background-color: #eeeeee;
    min-height: 110px;
    border-style: solid;
    border-width: 2px;
    border-color: #dedede;
    border-right-style: none;
}

#playlistsAvailableContent li{
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow-y: hidden;

  background-color: rgb(230,230,230);
  margin-top: 5px;
  margin-bottom: 5px;

  text-align:left;

  -webkit-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;
}
#playlistsAvailableContent li.current{

  background-color: rgb(220,220,220);
  -webkit-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;
}
#playlistsAvailableContent li a{
  color: black;
  text-decoration: none;
  padding-left: 5px;
}

/*content fills the page*/
.content {
  width: 100%;
  height: 100%;
}

/*div holding the full list*/
.list_holder {
  top: 25px;
  position: absolute;
  width: 100%;
  height: 100%;
}

/*the unordered list itself*/
#listContent {

  /*no bullet points in the list*/
  list-style-type: none;

  /*text alignment*/
  text-align: left;

  /*border properties*/
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: white;

  /*positional and size properties*/
  width: 75%;
  top: 10%;

  /*centers the list in the page and leaves some space at the bottom*/
  margin: auto;
  margin-bottom: 25px;

  /*used to make the bottom border go all the way to the edge*/
  padding-right: 2px;
}

/*style for the items in the unordered list*/
#listContent li {

  /*positional and size properties*/
  position: relative;
  height: 45px;
  width: 100%;

  /*background and border properties*/
  background-color: rgba(242, 242, 242, 0.50);
  border-style: solid;
  border-width: 1px;
  border-bottom-style: none;
  border-color:white;

  /*misc properties*/
  margin: auto;
  overflow: hidden;
  font-size: 80%;
}

/*the class holding the position of each song*/
.position {

  /*positional and size properties*/
  position: relative;
  top: 0px;
  height: 100%;
  width: 40px;
  margin: 0px;
  float: left;

}

.position_border{

  /*positioning and size properties*/
  position: absolute;
  height: 70%;
  width: 100%;
  left: 50%;
  top: 50%;

  /*centers the component*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  /*border properties*/
  border-right-style: solid;
  border-right-color: white;
  border-right-width: 1px;
}

.position_text{

  /*the div inside the position div, this is used mainly for centering*/
  position: absolute;
  left: 50%;
  top: 50%;

  /*centers the component*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

/*the div holding the title information*/
.title {
  /*positional properties*/
  position: relative;
  margin: 0px;
  padding-left: 15px;
  float: left;
  top: 0px;

  /*size properties*/
  height: 100%;
  width: 60%;

  cursor: pointer;
}

/*div used for centering the text itself*/
.title_text {

  /*centering css*/
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0%, -50%);
  transform: translate(0%, -50%);

  /*makes sure the title only takes one line and puts an elipsis on overflow*/
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
}

/*div holding the time information*/
.time {

  /*positioning properties*/
  position: relative;
  margin: 0px;
  top: 0px;
  float: right;

  /*size properties*/
  height: 100%;
  width: 65px;
}

.time_border{
  /*positioning and size properties*/
  position: absolute;
  height: 70%;
  width: 100%;
  left: 50%;
  top: 50%;

  /*centers the component*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);


  /*border proeprties*/
  border-left-style: solid;
  border-left-color: white;
  border-left-width: 1px;
}

/*centering the time text*/
.time_text {

  /*positional properties*/
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

/*the handle is used to drag the songs into a new position*/
.handle {

  /*positional properties*/
  position: relative;
  top: 0px;
  float: right;

  /*size properties*/
  height: 100%;
  width: 50px;

  /*border properties*/
  border-left-style:solid;
  border-left-width:1px;
  border-left-color:white;
}

/*centering the handle itself*/
.handle_content{

  /*positional properties*/
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  cursor: -webkit-grab;
}

@media only screen and (min-width: 1000px) {
  #listContent {
    font-size: 22px;
  }
  #playlistsAvailableContent li{
    font-size: 22px;
  }
  /*the div holding the title information*/
  .title {
    width: 550px;
  }
}
@media only screen and (max-width: 1000px) {
  #listContent {
    font-size: 20px;
  }
  #playlistsAvailableContent li{
    font-size: 20px;
  }
  /*the div holding the title information*/
  .title {
    width: 400px;
  }
}
@media only screen and (max-width: 800px) {
  #listContent {
    font-size: 18px;
  }
  #playlistsAvailableContent li{
    font-size: 18px;
  }
  /*the div holding the title information*/
  .title {
    width: 270px;
  }
}
@media only screen and (max-width: 600px) {
  #listContent {
    font-size: 16px;
  }
  #playlistsAvailableContent li{
    font-size: 16px;
  }

  /*the div holding the title information*/
  .title {
    width: 125px;
  }
  .time {
    width: 55px;
  }
}
@media only screen and (max-width: 460px) {
  #listContent {
    font-size: 16px;
  }
  #playlistsAvailableContent li{
    font-size: 16px;
  }

  /*the div holding the title information*/
  .title {
    width: 100px;
  }

  .time {
    width: 55px;
  }
}





/* This all deals with the loading beginning and the black screen shutting */

.loading #loader-wrapper .loader-section.section-left {
    -webkit-transform: translateX(100%);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: translateX(100%);  /* IE 9 */
    transform: translateX(100%);  /* Firefox 16+, IE 10+, Opera */
}

.loading #loader-wrapper .loader-section.section-right {
    -webkit-transform: translateX(-100%);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: translateX(-100%);  /* IE 9 */
    transform: translateX(-100%);  /* Firefox 16+, IE 10+, Opera */
}

.loading #loader-wrapper .loader-section.section-right,
.loading #loader-wrapper .loader-section.section-left {

    -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
                transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}


/* this is where the black screens sit in the interim */
#loader-wrapper .loader-section {
    position: fixed;
    top: 0;
    width: 52%;
    height: 100%;
    background: #222222;
    z-index: 1000;
    -webkit-transform: translateX(0);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: translateX(0);  /* IE 9 */
    transform: translateX(0);  /* Firefox 16+, IE 10+, Opera */
}

#loader-wrapper .loader-section.section-left {
    right: 100%;
}

#loader-wrapper .loader-section.section-right {
    left: 100%;
}

/* once the website has done it's business the black screens will move out of the way */
.loaded #loader-wrapper .loader-section.section-left {
    -webkit-transform: translateX(-100%);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: translateX(-100%);  /* IE 9 */
            transform: translateX(-100%);  /* Firefox 16+, IE 10+, Opera */

    -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
            transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

.loaded #loader-wrapper .loader-section.section-right {
    -webkit-transform: translateX(100%);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: translateX(100%);  /* IE 9 */
            transform: translateX(100%);  /* Firefox 16+, IE 10+, Opera */

-webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
    transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}

/* when the webpage has done it's business, the loader will fade out, as well as the div holding all of the loading stuff moving */
.loaded #loader {
    opacity: 0;
    -webkit-transition: all 0.3s ease-out;
            transition: all 0.3s ease-out;
}
.loaded #loader-wrapper {
    visibility: hidden;

    -webkit-transform: translateY(-100%);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: translateY(-100%);  /* IE 9 */
            transform: translateY(-100%);  /* Firefox 16+, IE 10+, Opera */

    -webkit-transition: all 0.3s 1s ease-out;
            transition: all 0.3s 1s ease-out;
}

/* this is the declaration of all of the animation stuff */

@-webkit-keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: rotate(0deg);  /* IE 9 */
        transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
    }
    100% {
        -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: rotate(360deg);  /* IE 9 */
        transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
    }
}
@keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: rotate(0deg);  /* IE 9 */
        transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
    }
    100% {
        -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: rotate(360deg);  /* IE 9 */
        transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
    }
}

.loading #loader {
    opacity: 100;
    -webkit-transition: all 3s ease-out;
            transition: all 3s ease-out;
}

#loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    pointer-events:none;
}
#loader {
    display: block;
    position: relative;
    opacity: 0;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    <?php echo "border-top-color: #$colour1;"?>

    -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */

    z-index: 1001;
}

#loader2 {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    <?php echo "border-top-color: #$colour3;"?>

    -webkit-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
    z-index: 1002;
}

#loader3 {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    <?php echo "border-top-color: #$colour2;"?>

    -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
      animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
      z-index: 1002;
}
