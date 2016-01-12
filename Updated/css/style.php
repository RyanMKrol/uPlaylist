<?php
// randomised the background style
header("Content-type: text/css; charset: UTF-8");
$array1 = array("F1F2B5","7b4397","8e9eab","136a8a","00bf8f","ffb347","43cea2","D38312","73C8A9","83a4d4","52c234", "fe8c00","556270","9D50BB","B3FFAB","DAD299","215f00","3D7EAA",
                "1CD8D2","134E5E","2BC0E4","085078","1D976C","4CB8C4","1A2980","F09819","3CA55C","348F50");
$array2 = array("135058","dc2430","eef2f3","267871","001510","ffcc33","185a9d","A83279","373B44","b6fbff","061700", "f83600","FF6B6B","6E48AA","12FFF7","B0DAB9","e4e4d9","FFE47A",
                "93EDC7","71B280","EAECC6","85D8CE","93F9B9","3CD3AD","26D0CE","EDDE5D","B5AC49","56B4D3");

$index  = rand(0, count($array1)-1);
$colour1 = $array1[$index];
$colour2 = $array2[$index];
$colour3 = dechex((hexdec($colour1) + hexdec($colour2))/2);

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

#playlistsAvailableHome {

  /* gives the list only so much space */
  width: 80%;
  height: 315px;

  /* centers the list */
  margin: auto;
  margin-top: 75px;

  overflow-y: scroll;

}

/* div holding the image tags */
.link_holder{
  position: relative;
  display:inline-block;

  width: 200px;
  height: 150px;

  background-color:black;

  margin: 2px;

  border-style: solid;
  border-color: #bfbfbf;
  border-width: 1px;

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

#playlistsAvailableContent{
  display: none;
}

#listContent {
  list-style-type: none;
  text-align: left;
  paddin: 0px;
}

#listContent li {
  position: relative;
  height: 160px;
  width: 75%;
  background-color: green;
  border-style: solid;
  border-width: 1px;
  margin: auto;
}

/* top: 50%;
left: 25px;
-webkit-transform: translate(0%, -50%);
transform: translate(0%, -50%);
border-right-style: solid;
border-right-width: 2px;
padding: 20px 20px 20px 0px; */

.position {
  position: relative;
  top: 0px;
  height: 100%;
  width: 50px;
  margin: 0px;
  float: left;
}

.position_text{
  position: absolute;
  left: 50%;
  top: 50%;

  /*centers the component*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  border-right-style: solid;
  border-right-color: white;
  border-right-width: 2px;

  padding: 40px 15px 40px 10px;

}
.thumbnail {
  position: relative;
  height: 100%;
  width: 200px;
  padding-left: 35px;
  padding-right: 35px;
  float: left;
}

.thumbnail img{
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0%, -50%);
  transform: translate(0%, -50%);
}
.title {
  position: relative;
  margin: 0px;
  top: 0px;
  height: 100%;
  float: left;
  width: 60%;
}

.title_text {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0%, -50%);
  transform: translate(0%, -50%);
}
.time {
  position: relative;
  margin: 0px;
  top: 0px;
  height: 100%;
  width: 80px;
  float: right;
}
.time_text {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
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
    width: 51%;
    height: 100%;
    background: #222222;
    z-index: 1000;
    -webkit-transform: translateX(0);  /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: translateX(0);  /* IE 9 */
    transform: translateX(0);  /* Firefox 16+, IE 10+, Opera */
}

#loader-wrapper .loader-section.section-left {
    left: -51%;
}

#loader-wrapper .loader-section.section-right {
    right: -51%;
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
