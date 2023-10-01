object_detected = "";
img = "";
objects = [];
status = "";

function preload(){
    img = loadImage("chair.jpg");
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    object_detected = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}
function modelLoaded(){
    console.log("the model is laoeded");
    status = true;
    object_detected.detect(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    if (status != undefined){
        image(img,0,0,640,420);
        for (var i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status : objects detected";
            fill(255,0,0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(255,0,0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}