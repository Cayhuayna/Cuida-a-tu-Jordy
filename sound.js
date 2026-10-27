(() => {
  const key="market-jordy-sound-enabled";
  let enabled=localStorage.getItem(key)!=="false",ctx,lastMotion=0,lastUi=0;
  const melodies={
    click:[[560,0,.055]],start:[[523,0,.08],[659,.09,.08],[784,.18,.16]],
    care:[[440,0,.08],[587,.08,.13]],feed:[[392,0,.08],[494,.08,.08],[659,.16,.16]],
    sleep:[[440,0,.16],[349,.13,.18],[294,.28,.23]],kick:[[220,0,.07],[330,.05,.09]],
    goal:[[523,0,.09],[659,.08,.09],[784,.16,.1],[1047,.25,.24]],
    save:[[440,0,.1],[370,.1,.12],[294,.21,.2]],potion:[[587,0,.08],[784,.075,.08],[988,.15,.2]],
    purchase:[[392,0,.07],[523,.08,.08],[659,.16,.09],[784,.24,.2]],
    level:[[523,0,.08],[659,.08,.08],[784,.16,.08],[1047,.24,.26]],
    error:[[300,0,.12],[220,.12,.22]]
  };
  function play(type="click"){
    if(!enabled)return;
    try{
      const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
      ctx ||= new AC();if(ctx.state==="suspended")ctx.resume();
      const notes=melodies[type]||melodies.click,base=ctx.currentTime;
      notes.forEach(([hz,delay,duration],index)=>{
        const osc=ctx.createOscillator(),gain=ctx.createGain();
        osc.type=type==="sleep"||type==="save"?"sine":index%2?"sine":"triangle";
        osc.frequency.setValueAtTime(hz,base+delay);
        if(type==="potion")osc.frequency.exponentialRampToValueAtTime(hz*1.35,base+delay+duration);
        gain.gain.setValueAtTime(.0001,base+delay);
        gain.gain.exponentialRampToValueAtTime(type==="click"?.035:.06,base+delay+.012);
        gain.gain.exponentialRampToValueAtTime(.0001,base+delay+duration);
        osc.connect(gain);gain.connect(ctx.destination);osc.start(base+delay);osc.stop(base+delay+duration+.02);
      });
    }catch{}
  }
  function setEnabled(value){enabled=Boolean(value);localStorage.setItem(key,String(enabled));if(enabled)play("start");}
  document.addEventListener("click",event=>{
    const target=event.target.closest("button,a");
    if(!target)return;
    if(target.matches("[data-use]"))play(Number(target.dataset.use)>=30?"potion":"feed");
    else if(target.matches("#pet-button,#mini-pet"))play("care");
    else if(target.matches("#mini-feed"))play("feed");
    else if(target.matches("[data-shot]"))play("kick");
    else if(target.matches("#sleep-button"))play("sleep");
    else if(target.matches("#menu-play"))play("start");
    else play("click");
  },true);
  function motion(event){
    if(!/pet-celebrate|happy|dive-|lab-bob|menu-float|menu-orbit|jordy-breathe/.test(event.animationName))return;
    const now=performance.now();if(now-lastMotion<850)return;lastMotion=now;
    play(/dive-/.test(event.animationName)?"kick":event.animationName==="lab-bob"?"potion":"care");
  }
  document.addEventListener("animationstart",motion,true);
  document.addEventListener("animationiteration",motion,true);
  window.addEventListener("jordy-sound",event=>play(event.detail?.type||"click"));
  window.addEventListener("jordy-progress-updated",event=>{if(event.detail.levelsGained>0)play("level");});
  window.jordySound={play,setEnabled,isEnabled:()=>enabled};
})();