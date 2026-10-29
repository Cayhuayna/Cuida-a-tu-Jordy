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
    menu.hidden=true;document.body.classList.add("game-started");window.jordyMusic?.startGame();
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
  const musicSetting=document.querySelector("#music-setting");
  const musicVolume=document.querySelector("#music-volume");
  const volumeLabel=document.querySelector("#music-volume-label");
  musicSetting.checked=window.jordyMusic?.isEnabled()??true;
  musicVolume.value=window.jordyMusic?.getVolume()??0.22;
  volumeLabel.textContent=Math.round(Number(musicVolume.value)*100)+"%";
  musicSetting.onchange=e=>window.jordyMusic?.setEnabled(e.target.checked);
  musicVolume.oninput=e=>{window.jordyMusic?.setVolume(Number(e.target.value));volumeLabel.textContent=Math.round(Number(e.target.value)*100)+"%";};
  soundSetting.checked=window.jordySound?.isEnabled()??true;
  soundSetting.onchange=e=>window.jordySound?.setEnabled(e.target.checked);
  const mini=document.querySelector("#mini-jordy"), toggle=document.querySelector("#overlay-toggle");
  const miniFoodIds=[1,2,6,9,10,11,12,17,18,19,22,23,24,25,26,27,28];
  let selectedFoodId=miniFoodIds[0];
  function syncFoodPicker(){
    let stock={};try{stock=JSON.parse(localStorage.getItem("market-jordy-inventory")||"{}");}catch{}
    const available=miniFoodIds.filter(id=>Number(stock[id])>0);
    if(!available.includes(selectedFoodId))selectedFoodId=available[0]||miniFoodIds[0];
    const card=[...document.querySelectorAll("#inventory-grid [data-use]")].find(button=>Number(button.dataset.use)===selectedFoodId)?.closest(".inventory-item");
    const productName=card?.querySelector("h3")?.textContent||"Sin comida";
    const emoji=card?.querySelector(".inventory-emoji")?.textContent||"🍽️";
    const count=Number(stock[selectedFoodId])||0;
    document.querySelector("#mini-food-name").textContent=`${emoji} ${productName} ×${count}`;
    const feed=document.querySelector("#mini-feed");feed.disabled=!count;feed.title=count?`Dar ${productName}`:"No tienes comida en el inventario";
  }
  function moveFoodPicker(direction){
    let stock={};try{stock=JSON.parse(localStorage.getItem("market-jordy-inventory")||"{}");}catch{}
    const available=miniFoodIds.filter(id=>Number(stock[id])>0);if(!available.length)return syncFoodPicker();
    const index=available.indexOf(selectedFoodId);selectedFoodId=available[(index+direction+available.length)%available.length];syncFoodPicker();
  }
  let pipWindow=null;
  let popupWindow=null;
  let pipApiFailed=false;
  const pipSupported=Boolean(window.documentPictureInPicture?.requestWindow);
  toggle.textContent="▣ Jordy flotante";toggle.setAttribute("aria-label","Abrir a Jordy en una ventana flotante fuera de la página");
  function miniPet(){document.querySelector("#pet-button").click();}
  function openPictureInPicture(){
    if(!pipSupported)return false;
    window.documentPictureInPicture.requestWindow({width:320,height:370}).then(pip=>{
      pipWindow=pip;
      const image=new URL("assets/jordy.png",document.baseURI).href;
      pip.document.head.innerHTML=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Jordy contigo</title><style>
        *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(ellipse at 50% 30%,#477557,#143c29);font:13px system-ui,sans-serif;color:#fff;padding:10px}.card{width:100%;height:100%;min-height:300px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid #c7e2b366;border-radius:20px;background:linear-gradient(160deg,#1b583b,#113a29);box-shadow:0 12px 34px #081d1570;overflow:hidden;animation:appear .4s ease-out}.pet{height:145px;max-width:68%;object-fit:contain;filter:drop-shadow(0 8px 12px #071a1780);animation:bob 2.7s ease-in-out infinite,glow 3s ease-in-out infinite alternate}.name{font-weight:800;font-size:16px;margin-top:2px}.status{font-size:10px;color:#dcebcf;margin:2px 0 7px}.bars{display:flex;justify-content:space-between;gap:13px;width:90%;margin:3px auto 8px}.bars label{width:48%;font-size:9px;color:#e5eedc}.bars small{float:right;color:#eaf1de;font-size:9px}.bars i{display:block;height:6px;margin-top:4px;overflow:hidden;border-radius:8px;background:#ffffff35}.bars b{display:block;width:50%;height:100%;border-radius:8px;background:#7ac17e;transition:width .35s}.bars label:first-child b{background:#eb8e80}.foodrow{display:flex;align-items:center;gap:6px;max-width:94%;font-size:10px;color:#edf5df}.foodrow button,.actions button{border:0;border-radius:10px;padding:7px 11px;background:#d9edb8;color:#173c29;font-weight:800;cursor:pointer;transition:transform .18s,background .18s}.foodrow button{padding:1px 9px;font-size:18px}.foodrow button:hover,.actions button:hover{background:#eff9dc;transform:scale(1.08)}#foodname{max-width:155px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.actions{display:flex;gap:8px;margin-top:8px}.actions button{font-size:13px}.hint{position:absolute;top:10px;left:13px;font-size:9px;color:#d8ebce;letter-spacing:.1em}.dead .pet{filter:grayscale(1)}button:disabled{opacity:.4;cursor:not-allowed}@keyframes bob{50%{transform:translateY(-8px) rotate(1deg)}}@keyframes glow{to{filter:drop-shadow(0 10px 16px #b1e67b77)}}@keyframes appear{from{opacity:0;transform:scale(.94) translateY(7px)}to{opacity:1;transform:none}}
      </style>`;
      pip.document.body.innerHTML=`<main class="card" id="card"><span class="hint">JORDY CONTIGO</span><img class="pet" src="${image}" alt="Jordy"><strong class="name" id="name"></strong><span class="status" id="status"></span><div class="bars"><label>HP <small id="hpval"></small><i><b id="hpbar"></b></i></label><label>Comida <small id="foodval"></small><i><b id="foodbar"></b></i></label></div><div class="foodrow"><button id="prev">‹</button><span id="foodname"></span><button id="next">›</button></div><div class="actions"><button id="pet" aria-label="Acariciar a Jordy">♡</button><button id="feed" aria-label="Dar el producto seleccionado">Dar</button></div></main>`;
      pip.document.querySelector("#pet").onclick=miniPet;
      pip.document.querySelector("#feed").onclick=()=>miniFeed(selectedFoodId);
      pip.document.querySelector("#prev").onclick=()=>moveFoodPicker(-1);
      pip.document.querySelector("#next").onclick=()=>moveFoodPicker(1);
      const sync=()=>{
        if(!pipWindow||pipWindow.closed)return;
        pip.document.querySelector("#name").textContent=document.querySelector("#mini-player-name").textContent;
        pip.document.querySelector("#status").textContent=document.querySelector("#mini-day").textContent;
        pip.document.querySelector("#card").classList.toggle("dead",document.body.classList.contains("game-over"));
        pip.document.querySelector("#hpbar").style.width=(Number.parseFloat(document.querySelector("#health-value").textContent)||0)/2+"%";
        pip.document.querySelector("#foodbar").style.width=(Number.parseFloat(document.querySelector("#food-value").textContent)||0)+"%";
        pip.document.querySelector("#hpval").textContent=document.querySelector("#mini-health-value").textContent;
        pip.document.querySelector("#foodval").textContent=document.querySelector("#mini-food-value").textContent;
        pip.document.querySelector("#foodname").textContent=document.querySelector("#mini-food-name").textContent;
        pip.document.querySelector("#feed").disabled=document.querySelector("#mini-feed").disabled;
      };
      sync();pipWindow.setInterval(sync,1000);
      pip.addEventListener("pagehide",()=>{pipWindow=null;toggle.setAttribute("aria-pressed","false");});
      toggle.setAttribute("aria-pressed","true");window.jordySound?.play("click");
    }).catch(()=>{pipApiFailed=true;openPopupFallback();});
    return true;
  }
  function openPopupFallback(){
    try{
      const popup=window.open("","jordy-companion","popup=yes,width=330,height=410,resizable=yes,scrollbars=no");
      if(!popup){mini.hidden=false;toggle.setAttribute("aria-pressed","true");return;}
      popupWindow=popup;
      const image=new URL("assets/jordy.png",document.baseURI).href;
      popup.document.head.innerHTML=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Jordy contigo</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:10px;background:radial-gradient(ellipse at 50% 25%,#477557,#143c29);font:13px system-ui,sans-serif;color:#fff}.card{width:100%;min-height:360px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid #c7e2b366;border-radius:20px;background:linear-gradient(160deg,#1b583b,#113a29);box-shadow:0 12px 34px #081d1570;overflow:hidden;animation:appear .4s ease-out}.pet{height:145px;max-width:68%;object-fit:contain;filter:drop-shadow(0 8px 12px #071a1780);animation:bob 2.7s ease-in-out infinite,glow 3s ease-in-out infinite alternate}.name{font-weight:800;font-size:16px;margin-top:2px}.status{font-size:10px;color:#dcebcf;margin:2px 0 7px}.bars{display:flex;justify-content:space-between;gap:13px;width:90%;margin:3px auto 8px}.bars label{width:48%;font-size:9px;color:#e5eedc}.bars small{float:right;color:#eaf1de;font-size:9px}.bars i{display:block;height:6px;margin-top:4px;overflow:hidden;border-radius:8px;background:#ffffff35}.bars b{display:block;width:50%;height:100%;border-radius:8px;background:#7ac17e;transition:width .35s}.bars label:first-child b{background:#eb8e80}.foodrow{display:flex;align-items:center;gap:6px;max-width:94%;font-size:10px;color:#edf5df}.foodrow button,.actions button{border:0;border-radius:10px;padding:7px 11px;background:#d9edb8;color:#173c29;font-weight:800;cursor:pointer;transition:transform .18s,background .18s}.foodrow button{padding:1px 9px;font-size:18px}.foodrow button:hover,.actions button:hover{background:#eff9dc;transform:scale(1.08)}#foodname{max-width:155px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.actions{display:flex;gap:8px;margin-top:8px}.actions button{font-size:13px}.hint{position:absolute;top:10px;left:13px;font-size:9px;color:#d8ebce;letter-spacing:.1em}.dead .pet{filter:grayscale(1)}button:disabled{opacity:.4;cursor:not-allowed}@keyframes bob{50%{transform:translateY(-8px) rotate(1deg)}}@keyframes glow{to{filter:drop-shadow(0 10px 16px #b1e67b77)}}@keyframes appear{from{opacity:0;transform:scale(.94) translateY(7px)}to{opacity:1;transform:none}}</style>`;
      popup.document.body.innerHTML=`<main class="card" id="card"><span class="hint">JORDY CONTIGO</span><img class="pet" src="${image}" alt="Jordy"><strong class="name" id="name"></strong><span class="status" id="status"></span><div class="bars"><label>HP <small id="hpval"></small><i><b id="hpbar"></b></i></label><label>Comida <small id="foodval"></small><i><b id="foodbar"></b></i></label></div><div class="foodrow"><button id="prev">‹</button><span id="foodname"></span><button id="next">›</button></div><div class="actions"><button id="pet">♡ Acariciar</button><button id="feed">Dar</button></div></main>`;
      popup.document.querySelector("#pet").onclick=miniPet;
      popup.document.querySelector("#feed").onclick=()=>miniFeed(selectedFoodId);
      popup.document.querySelector("#prev").onclick=()=>moveFoodPicker(-1);
      popup.document.querySelector("#next").onclick=()=>moveFoodPicker(1);
      const sync=()=>{
        if(!popupWindow||popupWindow.closed)return;
        popup.document.querySelector("#name").textContent=document.querySelector("#mini-player-name").textContent;
        popup.document.querySelector("#status").textContent=document.querySelector("#mini-day").textContent;
        popup.document.querySelector("#card").classList.toggle("dead",document.body.classList.contains("game-over"));
        popup.document.querySelector("#hpbar").style.width=(Number.parseFloat(document.querySelector("#health-value").textContent)||0)/2+"%";
        popup.document.querySelector("#foodbar").style.width=(Number.parseFloat(document.querySelector("#food-value").textContent)||0)+"%";
        popup.document.querySelector("#hpval").textContent=document.querySelector("#mini-health-value").textContent;
        popup.document.querySelector("#foodval").textContent=document.querySelector("#mini-food-value").textContent;
        popup.document.querySelector("#foodname").textContent=document.querySelector("#mini-food-name").textContent;
        popup.document.querySelector("#feed").disabled=document.querySelector("#mini-feed").disabled;
      };
      sync();popup.setInterval(sync,700);popup.addEventListener("pagehide",()=>{popupWindow=null;toggle.setAttribute("aria-pressed","false");});
      toggle.setAttribute("aria-pressed","true");window.jordySound?.play("click");
    }catch{popupWindow=null;mini.hidden=false;toggle.setAttribute("aria-pressed","true");}
  }
  toggle.onclick=()=>{
    if(pipSupported&&!pipApiFailed){if(pipWindow&&!pipWindow.closed){pipWindow.focus();return;}openPictureInPicture();return;}
    if(popupWindow&&!popupWindow.closed){popupWindow.focus();return;}openPopupFallback();
  };
  document.querySelector("#mini-close").onclick=()=>{mini.hidden=true;toggle.setAttribute("aria-pressed","false");};
  document.querySelector("#mini-pet").onclick=miniPet;
  document.querySelector("#mini-feed").onclick=()=>miniFeed(selectedFoodId);
  document.querySelector("#mini-food-prev").onclick=()=>moveFoodPicker(-1);
  document.querySelector("#mini-food-next").onclick=()=>moveFoodPicker(1);
  window.addEventListener("jordy-inventory-updated",syncFoodPicker);syncFoodPicker();
  window.addEventListener("jordy-progress-updated",renderRanking);window.setInterval(renderRanking,30000);renderRanking();
  function renderRedemption(){const p=progress.getSnapshot();document.querySelector("#catch-total").textContent=p.points;document.querySelector("#redeem-points").textContent=p.points;document.querySelector("#redeem-coins").textContent=p.coins;}
  function miniFeed(foodId=selectedFoodId){
    const button=document.querySelector(`#inventory-grid [data-use='${foodId}']`);
    if(button)button.click();else{document.querySelector("#pet-thought").textContent="No te queda ese producto. Compra más comida en el mercado 🍽️";window.jordySound?.play("error");}
  }
  document.querySelectorAll("[data-redeem]").forEach(button=>button.onclick=()=>{const coins=progress.redeemPoints(Number(button.dataset.redeem));document.querySelector("#redemption-message").textContent=coins?`¡Canje realizado! Recibiste ${coins} monedas.`:"No tienes suficientes puntos para ese canje.";renderRedemption();});
  window.addEventListener("jordy-progress-updated",renderRedemption);renderRedemption();
})();
