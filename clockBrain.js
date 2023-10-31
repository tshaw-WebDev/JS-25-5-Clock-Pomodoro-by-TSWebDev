$(document).ready(function(){
    //Global variables
    let breakCtr = 5;
    let sessionCtr = 25; 
    let tmp = '';  
    let isPlay = false;
    let dispVal;
    let dispValMin = 0;
    let dispValSec = 0;
    let setInt_ID1 = 0;
    let setInt_ID2 = 0;
    let isBreak = false;

//Code
    $('#break-length').text(breakCtr);
    $('#session-length').text(sessionCtr);
    tmp = sessionCtr + ':' + '00';   
    $('#time-left').text(tmp);
    
    $('#break-increment').click(function(){
        if (isPlay === false){
            if(breakCtr < 60){
                breakCtr++;
                $('#break-length').text(breakCtr);
            }
        }
    })
    $('#break-decrement').click(function(){
        if (isPlay === false){
            if(breakCtr > 1){
                breakCtr --;
                $('#break-length').text(breakCtr);
            }
        }
    })
    $('#session-increment').click(function(){
        if (isPlay === false){
            if(sessionCtr < 60){
                sessionCtr++;
                $('#session-length').text(sessionCtr);
            }
            tmp = sessionCtr + ':' + '00';
            $('#time-left').text(tmp);
        }
    })
    $('#session-decrement').click(function(){
        if (isPlay === false){
            if(sessionCtr > 1){
                sessionCtr--;
                $('#session-length').text(sessionCtr);
            }
            tmp = sessionCtr + ':' + '00';
            $('#time-left').text(tmp);
        }
    })

    const updateDisplay = () => {
    //to show the updated time in the timer
        let min = '';
        let sec = '';
        if (dispValMin < 10) {
            min = '0' + dispValMin;
        } else min = dispValMin;

        if (dispValSec < 10) {
            sec = '0' + dispValSec;
        }else sec = dispValSec;

            $('#time-left').text(min + ':' + sec);
            clearTimeout(setInt_ID1);
            clearTimeout(setInt_ID2);
    }


    const updateTimer = () => {
//purpose is to decrement the seconds countand / or the minutes count and display the updated time 
        if(isBreak === false){
//counting down the session length
                if(dispValMin >= 1 && dispValSec === 0){
                    dispValSec = 59;
                    dispValMin--;
                    updateDisplay();
                } else if(dispValMin >= 0 && dispValSec !== 0){
                    dispValSec--;
                    updateDisplay();
                } else if(dispValMin === 0 && dispValSec === 0){
                    isBreak = true;
                    dispValMin = breakCtr;
                    dispValSec = 0;
                    $('#timer-label').text('Break');
                    document.getElementById('beep').play();
                    document.getElementById('beep').muted = false;
                    updateDisplay();
            
               }

        } else if(isBreak === true){
//counting down the break length
                if(dispValMin >= 1 && dispValSec === 0){
                        dispValSec = 59;
                        dispValMin--;
                        updateDisplay();
                  } else if(dispValMin >= 0 && dispValSec !== 0){
                        dispValSec--;
                        updateDisplay();

                  } else if(dispValMin === 0 && dispValSec === 0){
                        isBreak = false;
                        dispValMin = sessionCtr;
                        dispValSec = 0;
                        $('#timer-label').text('Session');
                        document.getElementById('beep').play();
                        document.getElementById('beep').muted = false;
                        updateDisplay();
                
                  }
     
            }      
            setInt_ID2 = setTimeout(updateTimer, 1000);
        }

        $('#start_stop').click(function(){
            dispVal = $('#time-left').text().split(':');
            dispValMin = parseInt(dispVal[0]);
            dispValSec = parseInt(dispVal[1]);
            
            if(isPlay === false){
                //start the timer...
                isPlay = true;
                setInt_ID1 = setTimeout(updateTimer, 1000);
            } else if(isPlay === true){
                //stop the timer...
                isPlay = false;
                clearTimeout(setInt_ID1);
                clearTimeout(setInt_ID2);
            }
       })
        
        $('#reset').click(function(){
            breakCtr = 5;
            sessionCtr = 25;
            $('#break-length').text(breakCtr);
            $('#session-length').text(sessionCtr);
            tmp = sessionCtr + ':' + '00';
            $('#time-left').text(tmp);
            $('#timer-label').text('Session');
            clearTimeout(setInt_ID1);
            clearTimeout(setInt_ID2);
            isPlay = false;
            isBreak = false;
            let clip = document.getElementById('beep');
            clip.pause();
            clip.currentTime = 0;     

        })

})












