class DrumKit {
  constructor(){
    this.pads = document.querySelectorAll('.pad');

    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');

    this.currentKick = document.querySelector('.kick-classic.wav');
    this.currentSnare = document.querySelector('.snare-acoustic01.wav');
    this.currentHihat = document.querySelector('.hihat-acoustic01.wav');

    this.selects = document.querySelectorAll('select');

    this.playBtn = document.querySelector('.play-btn');

    this.muteBtns = document.querySelectorAll('.mute');

    this.isPlaying = null;

    this.index = 0;
    this.bpm = 150;
  }

  // toggle 'active' class method
  activePad(){
    this.classList.toggle('active');
  }

  repeat(){
    // create a step that will go from 0 to 7
    let step = this.index % 8;

    // select each pad from the 3 trakcs:
    // [div.pad.kick-pad.b0, div.pad.snare-pad.b0, div.pad.hihat-pad.b0]
    // [div.pad.kick-pad.b1, div.pad.snare-pad.b1, div.pad.hihat-pad.b1]
    // [div.pad.kick-pad.b2, div.pad.snare-pad.b2, div.pad.hihat-pad.b2]
    // etc..
    const activePads = document.querySelectorAll(`.b${step}`);
    console.log(activePads);
    
    
    activePads.forEach( (pad) => {
      // animate each pad while looping through them
      pad.style.animation = `playTrack .3s alternate ease-in-out 2`;
      
      // check if pads have class of active
      if(pad.classList.contains('active')){
        // play each sound
        if(pad.classList.contains('kick-pad')){
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        } else if(pad.classList.contains('snare-pad')){
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        } else if(pad.classList.contains('hihat-pad')){
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      } 
    });

    // increment the index by 1
    this.index++;
  }

  start(){
    const interval = (60 / this.bpm) * 1000;

    // NULL - falsy
    // Check if this.isPlaying is not false (which is true because NULL is falsy)
    if(!this.isPlaying){
      // asign the returned ID from setInterval
      this.isPlaying = setInterval( () => {
        this.repeat();
      }, interval);

      // change the innerText of tht playBtn
      this.playBtn.innerText = 'Stop';
    } else {
      // stop the setInterval timer
      clearInterval(this.isPlaying);
      // set this.isPlaying back to null;
      this.isPlaying = null;
      
      // change the innerText of the playBtn
      this.playBtn.innerText = 'Start';
    }
  }

  changeSound(e){
    // get the name of each select option for all 3 sounds
    const selectionName = e.target.name;
    // get the value of each select option for all 3 sounds
    const selectionValue = e.target.value;

    // for kick select option
    if(selectionName === 'kick-select'){
      // change the audio with the selected option value
      this.kickAudio.src = selectionValue;
      
      // for snare select select option
    } else if(selectionName === 'snare-select'){
      // change the audio with the selected option value
      this.snareAudio.src = selectionValue;

      // for hihat select option
    } else if(selectionName === 'hihat-select'){
      // change the audio with the selected option value
      this.hihatAudio.src = selectionValue;
    }
  }

  mute(e) {
    // toggle active class on each mute button
    e.target.classList.toggle('active');

    // get the data-track attrbute value of each clicked mute button
    const index = e.target.getAttribute('data-track');
    
    // mute the sound of each sound if the mute button is clicked
    if(e.target.classList.contains('active')){
      if(index === '0'){
        this.kickAudio.volume = 0;
      } else if(index === '1'){
        this.snareAudio.volume = 0;
      } else if(index === '2'){
        this.hihatAudio.volume = 0;
      }
      // unmute the sound of each sound if the mute button isn't clicked
    } else {
      if(index === '0'){
        this.kickAudio.volume = 1;
      } else if(index === '1'){
        this.snareAudio.volume = 1;
      } else if(index === '2'){
        this.hihatAudio.volume = 1;
      }
    }
  }

}


// create a drumkit
const drumKit = new DrumKit();


drumKit.pads.forEach( (pad) => {
  // add 'active' class to each clicked pad or removes it if it has it.
  // in this case we don't need to call the activePad() method in a callback fn or arrow function becase the "this" keyword is pointing to each clicked pad
  pad.addEventListener('click', drumKit.activePad);
  // remove the animation property after the animation ends.
  pad.addEventListener('animationend', () => pad.style.animation = '');
});


// we need to call drumKit.start() inside a callback function / arrow function, so the "this" keyword points to the DrumKit class. If not, the "this" keyword will point to the "<button class="play-btn">Play</button>" that we add the event listener on.
drumKit.playBtn.addEventListener('click', () => {
  drumKit.start();
});

// 'change' event listener for each select option
drumKit.selects.forEach( (select) => {
  select.addEventListener('change', (e) => {
    drumKit.changeSound(e);
  });
});

// mute button event listener
drumKit.muteBtns.forEach ( (btn) => {
  btn.addEventListener('click', (e) => {
    drumKit.mute(e);
  });
});