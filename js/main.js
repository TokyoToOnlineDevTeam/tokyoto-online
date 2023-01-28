//USE relistmusic.exe TO UPDATE SONG LIST
import { stationList } from "./stations.js";
console.log(stationList);

var count=0;
var theStation="live";
window.stop = function(){
  if (document.getElementById("stream").paused) {
    document.getElementById("record").style.filter = " grayscale(0%)";
    document.getElementById("record").style.animationPlayState = 'running';
    document.getElementById("light").style.animationPlayState = 'running';
    document.getElementById("stream").play();
  }else{
    document.getElementById("record").style.filter = " grayscale(100%)";
    document.getElementById("record").style.animationPlayState = 'paused';
    document.getElementById("light").style.animationPlayState = 'paused';
    document.getElementById("stream").pause();
  }
}

window.skip = function(val){
  if(document.getElementById("stream").src!=""){
    count+=val;
    if (count<0) {
      count=stationList[theStation].length-1;
    }
    if (count>=stationList[theStation].length) {
      count=0;
    }
  }
  if (theStation=="rand"){//this is a pretty dumb way to circumvent the folder seperation for the randomizer
    document.getElementById("stream").src="music/"+stationList[theStation][count];
    console.log("music/"+stationList[theStation][count]);
  }else{
    document.getElementById("stream").src="music/"+theStation+"/"+stationList[theStation][count];
    console.log("music/"+theStation+"/"+stationList[theStation][count]);
  }
  document.getElementById("record").style.filter = " grayscale(0%)";
  document.getElementById("record").style.animationPlayState = 'running';
  document.getElementById("stream").play();
}

window.switchstation = function(station) {
  if (station==null) {
    //console.log(Object.keys(stationList));
    document.getElementById("record").style.transition = "transform 1s";
    document.getElementById("light").style.transition = "transform 1s";
    if (document.getElementById("record").style.transform == "translateY(-1000px)") {
      document.getElementById("record").src = "images/"+theStation+"_record.png";
      document.getElementById("record").style.transform = "translateY(0px)";
      document.getElementById("light").style.transform = "translateY(0px)";
      setTimeout(cutAnim,1000);
      setTimeout(function() {skip(0);},2500);
    }else {
      document.getElementById("record").style.transform = "translateY(-1000px)";
      document.getElementById("light").style.transform = "translateY(-1000px)";
      setTimeout(switchstation,1000);
    }
  }else{
    if (station=="rand"){
      var holdover=[];
      stationList["rand"].length=0;
      for (var i = 0; i < Object.keys(stationList).length; i++) {//this is just to tide over while we don't have proper code with randomness.
        if(Object.keys(stationList)[i]!="rand"){
          for (var o = 0; o < stationList[Object.keys(stationList)[i]].length; o++) {
            holdover.push(Object.keys(stationList)[i]+"/"+stationList[Object.keys(stationList)[i]][o]);
          }
        }
      }
      while (stationList["rand"].length!=holdover.length) {
        var num=Math.floor(Math.random() * holdover.length);
        if (!stationList["rand"].includes(holdover[num])) {
          stationList["rand"].push(holdover[num]);
        }
      }
    }
    console.log(stationList["rand"]);
    document.getElementById("stream").pause();
    cutAnim();//"why is this in a different function" Because JavaScript hates me. also why setTimeout instead of a simple delay() func WHICH STOCK JAVASCRIPT DOESN'T HAVE FOR SOME REASON
    document.getElementById("record").style.filter = " grayscale(0%)";
    theStation=station;
    count=0;
    setTimeout(switchstation,500);
  }
}

function cutAnim(){
  document.getElementsByClassName("turntable")[0].classList.toggle("turntable-trans");
  document.getElementById("record").classList.toggle("rotate");
  document.getElementById("light").classList.toggle("light-rotate");
}

window.popinout = function(){
  if (document.getElementsByClassName("sidebar")[0].style.display == "none") {
    document.getElementsByClassName("sidebar")[0].style.display = "block";
    document.getElementsByClassName("innout")[0].style.right = "0px";
  } else {
    document.getElementsByClassName("sidebar")[0].style.display = "none";
    document.getElementsByClassName("innout")[0].style.right = "0px";
  }
}


window.gamestart = function(){
  document.getElementsByClassName("opening")[0].classList.add("fadeout");
    setTimeout(function() {document.getElementsByClassName("opening")[0].style.display = "none";
    document.getElementsByClassName("content")[0].style.display = "block";
    stop();},1000);
}