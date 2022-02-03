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
