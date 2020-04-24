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

  activePad(){
    this.classList.toggle('active');
  }

  repeat(){
    let step = this.index % 8;
    const activePads = document.querySelectorAll(`.b${step}`);
    console.log(activePads);
    this.index++;
  }

  start(){
    const interval = (60 / this.bpm) * 1000;
    setInterval( () => {
      this.repeat();
    }, interval);
  }
}

const drumKit = new DrumKit();


drumKit.pads.forEach( (pad) => {
  pad.addEventListener('click', drumKit.activePad);
});


// we need to call drumKit.start() inside a callback function / arrow function, so the "this" keyword points to the DrumKit class. If not, the "this" keyword will point to the "<button class="play-btn">Play</button>" that we add the event listener on.
drumKit.playBtn.addEventListener('click', () => {
  drumKit.start();
});