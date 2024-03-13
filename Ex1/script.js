const inputNamePlayer = document.querySelector('.text');
const inputPasswordPlayer = document.querySelector('.password');
const btnEnterPlayer = document.querySelector('.form__text_btn');
const section1 = document.querySelector('.name-player');
const btnTaskNote = document.querySelector('.btn-note');
const btnsListenNote = document.querySelectorAll('.btn_chamomile');
const btnsAnswerRight = document.querySelectorAll('.btn_answer');
const btnReset = document.querySelector('.reset');
const btnCheck = document.querySelector('.check');
const textLeo = document.querySelector('.leo__text');
const notes = document.querySelectorAll('.note');

//звуки пианино
let keys = document.querySelectorAll('.key');
console.log(keys);
keys.forEach((key) => {
  key.addEventListener('click', playNote);
});

function playNote(e) {
  let key = e.target;
  let note = document.getElementById(key.dataset.note);
  console.log(note);
  key.classList.add('active');
  //время текущей ноты если нота окажется длинной
  note.currentTime = 0;
  note.play();
  setTimeout(function () {
    key.classList.remove('active');
  }, 300);
  //когда закончилось время звучания ноты
  // note.addEventListener('ended', () => {
  //   key.classList.remove('active');
  // });
}
