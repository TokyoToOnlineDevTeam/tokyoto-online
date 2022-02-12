var list = ["doinurmombut.mp3","iloveyoubump.mp3","what.mp3"];
var count=0;

function test(){
const collection = document.getElementsByClassName("rotate");
  if (document.getElementById("stream").paused) {
    collection[0].style.filter = " grayscale(0%)";
    collection[0].style.animationPlayState = 'running';
    document.getElementById("stream").play();
  }else{
    collection[0].style.filter = " grayscale(100%)";
    collection[0].style.animationPlayState = 'paused';
    document.getElementById("stream").pause();
  }
}

function skip(val){
  if(document.getElementById("stream").src!=""){
    count+=val;
    if (count<0) {
      count=list.length-1;
    }
    if (count>=list.length) {
      count=0;
    }
  }
  document.getElementById("stream").src="music/"+list[count];
  collection = document.getElementsByClassName("rotate");
  collection[0].style.filter = " grayscale(0%)";
  collection[0].style.animationPlayState = 'running';
  document.getElementById("stream").play();
}
