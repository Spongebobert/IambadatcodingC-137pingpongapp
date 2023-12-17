
status1 = "";
objects = []

function setup(){
    canvas = createCanvas(480,380);
    canvas.center()

    video = createCapture();
    video.hide()
}
function draw(){
    image(video,0,0,480,380)

    if(status1 !=""){
        object_detector.detect(video,gotResult);
        console.log("now")
        for(i=0; i < objects.length; i++){
            console.log("maybe")
            percent = floor(objects[i].confidence*100)
            label = objects[i].label;
            text(label + " "+ percent +"%",objects[i].x,objects[i].y)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            if(objects[i].label == input){
                video.stop()
                object_detector.detect(gotResult);
                document.getElementById("status").innerHTML = input +" Detected";

            }
            else if(objects[i].label != input)
            video.stop()
        object_detector.detect(gotResult);
        document.getElementById("status").innerHTML = input +"not detected";
        }
    }
}
function start(){
    object_detector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status: detecting objects"
    input = document.getElementById("input").value
    gotResult()
}
function gotResult(results,error){
if(error){
    console.error(error)
}
else{
    console.log(results)
    objects = results;
}
}
 
function modelloaded(){
    console.log("model is loaded")
    status1 = true;
}