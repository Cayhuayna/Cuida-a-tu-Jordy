(() => {
  const arena=document.querySelector("#catch-arena");
  if(!arena)return;
  const basket=document.querySelector("#catch-basket"), itemsRoot=document.querySelector("#catch-items");
  const scoreLabel=document.querySelector("#catch-score"), livesLabel=document.querySelector("#catch-lives"), message=document.querySelector("#catch-message");
  const food=["🍎","🍐","🍊","🍌","🍇","🥕","🍓","🥑","🍉","🍪"];
  let x=.5, score=0, lives=1, running=false, spawned=0, lastSpawn=0, lastFrame=0, raf=0, gameTimer=0;
  let falling=[];
  function move(delta){x=Math.max(.08,Math.min(.92,x+delta));basket.style.left=(x*100)+"%";}
  function spawn(){
    const bomb=Math.random()<.17;
    const el=document.createElement("span");el.className=bomb?"falling-item falling-bomb":"falling-item";el.textContent=bomb?"💣":food[Math.floor(Math.random()*food.length)];
    const item={el,x:.06+Math.random()*.88,y:-.1,speed:.24+Math.random()*.22,bomb,value:1+Math.floor(Math.random()*5)};
    el.setAttribute("aria-label",bomb?"Bomba peligrosa":`Comida que vale ${item.value} puntos`);el.style.left=(item.x*100)+"%";itemsRoot.append(el);falling.push(item);
  }
  function end(text){
    if(!running)return;running=false;cancelAnimationFrame(raf);clearTimeout(gameTimer);falling.forEach(item=>item.el.remove());falling=[];document.querySelector("#catch-start").disabled=false;
    if(score>0){window.jordyProgress?.addPoints(score);window.jordyProgress?.awardXP(Math.ceil(score/5));}
    window.dispatchEvent(new CustomEvent("jordy-sound",{detail:{type:text.includes("Bomba")?"error":"level"}}));
    message.textContent=`${text} Sumaste ${score} puntos. Canjéalos en «Canjeo».`;
    document.querySelector("#catch-start").textContent="↻ Jugar otra vez";
  }
  function frame(now){
    if(!running)return;
    const dt=Math.min(.05,(now-lastFrame)/1000||0);lastFrame=now;
    if(now-lastSpawn>690){spawn();lastSpawn=now;}
    const targetY=.83;
    falling=falling.filter(item=>{
      item.y+=item.speed*dt;item.el.style.top=(item.y*100)+"%";
      if(item.y>=targetY&&Math.abs(item.x-x)<.105){
        item.el.remove();
        if(item.bomb){lives=0;livesLabel.textContent="0";end("¡Bomba! Jordy quedó eliminado.");return false;}
        score+=item.value;scoreLabel.textContent=score;window.dispatchEvent(new CustomEvent("jordy-sound",{detail:{type:"feed"}}));return false;
      }
      if(item.y>1.08){item.el.remove();return false;}
      return true;
    });
    livesLabel.textContent=lives;
    if(now-spawned>=35000){end("¡Se acabó el tiempo!");return;}
    raf=requestAnimationFrame(frame);
  }
  function start(){
    cancelAnimationFrame(raf);clearTimeout(gameTimer);falling.forEach(item=>item.el.remove());falling=[];x=.5;score=0;lives=1;running=true;spawned=performance.now();lastSpawn=spawned;lastFrame=spawned;
    scoreLabel.textContent="0";livesLabel.textContent="1";basket.style.left="50%";message.textContent="¡Atrapa la comida y esquiva las bombas!";document.querySelector("#catch-start").textContent="Partida en curso…";document.querySelector("#catch-start").disabled=true;
    window.dispatchEvent(new CustomEvent("jordy-sound",{detail:{type:"start"}}));raf=requestAnimationFrame(frame);
    gameTimer=window.setTimeout(()=>{if(running)end("¡Se acabó el tiempo!");},35000);
  }
  document.querySelector("#catch-start").addEventListener("click",start);
  document.querySelectorAll(".catch-move").forEach(button=>button.addEventListener("click",()=>move(Number(button.dataset.move)*.13)));
  arena.addEventListener("pointermove",event=>{const rect=arena.getBoundingClientRect();x=Math.max(.06,Math.min(.94,(event.clientX-rect.left)/rect.width));basket.style.left=(x*100)+"%";});
  document.addEventListener("keydown",event=>{if(!running)return;if(event.key==="ArrowLeft"){event.preventDefault();move(-.07);}if(event.key==="ArrowRight"){event.preventDefault();move(.07);}});
})();
