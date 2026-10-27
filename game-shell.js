(() => {
  const menu=document.querySelector("#game-menu"), input=document.querySelector("#player-name-input"), progress=window.jordyProgress;
  const panels=["menu-how-panel","menu-settings-panel","menu-ranking-panel"].map(id=>document.getElementById(id));
  input.value=progress.getSnapshot().playerName||"";
  const showPanel=p=>panels.forEach(x=>x.hidden=x!==p||!x.hidden);
  document.querySelector("#menu-how").onclick=()=>showPanel(panels[0]);
  document.querySelector("#menu-settings").onclick=()=>showPanel(panels[1]);
  document.querySelector("#menu-ranking").onclick=()=>{showPanel(panels[2]);renderRanking();};
  document.querySelector("#menu-play").onclick=()=>{
    const name=input.value.trim(); if(!name){input.focus();input.setCustomValidity("Escribe tu nombre para guardar tu tiempo.");input.reportValidity();return;}
    input.setCustomValidity("");progress.setPlayerName(name);document.querySelector("#mini-player-name").textContent=name;
    menu.hidden=true;document.body.classList.add("game-started");window.jordySound?.play("start");
  };
  input.oninput=()=>input.setCustomValidity("");
  function formatTime(s){const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h?h+" h "+m+" min":m?m+" min":s+" s";}
  function renderRanking(){
    const list=progress.updateRanking();const safe=t=>t.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
    const html=list.length?list.map((e,i)=>"<li><b class='rank-number'>"+(i+1)+"</b><strong>"+safe(e.name)+"</strong><span>"+formatTime(e.seconds)+"</span></li>").join(""):"<li class='rank-empty'>Aún no hay records. ¡Empieza a cuidar a Jordy!</li>";
    document.querySelector("#ranking-list").innerHTML="<ol>"+html+"</ol>";
    document.querySelector("#menu-ranking-list").innerHTML="<ol>"+html+"</ol>";
  }
  const soundSetting=document.querySelector("#sound-setting");
  soundSetting.checked=window.jordySound?.isEnabled()??true;
  soundSetting.onchange=e=>window.jordySound?.setEnabled(e.target.checked);
  const mini=document.querySelector("#mini-jordy"), toggle=document.querySelector("#overlay-toggle");
  toggle.onclick=()=>{mini.hidden=!mini.hidden;toggle.setAttribute("aria-pressed",String(!mini.hidden));window.jordySound?.play("click");};
  document.querySelector("#mini-close").onclick=()=>{mini.hidden=true;toggle.setAttribute("aria-pressed","false");};
  document.querySelector("#mini-pet").onclick=()=>document.querySelector("#pet-button").click();
  document.querySelector("#mini-feed").onclick=()=>{
    const b=document.querySelector("#inventory-grid [data-use='9'],#inventory-grid [data-use='11'],#inventory-grid [data-use='12'],#inventory-grid [data-use='17'],#inventory-grid [data-use='18'],#inventory-grid [data-use='19']");
    if(b)b.click();else document.querySelector("#pet-thought").textContent="¡Compra algo rico en el mercado para darme! 🍎";
  };
  window.addEventListener("jordy-progress-updated",renderRanking);window.setInterval(renderRanking,30000);renderRanking();
})();