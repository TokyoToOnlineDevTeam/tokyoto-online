var allofit={live:["iloveyoubump.mp3","what.mp3"],memes:["doinurmombut.mp3"],jsr:["coldjgw.mp3"],jsrf:["teknopathic.mp3"],rand:[]};//This is supposed to be the folders in the music server
var count=0;
var theStation="live";
function stop(){
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

function skip(val){
  if(document.getElementById("stream").src!=""){
    count+=val;
    if (count<0) {
      count=allofit[theStation].length-1;
    }
    if (count>=allofit[theStation].length) {
      count=0;
    }
  }

  document.getElementById("stream").src="music/"+allofit[theStation][count];
  document.getElementById("record").style.filter = " grayscale(0%)";
  document.getElementById("record").style.animationPlayState = 'running';
  document.getElementById("stream").play();
}

function switchstation(station) {
  if (station==null) {
    //console.log(Object.keys(allofit));
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
      allofit["rand"].length=0;
      for (var i = 0; i < Object.keys(allofit).length; i++) {//if we ever go with folders, this will need to be changed
        if(Object.keys(allofit)[i]!="rand"){
          for (var o = 0; o < allofit[Object.keys(allofit)[i]].length; o++) {
            holdover.push(allofit[Object.keys(allofit)[i]][o]);
          }
        }
      }
      while (allofit["rand"].length!=holdover.length) {
        var num=Math.floor(Math.random() * holdover.length);
        if (!allofit["rand"].includes(holdover[num])) {
          allofit["rand"].push(holdover[num]);
        }
      }
    }
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

function popinout(){
  if (document.getElementsByClassName("sidebar")[0].style.display == "none") {
    document.getElementsByClassName("sidebar")[0].style.display = "block";
    document.getElementsByClassName("innout")[0].style.right = "0px";
  } else {
    document.getElementsByClassName("sidebar")[0].style.display = "none";
    document.getElementsByClassName("innout")[0].style.right = "0px";
  }
}

function gamestart(){
    document.getElementsByClassName("opening")[0].classList.add("fadeout");
    setTimeout(function() {document.getElementsByClassName("opening")[0].style.display = "none";
    document.getElementsByClassName("content")[0].style.display = "block";
    stop();},1000);

}
