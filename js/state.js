(function(VE){
const {developers,services}=VE;
const {isWorkingDay,dateKey}=VE;
const KEY='ve-direct-figma-prototype';
function initial(){const meetingDate=new Date();meetingDate.setHours(12,0,0,0);while(!isWorkingDay(meetingDate))meetingDate.setDate(meetingDate.getDate()+1);return {step:1,developerId:developers[0].id,serviceId:services[0].id,contact:{name:'',email:'',country:'+1',phone:''},otpVerified:false,trialStart:null,meeting:{date:dateKey(meetingDate),time:'10:00 AM',platform:'teams'},invoiceReference:'VE-2026-135143',assignmentPaused:false};}
const base=initial();
function readSaved(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{};}catch{return {};}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{/* file:// storage can be disabled by browser policy; keep this session usable. */}}
const saved=readSaved();
let state={...base,...saved,contact:{...base.contact,...saved.contact},meeting:{...base.meeting,...saved.meeting,date:saved.meeting?.date||base.meeting.date,time:saved.meeting?.time||base.meeting.time}};
const getState=()=>state;
function updateState(patch){state={...state,...patch};persist();}
function updateContact(patch){state.contact={...state.contact,...patch};persist();}
function resetState(){state=initial();try{localStorage.removeItem(KEY);}catch{/* storage is optional for direct-file sessions */}}
const getDeveloper=()=>developers.find(d=>d.id===state.developerId)||developers[0];
const getService=()=>services.find(s=>s.id===state.serviceId)||services[0];

VE.KEY=KEY;
VE.initial=initial;
VE.base=base;
VE.state=state;
VE.getState=getState;
VE.updateState=updateState;
VE.updateContact=updateContact;
VE.resetState=resetState;
VE.getDeveloper=getDeveloper;
VE.getService=getService;
})(window.VE=window.VE||{});

