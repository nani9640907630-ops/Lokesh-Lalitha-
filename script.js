const welcome = document.getElementById("welcome");
const invitation = document.getElementById("invitation");
const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

document.getElementById("openInvite").addEventListener("click", async () => {
  welcome.classList.add("hidden");
  invitation.classList.remove("hidden");
  window.scrollTo({top: 0, behavior: "instant"});
  try { await music.play(); setMusicState(true); }
  catch (_) { setMusicState(false); } // Some browsers require a second tap for audio.
});
function setMusicState(on) {
  musicIcon.textContent = on ? "♫" : "♪";
  musicLabel.textContent = on ? "MUSIC ON" : "MUSIC OFF";
  musicToggle.setAttribute("aria-pressed", String(on));
}
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); setMusicState(true); } catch (_) { setMusicState(false); }
  } else { music.pause(); setMusicState(false); }
});

// Scratch-to-reveal card: works with mouse, touch and stylus.
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d", {willReadFrequently:true});
let scratching = false, scratchedAway = false, scratchMoves = 0;
function sizeScratchCard() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.round(rect.width*dpr);
  canvas.height = Math.round(rect.height*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const w=rect.width,h=rect.height;
  const grad=ctx.createLinearGradient(0,0,w,h);
  grad.addColorStop(0,"#f8e8bd"); grad.addColorStop(.45,"#c69a4d"); grad.addColorStop(1,"#f6e6b8");
  ctx.globalCompositeOperation="source-over"; ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle="rgba(255,255,255,.75)"; ctx.lineWidth=1;
  for(let y=15;y<h;y+=18){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
  ctx.fillStyle="#6d5125";ctx.textAlign="center";ctx.textBaseline="middle";
  ctx.font="600 13px Cinzel,serif";ctx.fillText("✧  SCRATCH TO REVEAL  ✧",w/2,h/2-8);
  ctx.font="22px Georgia,serif";ctx.fillText("✦",w/2,h/2+22);
  ctx.globalCompositeOperation="source-over";
  scratchedAway=false;
}
function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
function scratch(e){
  if(!scratching)return;
  const p=point(e);ctx.globalCompositeOperation="destination-out";
  ctx.beginPath();ctx.arc(p.x,p.y,23,0,Math.PI*2);ctx.fill();
  scratchMoves++;
  if(!scratchedAway && scratchMoves % 10 === 0 && canvas.width){
    const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let visible=0, sampled=0;
    for(let i=3;i<pixels.length;i+=128){sampled++;if(pixels[i]>0)visible++;}
    if(visible < sampled*.38){
      canvas.style.transition="opacity .35s";canvas.style.opacity="0";
      canvas.style.pointerEvents="none";scratchedAway=true;
    }
  }
}
canvas.addEventListener("pointerdown",e=>{scratching=true;canvas.setPointerCapture(e.pointerId);scratch(e);});
canvas.addEventListener("pointermove",scratch);
canvas.addEventListener("pointerup",()=>{scratching=false;});
canvas.addEventListener("pointercancel",()=>{scratching=false;});
document.getElementById("revealButton").addEventListener("click",()=>{canvas.style.transition="opacity .35s";canvas.style.opacity="0";canvas.style.pointerEvents="none";scratchedAway=true;});
window.addEventListener("resize",()=>{if(!scratchedAway)sizeScratchCard();});
sizeScratchCard();

document.getElementById("shareButton").addEventListener("click",async()=>{
  const shareData={title:"Lokesh ❤️ Lalitha — Wedding Invitation",text:"You are warmly invited to the wedding celebrations of Lokesh and Lalitha on 11 & 12 December 2026 at B V R Gardens, Dharmavaram.",url:window.location.href};
  if(navigator.share){try{await navigator.share(shareData);}catch(_){}}
  else if(navigator.clipboard){try{await navigator.clipboard.writeText(shareData.text+" "+shareData.url);alert("Invitation details copied. You can share them on WhatsApp.");}catch(_){alert(shareData.text);}}
  else {alert(shareData.text);}
});
