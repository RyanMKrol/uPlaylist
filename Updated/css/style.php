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
    border: 1px solid #c4c4c4;
    text-align: center;

    /* padding properties */
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7px;
    padding-right: 7px;

    /* font properties */
    font-family: "HelveticaNeue-Thin", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-size: 30px;
    color: white;

    background-color:rgba(0, 0, 0, 0.50);
    -webkit-transition: all 0.3s ease-out;
            transition: all 0.3s ease-out;

    /* stops the browser from outlining the input in a blue shadow */
    outline: none;

    /* puts a black shadow around the box */
    box-shadow: 0px 0px 5px #000000;
    -moz-box-shadow: 0px 0px 5px #000000;
    -webkit-box-shadow: 0px 0px 5px #000000;
}

/* dims the box when focus is on it */
.user_input:focus {
  background-color:rgba(0, 0, 0, 0.20);

  -webkit-transition: all 0.3s ease-out;
          transition: all 0.3s ease-out;
}

#playlistsAvailableHome {
  position: relative;
  list-style-type: none;
  padding: 0px;
}

#playlistsAvailableHome li{
  display: inline;
  width: 33%;
}
