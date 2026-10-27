(() => {
  const key="market-jordy-sound-enabled";let enabled=localStorage.getItem(key)!=="false",ctx;
  let lastMotionSound=0;
  function play(type="click"){
    if(!enabled)return;
    try{
      const C=window.AudioContext||window.webkitAudioContext;if(!C)return;ctx ||= new C();if(ctx.state==="suspended")ctx.resume();
      const notes={click:520,start:740,care:640,feed:590,sleep:330,goal:880,potion:790};
      const o=ctx.createOscillator(),g=ctx.createGain(),f=notes[type]||560;o.type=type==="sleep"?"sine":"triangle";
      o.frequency.setValueAtTime(f,ctx.currentTime);o.frequency.exponentialRampToValueAtTime(f*.72,ctx.currentTime+.12);
      g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.05,ctx.currentTime+.015);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.16);
      o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.17);
    }catch{}
  }
  function setEnabled(v){enabled=Boolean(v);localStorage.setItem(key,String(enabled));if(enabled)play("start");}
  document.addEventListener("click",e=>{
    if(e.target.closest("#pet-button,#mini-pet"))play("care");
    else if(e.target.closest("[data-use],#mini-feed"))play("feed");
    else if(e.target.closest("[data-shot]"))play("goal");
    else if(e.target.closest("#sleep-button"))play("sleep");
    else if(e.target.closest("button,a"))play("click");
  },true);
  document.addEventListener("animationstart",e=>{
    if(/pet-celebrate|happy|dive-|lab-bob|menu-float|menu-orbit|jordy-breathe/.test(e.animationName))
      play(/dive-/.test(e.animationName)?"goal":e.animationName==="lab-bob"?"potion":"care");
  },true);
  let lastLoopSound = 0;
  document.addEventListener("animationiteration", e => {
    if (!/menu-float|jordy-breathe|lab-bob/.test(e.animationName)) return;
    const now = performance.now();
    if (now - lastLoopSound < 700) return;
    lastLoopSound = now;
    play(e.animationName === "lab-bob" ? "potion" : "care");
  }, true);  window.addEventListener("jordy-sound",e=>play(e.detail?.type||"click"));
  window.jordySound={play,setEnabled,isEnabled:()=>enabled};
})();