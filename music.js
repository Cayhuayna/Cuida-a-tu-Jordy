(() => {
  const enabledKey="market-jordy-music-enabled";
  const volumeKey="market-jordy-music-volume";
  let enabled=localStorage.getItem(enabledKey)!=="false";
  let volume=Number(localStorage.getItem(volumeKey));
  if(!Number.isFinite(volume)||volume<0||volume>1)volume=.22;
  let stage="menu",current=null,menuStarted=false;
  const tracks={
    menu:new Audio("assets/menu-rebellion.mp3"),
    start:new Audio("assets/game-start.mp3"),
    game:new Audio("assets/gameplay-theme.mp3")
  };
  tracks.menu.loop=true;tracks.menu.preload="auto";
  tracks.start.loop=false;tracks.start.preload="auto";
  tracks.game.loop=true;tracks.game.preload="auto";
  function stopAll(){Object.values(tracks).forEach(track=>{track.pause();track.currentTime=0;});current=null;}
  function playTrack(name){
    if(!enabled)return;
    const track=tracks[name];if(!track)return;
    stopAll();current=name;track.volume=volume;
    const attempt=track.play();
    if(attempt?.catch)attempt.catch(()=>{current=null;});
  }
  function playMenu(){if(stage!=="menu"||menuStarted||!enabled)return;menuStarted=true;playTrack("menu");}
  function startGame(){
    stage="game";menuStarted=false;
    if(!enabled){stopAll();return;}
    tracks.start.onended=()=>{if(stage==="game"&&enabled)playTrack("game");};
    playTrack("start");
  }
  function setEnabled(value){
    enabled=Boolean(value);localStorage.setItem(enabledKey,String(enabled));
    if(!enabled)stopAll();
    else if(stage==="menu"){menuStarted=false;playMenu();}
    else playTrack("game");
  }
  function setVolume(value){
    volume=Math.max(0,Math.min(1,Number(value)||0));
    localStorage.setItem(volumeKey,String(volume));
    if(current)tracks[current].volume=volume;
  }
  document.addEventListener("pointerdown",playMenu,true);
  document.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" ")playMenu();},true);
  window.jordyMusic={playMenu,startGame,setEnabled,setVolume,isEnabled:()=>enabled,getVolume:()=>volume};
})();