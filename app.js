class DrumKit {
  constructor(){
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');

    this.playBtn = document.querySelector('.play-btn');

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
        // check each sound
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
    setInterval( () => {
      this.repeat();
    }, interval);
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