<?php

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

html, body{
    width:100%;
    height:100%;
    margin:0;
    background-attachment: fixed;
    overflow:hidden;
}


#playlistID {
    /*position properties*/
    position:relative;

    left: 22.5%;
    width: 55%;
    height: 60px;

    /*border properties*/
    border: 1px solid #c4c4c4;
    text-align: center;

    /*padding properties*/
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7px;
    padding-right: 7px;

    /*font properties*/
    font-family: "HelveticaNeue-Thin", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-size: 50px;

    /*giving the text box curved corners*/
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;

    background-color:rgba(0, 0, 0, 0.35);
    -webkit-transition: all 0.3s ease-out;
            transition: all 0.3s ease-out;

    /*shadow properties*/
    outline: none;
    box-shadow: 0px 0px 00px #000000;
    -moz-box-shadow: 0px 0px 00px #000000;
    -webkit-box-shadow: 0px 0px 00px #000000;
}
#playlistID:focus {
        background-color:rgba(255,255,255,1);
        box-shadow: 0px 0px 10px #000000;
        -moz-box-shadow: 0px 0px 10px #000000;
        -webkit-box-shadow: 0px 0px 10px #000000;

        -webkit-transition: all 0.3s ease-out;
                transition: all 0.3s ease-out;
}
/*determines the properties of the placeholder*/
.playlistID::-webkit-input-placeholder {
    /*the placeholder is currently a grey colour*/
    text-align: center;
}


.content{
    position:absolute;
    width: 100%;
    height: 180px;
    top: 35%;
}

.slogan{
    position:absolute;
    font-family: "HelveticaNeue-Thin", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-size: 35px;
    width:44%;
    top : 30%;
    left :28%;
    text-align: center;
    overflow: visible;
    white-space: nowrap;
}

input{
    position:absolute;
    z-index: 1005;
}


/* all of this is for the playlist list page*/
.indexHolder{
    position:absolute;
    width:50px;
    height:30px;
    text-align: center;
    top:5px;
}

ul{
    position:absolute;
    width:65%;
    left:12.5%;
    height:50%;
    top:25%;
    margin:0;
    padding:0;
    list-style-type: none;
    overflow-y: scroll;
}

#sortable li span{
    position:absolute;
}
#sortable li {
    position:relative;
    width: 100%;
    height: 30px;

    padding:0;
    border:solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: #0;

    margin-top:2px;
    background-color:#A0D468;

    font-family: "HelveticaNeue-Thin", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-s80f;
}

.index{
    padding-top: 5px;
    text-align: center;
}
.title{
    left: 50px;
    border-left-style: solid;
    border-left-width: 2px;
    padding-top: 5px;
    padding-bottom:7px;
    padding-left: 5px;
}
#sortable li .time{
    position:absolute;
    right:0px;
    padding-top: 5px;
    height:20px;
    width: 60px;
    padding-bottom:5px;

    border-left-style: solid;
    border-left-width: 2px;
    text-align: center;

}

#sortable li:active{
    background-color: #ece8e8;

    -webkit-transition: background-color 0.3s ease-out;
    -moz-transition: background-color 0.3s ease-out;
    -ms-transition: background-color 0.3s ease-out;
    -o-transition: background-color 0.3s ease-out;
    transition: background-color 0.3s ease-out;
}

/*

#sortable {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

html, body{
    height:100%;
    width:100%;
}

.title{
    position:relative;
    display:inline-block;
    width: 80%;
    left:10%;
    top:25px;
    height:100%;

    top: 50%;
      	-webkit-transform: translateY(-50%);
      	-ms-transform: translateY(-50%);
      	transform: translateY(-50%);

    text-align: center;

    border:solid;
    border-width: 2px;
    border-color: #0;
}

#sortable li {

    width: 100%;
    height: 30px;
    border:solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: #0;
    margin: 2px;
    background-color:#A0D468;

    font-family: "HelveticaNeue-Thin", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}

#sortable li:active{
    background-color: #ece8e8;

    -webkit-transition: background-color 0.3s ease-out;
    -moz-transition: background-color 0.3s ease-out;
    -ms-transition: background-color 0.3s ease-out;
    -o-transition: background-color 0.3s ease-out;
    transition: background-color 0.3s ease-out;
}
