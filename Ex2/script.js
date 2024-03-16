// Ex2

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
