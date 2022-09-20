function setup(){
canvas=createCanvas(400,400);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth=window.speechSynthesis;
}

function preload(){
    classifier=mls.imageClassifier('DoodleNet');
}

function clearCanvas(){
    background("whithe");
}

function draw(){
    strokeWeight(13);
    stroke(0);

    if (mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas,goResult);
}

function goResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML='Etiqueta: '+results[0].label;
    document.getElementById('confidence').innerHTML='Confianza: '+Math.round(results[0].confidence*100)+'%';
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}