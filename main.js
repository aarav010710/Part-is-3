prediction = "";

camera = document.getElementById("camera");

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality: 90 
});

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JT8fXM-Sw/', modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!!");
}

function speak()
{
var synth = window.speechSynthesis;
var speak_data = "The Prediction is "+ prediction;
var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
}
function check()
{
img = document.getElementById("captured_image");
classifier.classify(img, got_result);
}

function got_result(error, results)
{
if(error)
{
    console.error(error);
}
else
{
console.log(results);
prediction = results[0].label;

document.getElementById("result_emotion").innerHTML = prediction;


speak();

if(prediction == "Amazing")
{
document.getElementById("result_emoji").innerHTML= "👌";
}

if(prediction == "best")
{
document.getElementById("result_emoji").innerHTML= "👍";
}

if(prediction == "Victory")
{
document.getElementById("result_emoji").innerHTML= "✌";
}

}
}

