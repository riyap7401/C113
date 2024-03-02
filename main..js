//https://teachablemachine.withgoogle.com/models/NzM_ddc70/


Webcam.set({
   width:350,
   height:300,
   image_format : 'png',
   png_quality:90
 });

 camera = document.getElementById("camera");

Webcam.attach( '#camera' );

     
function take_snapshot()
{
   Webcam.snap(function(data_uri) {
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
   });
}

 console.log('ml5 version:', ml5.version);
 
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NzM_ddc70model.json',modelLoaded);

 function modelLoaded() {
   console.log('Model Loaded!');
 }
     
 function check()
 {
   img = document.getElementById('captured_image');
   classifier.classify(img, gotResult);
 }

function gotResult(error, results) {
 if (error) {
   console.error(error);
 } else {
   console.log(results);
   
   document.getElementById("result_object_name").innerHTML = results[0].label;

   gesture = results[0].label;
   
   toSpeak = "";
   
   if(gesture == "Peace Sign")
   {
     toSpeak = "Peace";
     document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
   }
   else if(gesture == "Gnarly Sign")
   {
     toSpeak = "Gnarly";
     document.getElementById("result_object_gesture_icon").innerHTML = "&#129304;";
   }
   else if(gesture == "Okay Gesture")
   {
     toSpeak = "Okay";
     document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
   }

   speak();
 }
}


function speak(){
   var synth = window.speechSynthesis;

   speak_data = toSpeak;

   var utterThis = new SpeechSynthesisUtterance(speak_data);

   synth.speak(utterThis);
}