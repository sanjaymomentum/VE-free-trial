(function(VE){
const {meetingAvailability}=VE;
const slots=(()=>{const list=[];for(let h=meetingAvailability.startHour;h<meetingAvailability.endHour;h++)for(let m=0;m<60;m+=meetingAvailability.intervalMinutes){const hour=h%12||12,minute=String(m).padStart(2,'0'),ampm=h<12?'AM':'PM';list.push(`${hour}:${minute} ${ampm}`);}return list;})();

VE.slots=slots;
})(window.VE=window.VE||{});

