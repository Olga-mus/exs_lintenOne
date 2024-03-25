//End
const figInstTitle = document.querySelector('.instr-title');
setTimeout(function () {
  document.querySelector('.answer__text').textContent =
    'А теперь попробуй поиграть😃. Нажимая кнопки внизу, ты можешь изменить звук. Уверен, у тебя получится сочинить мелодию🎹';
}, 9000);

//смена инструмента по клику на кнопку
let instrum = [0];
document.querySelector('.instr').addEventListener('click', function (e) {
  instrum++;
  console.log(instrum);
  if (instrum === 1) {
    document.querySelectorAll('.note').forEach(function (note, i) {
      note.src = `../audio/bagpipe/bagpipe-${i + 1}.mp3`;
    });

    document.querySelector('.instr-img').src = '../image/bagpipe.jpg';
    figInstTitle.textContent = 'Волынка';
  }

  if (instrum === 2) {
    document.querySelectorAll('.note').forEach(function (note, i) {
      note.src = `../audio/bells/bell-${i + 1}.mp3`;
    });

    document.querySelector('.instr-img').src = '../image/bells.jpg';
    figInstTitle.textContent = 'Колокольчики';
  }

  if (instrum === 3) {
    document.querySelectorAll('.note').forEach(function (note, i) {
      note.src = `../audio/clarinet/clarinet-${i + 1}.mp3`;
    });
    document.querySelector('.instr-img').src = '../image/clarinet.jpg';
    figInstTitle.textContent = 'Кларнет';
  }

  if (instrum === 4) {
    document.querySelectorAll('.note').forEach(function (note, i) {
      note.src = `../audio/flute/flute-${i + 1}.mp3`;
    });

    document.querySelector('.instr-img').src = '../image/flute.jpg';
    figInstTitle.textContent = 'Флейта';
  }

  if (instrum === 5) {
    document.querySelectorAll('.note').forEach(function (note, i) {
      note.src = `../audio/harp/harp-${i + 1}.mp3`;
    });

    document.querySelector('.instr-img').src = '../image/harp.jpg';
    figInstTitle.textContent = 'Арфа';
  }
  if (instrum === 6) {
    document.querySelectorAll('.note').forEach(function (note, i) {
      note.src = `../audio/strings/string-${i + 1}.mp3`;
    });

    document.querySelector('.instr-img').src = '../image/strings.jpg';
    figInstTitle.textContent = 'Скрипка';
  }

  if (instrum >= 6) {
    instrum = 0;
  }
});

document.querySelector('.fp').addEventListener('click', function (e) {
  document.querySelectorAll('.note').forEach(function (note, i) {
    console.log(note);
    note.src = `../audio/piano/piano-${i + 1}.mp3`;
  });
  document.querySelector('.instr-img').src = '../image/piano.jpg';
  figInstTitle.textContent = 'Фортепиано';
});

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
  // когда закончилось время звучания ноты
  // note.addEventListener('ended', () => {
  //   key.classList.remove('active');
}

// const btnsInstr = document.querySelectorAll('.instrument');
// btnsInstr.forEach(function (btn) {
//   btn.addEventListener('click', function (e) {
//     const target = e.target;
//     console.log('target', target);
//   });
// });

// document.querySelector('.bagpipe').addEventListener('click', function (e) {});
