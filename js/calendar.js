(function(VE){
window.VE=window.VE||{};
const fmtKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
VE.dateKey=fmtKey;
VE.isWorkingDay=function(date){return date.getDay()!==0&&date.getDay()!==6&&!VE.holidays.includes(fmtKey(date));};
VE.addWorkingDays=function(start,count){const d=new Date(start);let n=0;while(n<count){if(VE.isWorkingDay(d))n++;if(n<count)d.setDate(d.getDate()+1);}return d;};
VE.defaultTrialStart=function(){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+1);while(!VE.isWorkingDay(d))d.setDate(d.getDate()+1);return d;};
VE.trialEnd=function(start){return VE.addWorkingDays(start,10);};
VE.dateLabel=function(date,options={month:'short',day:'numeric',year:'numeric'}){return new Intl.DateTimeFormat('en-US',options).format(date);};
VE.calendarMarkup=function(monthDate,selectedKey,{minimum=null,maximum=null,disabledWeekends=true}={}){const year=monthDate.getFullYear(),month=monthDate.getMonth(),first=new Date(year,month,1),days=new Date(year,month+1,0).getDate(),minKey=minimum?fmtKey(minimum):null,maxKey=maximum?fmtKey(maximum):null;let html='<div class="calendar-grid">';['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(w=>html+=`<span class="weekday">${w}</span>`);const previousDays=new Date(year,month,0).getDate();for(let i=0;i<first.getDay();i++)html+=`<button type="button" class="day adjacent" disabled aria-hidden="true">${previousDays-first.getDay()+i+1}</button>`;for(let n=1;n<=days;n++){const d=new Date(year,month,n),key=fmtKey(d),blocked=(disabledWeekends&&!VE.isWorkingDay(d))||(minKey&&key<minKey)||(maxKey&&key>maxKey);html+=`<button type="button" class="day${key===selectedKey?' selected':''}" data-date="${key}" ${blocked?'disabled':''} aria-pressed="${key===selectedKey}">${n}</button>`;}let cells=first.getDay()+days,nextDay=1;while(cells%7!==0){html+=`<button type="button" class="day adjacent" disabled aria-hidden="true">${nextDay++}</button>`;cells++;}return html+'</div>';};
VE.todayDate=function(){const d=new Date();d.setHours(12,0,0,0);return d;};
VE.trialMinDate=function(){const d=VE.todayDate();d.setDate(d.getDate()+1);return d;};
VE.maxTrialDate=function(){const d=VE.todayDate();d.setDate(d.getDate()+30);return d;};
VE.isTrialDateBookable=function(date){const d=typeof date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(date)?new Date(`${date}T12:00:00`):new Date(date);d.setHours(12,0,0,0);return fmtKey(d)>=fmtKey(VE.trialMinDate())&&fmtKey(d)<=fmtKey(VE.maxTrialDate())&&VE.isWorkingDay(d);};
VE.monthHasTrialDate=function(monthDate){const first=new Date(monthDate.getFullYear(),monthDate.getMonth(),1),last=new Date(monthDate.getFullYear(),monthDate.getMonth()+1,0);for(let day=1;day<=last.getDate();day++){const date=new Date(first.getFullYear(),first.getMonth(),day);if(VE.isTrialDateBookable(date))return true;}return false;};
VE.firstTrialDate=function(){const first=VE.trialMinDate(),latest=VE.maxTrialDate();for(let date=new Date(first);fmtKey(date)<=fmtKey(latest);date.setDate(date.getDate()+1)){if(VE.isWorkingDay(date))return new Date(date);}return first;};
VE.initialTrialDate=function(){const tomorrow=VE.defaultTrialStart();return VE.isTrialDateBookable(tomorrow)?tomorrow:VE.firstTrialDate();};
VE.meetingDates=function(trialStart){const first=VE.trialMinDate(),limit=typeof trialStart==='string'?new Date(`${trialStart}T12:00:00`):new Date(trialStart||VE.maxTrialDate());limit.setHours(12,0,0,0);const dates=[];for(let date=new Date(first);fmtKey(date)<=fmtKey(limit)&&dates.length<3;date.setDate(date.getDate()+1)){if(VE.isWorkingDay(date))dates.push(new Date(date));}return dates;};

VE.fmtKey=fmtKey;
})(window.VE=window.VE||{});


