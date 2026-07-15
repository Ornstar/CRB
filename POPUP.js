"use strict";

(function(){

const IMG=[
"https://plcl.me/images/UXwY2.jpg",
"https://plcl.me/images/c9Q3n.png",
"https://plcl.me/images/ngZxj.png"
];

const DELAY="popup_delay_1h";
const INTERVAL=10000;
const STYLE_ID="crb-popup-style";
const POPUP_ID="crb-popup";
const OVERLAY_ID="crb-popup-overlay";

let made=false;
let idx=0;
let timer=null;

function allowed(){
const p=location.pathname.replace(/\/+$/,"").toLowerCase();
return p===""||p==="/"||p.includes("home");
}

function canShow(){
if(!allowed()) return false;
const t=Number(localStorage.getItem(DELAY)||0);
return !(t && Date.now()-t<3600000);
}

function injectStyle(){
if(document.getElementById(STYLE_ID)) return;

const s=document.createElement("style");
s.id=STYLE_ID;

s.textContent=`
@keyframes crbFadeIn{from{opacity:0}to{opacity:1}}
@keyframes crbFadeOut{from{opacity:1}to{opacity:0}}
@keyframes crbSlideIn{from{transform:translateY(25px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes crbSlideOut{from{transform:translateY(0);opacity:1}to{transform:translateY(25px);opacity:0}}
@keyframes crbShine{0%{left:-40%}100%{left:125%}}

#crb-popup-overlay{
position:fixed;
inset:0;
z-index:2147483646;
background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.82));
backdrop-filter:blur(8px);
-webkit-backdrop-filter:blur(8px);
animation:crbFadeIn .35s ease forwards;
}

#crb-popup-overlay.fade-out{
animation:crbFadeOut .35s ease forwards;
}

#crb-popup{
position:fixed;
inset:0;
z-index:2147483647;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
gap:10px;
padding:12px;
box-sizing:border-box;
}

#crb-popup-box{
position:relative;
animation:crbSlideIn .45s ease forwards;
filter:drop-shadow(0 18px 40px rgba(0,0,0,.6));
}

#crb-popup-box.slide-out{
animation:crbSlideOut .45s ease forwards;
}

#crb-close{
position:absolute;
top:-12px;
right:-12px;
width:32px;
height:32px;
border-radius:50%;
background:linear-gradient(180deg,#a855f7,#4c1d95 60%,#111);
color:#fff;
font-weight:900;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
z-index:9999;
border:1px solid #c084fc;
box-shadow:0 0 16px rgba(168,85,247,.7);
}

#crb-popup-img{
display:block;
max-width:92vw;
max-height:58vh;
height:auto;
border-radius:12px;
opacity:1;
transition:opacity .35s ease;
box-shadow:0 0 22px rgba(168,85,247,.45),0 0 45px rgba(91,33,182,.35);
}

#crb-popup-img.fade{
opacity:0;
}

.crb-nav{
position:absolute;
top:50%;
transform:translateY(-50%);
width:28px;
height:28px;
border-radius:50%;
border:1px solid #c084fc;
background:linear-gradient(180deg,#7c3aed,#2e1065);
color:#fff;
font-size:24px;
font-weight:900;
cursor:pointer;
z-index:9998;
line-height:22px;
box-shadow:0 0 14px rgba(168,85,247,.55);
}

#crb-prev{left:8px;}
#crb-next{right:8px;}

#crb-dots{
position:absolute;
left:50%;
bottom:10px;
transform:translateX(-50%);
display:flex;
gap:6px;
z-index:9998;
}

.crb-dot{
width:7px;
height:7px;
border-radius:50%;
border:none;
background:rgba(255,255,255,.45);
padding:0;
cursor:pointer;
}

.crb-dot.active{
background:#a855f7;
box-shadow:0 0 10px #a855f7;
}

#crb-title{
font-weight:900;
font-size:16px;
color:#d8b4fe;
letter-spacing:2px;
text-shadow:0 0 10px rgba(168,85,247,.9),0 0 25px rgba(168,85,247,.55);
}

.crb-gif-row{
display:flex;
gap:10px;
justify-content:center;
align-items:center;
}

.crb-gif-box{
position:relative;
width:90px;
}

.crb-gif-box img{
width:100%;
border-radius:12px;
pointer-events:none;
box-shadow:0 0 10px rgba(168,85,247,.35);
}

.crb-btn-row{
width:310px;
display:flex;
flex-wrap:wrap;
gap:8px;
align-items:center;
justify-content:center;
margin-top:2px;
}

.crb-btn-row .crb-btn{
width:148px;
font-size:12px;
padding:12px 0;
white-space:nowrap;
}

.crb-btn-row .crb-ok{
width:120px;
font-size:13px;
}

.crb-btn-row .crb-btn{
width:135px;
}

.crb-btn-row .crb-ok{
width:120px;
}

.crb-btn{
width:100%;
}

.crb-ok{
width:115px;
}

.crb-btn{
position:relative;
overflow:hidden;
width:100%;
padding:13px 0;
border-radius:15px;
font-size:14px;
cursor:pointer;
text-decoration:none;
text-align:center;
font-weight:900;
letter-spacing:.5px;
color:#fff!important;
background:linear-gradient(180deg,#8b5cf6 0%,#6d28d9 30%,#3b0764 70%,#111 100%);
border:1px solid #c084fc;
box-shadow:0 0 12px rgba(139,92,246,.7),0 0 28px rgba(139,92,246,.38),0 9px 22px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.2);
transition:transform .18s ease,filter .18s ease;
}

.crb-ok{
position:relative;
overflow:hidden;
width:120px;
padding:11px 0;
border-radius:14px;
font-size:14px;
cursor:pointer;
text-align:center;
font-weight:900;
color:#fff!important;
background:linear-gradient(180deg,#a855f7 0%,#6d28d9 38%,#3b0764 75%,#111 100%);
border:1px solid #d8b4fe;
box-shadow:0 0 12px rgba(168,85,247,.8),0 0 25px rgba(168,85,247,.45),0 8px 20px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.2);
transition:transform .18s ease,filter .18s ease;
}

.crb-btn:hover,.crb-ok:hover{
transform:scale(1.045);
filter:brightness(1.18);
}

.crb-btn:active,.crb-ok:active{
transform:scale(.96);
}

.crb-btn:before,.crb-ok:before{
content:'';
position:absolute;
top:0;
left:-40%;
width:25%;
height:100%;
background:linear-gradient(120deg,rgba(255,255,255,0),rgba(216,180,254,.95),rgba(255,255,255,0));
transform:skewX(-25deg);
animation:crbShine 2s infinite;
}

@media(max-width:768px){
#crb-popup{
gap:8px;
}

.crb-gif-box{
width:78px;
}

.crb-btn-row{
width:310px;
gap:8px;
}

.crb-btn{
font-size:12px;
padding:11px 0;
white-space:nowrap;
}

.crb-btn-row .crb-btn{
width:148px;
}

.crb-ok{
width:115px;
font-size:13px;
padding:10px 0;
}

#crb-popup-img{
max-width:94vw;
max-height:55vh;
}
}
`;

document.head.appendChild(s);
}

function createPopup(){

if(made||!canShow()||!document.body) return;

made=true;

injectStyle();

const o=document.createElement("div");
o.id=OVERLAY_ID;

const p=document.createElement("div");
p.id=POPUP_ID;

p.innerHTML=`
<div id="crb-popup-box">
<div id="crb-close">✕</div>
<button class="crb-nav" id="crb-prev">‹</button>
<img id="crb-popup-img" src="${IMG[0]}">
<button class="crb-nav" id="crb-next">›</button>
<div id="crb-dots"></div>
</div>

<div id="crb-title">WORLD CUP 2026</div>

<div class="crb-gif-row">
<div class="crb-gif-box">
<img src="https://media.tenor.com/ky4lyYmnHlsAAAAM/starlight-princess-slot-inces.gif">
</div>

<div class="crb-gif-box">
<img src="https://media.tenor.com/Hm5Hk1U_uVoAAAAd/fifa-world-cup-2026-fifa.gif">
</div>

<div class="crb-gif-box">
<img src="https://imgcdn.it.com/knb2zump50st9c6kzrne/VIP_AI88/lucky_neko.webp">
</div>
</div>

<div class="crb-btn-row">
<a class="crb-btn" href="https://access.vpnceria.life/allinone" target="_blank">
⚽ ALL IN ONE
</a>

<a class="crb-btn" href="https://access.vpnceria.life/prediksi-bola" target="_blank">
PREDIKSI BOLA ⚽
</a>

<button class="crb-ok" id="crb-ok">
OK
</button>
</div>
`;

document.body.appendChild(o);
document.body.appendChild(p);

const box=document.getElementById("crb-popup-box");
const img=document.getElementById("crb-popup-img");
const dots=document.getElementById("crb-dots");

function renderDots(){
dots.innerHTML="";
IMG.forEach(function(_,i){
const d=document.createElement("button");
d.className="crb-dot"+(i===idx?" active":"");
d.onclick=function(){
goTo(i);
resetTimer();
};
dots.appendChild(d);
});
}

function goTo(i){
img.classList.add("fade");
setTimeout(function(){
idx=i;
img.src=IMG[idx];
img.classList.remove("fade");
renderDots();
},250);
}

function next(){
goTo((idx+1)%IMG.length);
}

function prev(){
goTo((idx-1+IMG.length)%IMG.length);
}

function startTimer(){
timer=setInterval(next,INTERVAL);
}

function resetTimer(){
if(timer) clearInterval(timer);
startTimer();
}

function closePopup(){

if(timer) clearInterval(timer);

box.classList.add("slide-out");
o.classList.add("fade-out");

localStorage.setItem(DELAY,Date.now());

setTimeout(function(){
p.remove();
o.remove();
},450);
}

document.getElementById("crb-next").onclick=function(){
next();
resetTimer();
};

document.getElementById("crb-prev").onclick=function(){
prev();
resetTimer();
};

document.getElementById("crb-close").onclick=closePopup;
document.getElementById("crb-ok").onclick=closePopup;

renderDots();
startTimer();
}

function init(){

let r=0;

const e=setInterval(function(){

createPopup();

r++;

if(made||r>=40){
clearInterval(e);
}

},500);
}

if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded",init);
}else{
init();
}

})();
