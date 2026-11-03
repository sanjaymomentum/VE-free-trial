(function(VE){
const {render}=VE;
const {getState,updateState}=VE;
document.addEventListener('DOMContentLoaded',()=>{const match=location.hash.match(/step-(\d)/);if(match)updateState({step:Math.min(6,Math.max(1,Number(match[1])))});render();document.addEventListener('keydown',event=>{if(event.altKey&&event.key==='ArrowLeft'){history.back();}});});


})(window.VE=window.VE||{});

