timer = document.getElementById("timer");
startBtn = document.getElementById("start");
stopBtn = document.getElementById("stop");
pauseBtn = document.getElementById("pause");

timeLeft = 60;
interval = null;
paused = false;

//the Pause and Stop disabled and the start button enabled
pauseBtn.disabled = true;
stopBtn.disabled = true;

//update the timer every second
function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        if(seconds < 10){
            seconds = "0" + seconds;
        }

        // Display time format
        timer.textContent = minutes + ":" + seconds;

        //timer below or = 15 seconds
        if(timeLeft <= 15){
            timer.classList.add("warning");
        }

         //the timer reaches 0, display an alert to take a break.
        if(timeLeft <=0){
            clearInterval(interval);
            alert("Take a short break!");
        }

        timeLeft--;
   }

//Start button. tracks the time since the start button was pressed and only starts again when the start button is clicked
startBtn.onclick = function(){
    interval = setInterval(updateTimer,1000); //timer update once per second


    // Start button clicked Pause Stop buttons enabled Start button disabled
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
}

//Stop buttonclicked, the three buttons in intial state
stopBtn.onclick = function(){
        clearInterval(interval);
        timeLeft = 60;

        timer.textContent = "1:00";
        timer.classList.remove("warning");

         // Reset buttons to initial state
         startBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;

        pauseBtn.textContent = "Pause";
        paused = false;
}

//Pause Button
pauseBtn.onclick = function(){

    //pause the timer instead of resetting it
        if(!paused){
            clearInterval(interval);
             //pause button is clicked, the text should switch to"Resume"
            pauseBtn.textContent = "Resume";
            paused = true;
        }
        //resume timer
        else{
            interval = setInterval(updateTimer, 1000);
            // clicking it again should return to "Pause" while the timer continues running.
            pauseBtn.textContent = "Pause";
            paused = false;
        }
}