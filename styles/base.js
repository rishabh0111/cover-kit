/* Shared plumbing for every cover template in styles/ (not bbg.html).
   Same contract as bbg.html (the flow style): the renderer injects
   window.SPEC, waits for window.__ready, reads window.__overlaps, then calls
   window.setFrame(i, n) once per frame. Frame 0 must be a finished
   composition (LinkedIn holds it when a GIF does not animate).            */
(function(){
const NS="http://www.w3.org/2000/svg";
const el=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e;};
const text=(x,y,s,o)=>{const t=el("text",{x,y,...o});t.textContent=s;return t;};

/* fonts ship beside the templates, loaded by relative path so renders need nothing installed */
const FONTS=[
  ["Atkinson Hyperlegible",400,"AtkinsonHyperlegible-Regular.ttf"],
  ["Atkinson Hyperlegible",700,"AtkinsonHyperlegible-Bold.ttf"],
  ["Anton",400,"Anton-Regular.ttf"],
  ["JetBrains Mono","100 800","JetBrainsMono.ttf"],
  ["Caveat","400 700","Caveat.ttf"],
  ["Space Grotesk","300 700","SpaceGrotesk.ttf"],
  ["Instrument Serif",400,"InstrumentSerif-Italic.ttf","italic"],
];
const css=document.createElement("style");
css.textContent=FONTS.map(([f,w,file,st])=>`@font-face{font-family:"${f}";font-weight:${w};font-style:${st||"normal"};src:url("../fonts/${file}") format("truetype");}`).join("\n")+
  `html,body{margin:0;padding:0;overflow:hidden;} svg{display:block;} text{white-space:pre;font-variant-ligatures:none;font-feature-settings:"liga" 0,"calt" 0;}`;
document.head.appendChild(css);

function setup(W,H,bg){
  document.body.style.background=bg; document.body.style.width=W+"px"; document.body.style.height=H+"px";
  const svg=el("svg",{width:W,height:H,viewBox:`0 0 ${W} ${H}`}); document.body.appendChild(svg);
  const defs=el("defs",{}); svg.appendChild(defs);
  svg.appendChild(el("rect",{x:0,y:0,width:W,height:H,fill:bg}));
  return {svg,defs};
}

/* the one thing every style keeps: the same mark, same place, same size.
   Set "brand" in the spec (your site or handle); without it no mark is drawn. */
function brand(svg,S,{fill,bar,font},W,y){
  if(!S.brand) return null;
  const t=text(W-44,y||56,S.brand,{"text-anchor":"end",fill,
    "font-family":font||"Atkinson Hyperlegible","font-size":20,"font-weight":700,class:"brand"});
  svg.appendChild(t);
  svg.appendChild(el("rect",{x:W-44-t.getComputedTextLength()-22,y:(y||56)-16,width:8,height:20,rx:2,fill:bar}));
  return t;
}

/* shrink a text element until it fits maxW */
function fit(t,maxW,size,min){ let s=size;
  for(;;){ t.setAttribute("font-size",s); if(t.getComputedTextLength()<=maxW||s<=min)break; s-=1; } return s; }

/* greedy word wrap, measured with the real font */
function wrap(parent,str,maxW,attrs){
  const probe=text(0,-999,"",attrs); parent.appendChild(probe);
  const lines=[]; let cur="";
  String(str).split(/\s+/).forEach(w=>{ const nx=cur?cur+" "+w:w; probe.textContent=nx;
    if(probe.getComputedTextLength()>maxW&&cur){lines.push(cur);cur=w;} else cur=nx; });
  if(cur)lines.push(cur); probe.remove(); return lines;
}

/* text-on-text (and text-off-canvas) check; mark decorative text with class "free" to exempt it */
function overlaps(W,H,extra){
  const boxes=[];
  document.querySelectorAll("text:not(.free)").forEach(t=>{ if(!t.textContent.trim())return;
    const r=t.getBoundingClientRect(); if(r.width>0) boxes.push({b:{x:r.x,y:r.y,width:r.width,height:r.height},s:t.textContent.slice(0,40),g:t.getAttribute("data-g")}); });
  (extra||[]).forEach(e=>boxes.push(e));
  const out=[], pad=4;
  const hit=(p,q)=>p.x<q.x+q.width-pad&&q.x<p.x+p.width-pad&&p.y<q.y+q.height-pad&&q.y<p.y+p.height-pad;
  boxes.forEach(({b,s})=>{ if(b.x<-1||b.y<-1||b.x+b.width>W+1||b.y+b.height>H+1) out.push(s+"  <->  [canvas edge]"); });
  for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
    if(boxes[i].g&&boxes[i].g===boxes[j].g)continue;
    if(hit(boxes[i].b,boxes[j].b)) out.push(boxes[i].s+"  <->  "+boxes[j].s); }
  return out;
}

function ready(W,H,extra){
  const loads=FONTS.map(([f,w,,st])=>document.fonts.load(`${st||""} ${String(w).split(" ").pop()} 100px "${f}"`));
  return Promise.all(loads).then(()=>document.fonts.ready);
}
/* call after building: runs frame 0, records overlaps, flags ready */
function done(W,H,extraFn){
  window.setFrame(0,1);
  window.__overlaps=overlaps(W,H,extraFn?extraFn():[]);
  window.__ready=true;
}

/* build only once fonts are loaded, or every measurement is taken with the fallback font */
function run(build){ ready().then(()=>{ const extra=build(); done(window.SPEC.width||1200,window.SPEC.height||1200,extra); }); }

/* motion helpers: everything is a function of t in [0,1) so loops close exactly */
const TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease={ inOut:u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2, out:u=>1-Math.pow(1-u,3), back:u=>1+2.7*Math.pow(u-1,3)+1.7*Math.pow(u-1,2) };
/* 0→1 over [a,b], 1 after */
const phase=(t,a,b)=>clamp((t-a)/(b-a));
/* rises over [a,a+r], holds, falls over [b-r,b] */
const window_=(t,a,b,r=.04)=>Math.min(phase(t,a,a+r),1-phase(t,b-r,b));
const rng=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let z=Math.imul(seed^seed>>>15,1|seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

window.CS={NS,el,text,setup,brand,fit,wrap,overlaps,ready,done,run,TAU,clamp,ease,phase,win:window_,rng};
})();
