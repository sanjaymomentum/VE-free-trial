(function(VE){
function startCountdown(button,seconds,onTick,onDone){let remaining=seconds;button.disabled=true;const tick=()=>{onTick(remaining);if(remaining<=0){clearInterval(timer);button.disabled=false;onDone?.();return;}remaining--;};tick();const timer=setInterval(tick,1000);return()=>{clearInterval(timer);button.disabled=false;};}
function formatCountdown(seconds){return `00:${String(seconds).padStart(2,'0')}`;}

VE.startCountdown=startCountdown;
VE.formatCountdown=formatCountdown;
})(window.VE=window.VE||{});

