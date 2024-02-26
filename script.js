const inputNamePlayer = document.querySelector('.form__text_input');
const inputPasswordPlayer = document.querySelector('.form__text_input');
const btnEnterPlayer = document.querySelector('.form__text_btn');
const section1 = document.querySelector('.name-player');

const btnTaskNote = document.querySelector('.btn-note');
const btnsListenNote = document.querySelectorAll('.btn_butterfly');

const btnsAnswerRight = document.querySelectorAll('.btn_answer');
const btnReset = document.querySelector('.reset');
const btnCheck = document.querySelector('.check');
const textLeo = document.querySelector('.leo__text');
const notes = document.querySelectorAll('.note');
console.log(notes[0]);

const notesVariantAnswer = Array.from([notes[0], notes[2], notes[4]]);
console.log(notesVariantAnswer[0]);
console.log('asdasd');

//нажимаем на кнопку с заданием
btnTaskNote.addEventListener('click', function (e) {
  notesVariantAnswer[0].play();
});

const num = [0, 1, 2];

// document.querySelector('.btns').addEventListener('click', function (e) {
//   if (e.target.classList.contains('btn_butterfly')) {
//     console.log('e.target', e.target);
//     const butterfly = e.target.getAttribute('data-butterfly');
//     const notesVariantAnswer = [notes[0], notes[2], notes[4]];
//     console.log(notesVariantAnswer);

//     num.forEach(function (el, i) {
//       if (butterfly == i) {
//         notesVariantAnswer[i].play();
//       }
//     });
//     // if (butterfly == 0) {
//     //   notesVariantAnswer[0].play();
//     // }
//     // if (butterfly == 1) {
//     //   notesVariantAnswer[1].play();
//     // }
//     // if (butterfly == 2) {
//     //   notesVariantAnswer[2].play();
//     // }
//   }
// });

function renderRandomImage() {
  const randomImage = num
    .map((image) => image)
    .sort(() => Math.random() - 0.5)
    .map(
      (image) =>
        ` <div class="btn_sound">
                        <button type="button" class="btn_butterfly btn_butterfly_${image}" data-butterfly="${image}"></button>
                        <label>
                        <input type="radio" name="answer" value="answer" class="btn_answer btn_answer_${image}" data-answer=${image}>  
                    </label>
                    </div>
      `
    )
    .join('\n');
  document.querySelector('.btns').insertAdjacentHTML('afterbegin', randomImage);

  document.querySelector('.btns').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn_butterfly')) {
      console.log('e.target', e.target);
      const butterfly = e.target.getAttribute('data-butterfly');
      const notesVariantAnswer = [notes[0], notes[2], notes[4]];
      //связываем кнопку с аудио
      Array.from(document.querySelector('.btns').children).forEach(function (
        el,
        i
      ) {
        console.log(el);
        if (butterfly == i) {
          notesVariantAnswer[i].play();
        }
      });
    }

    //верный ответ
    if (e.target.classList.contains('btn_answer')) {
      console.log('HHH');
      console.log('e.target', e.target);
      e.target.classList.toggle('changeAnswer');
      if (e.target.getAttribute('data-answer') != 0) {
        console.log('неверно');
      } else {
        console.log('верно');
      }
    }
  });
}

renderRandomImage();
// получаем все объекты на странице с классом .key — это наши клавиши
const keys = document.querySelectorAll('.key');
// получаем область на странице, куда будем выводить названия нот
const note = document.querySelector('.nowplaying');
// тут хранятся все наши подсказки
const hints = document.querySelectorAll('.hints');

//Получаем код нажатой клавиши
//По этому коду находим клавишу пианино и добавляем ей анимацию нажатия
//берём из описания клавиши текст ноты и показываем его на экране
//По этому же коду нажатой клавиши находим нужный аудиофайл и проигрываем его.

// проигрываем звук при нажатии на клавишу
function playNote(e) {
  // получаем аудиообъект по коду нажатой клавиши
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
    // получаем нажатую клавишу на пианино по коду нажатой клавиши на клавиатуре
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  // если мы нажали клавишу, которой не было в списке, то выходим из функции и никакой звук не играем
  if (!key) return;

  // получаем название ноты
  const keyNote = key.getAttribute('data-note');

  // добавляем класс, который отвечает за анимацию нажатия
  key.classList.add('playing');
  // выводим на экран название ноты
  note.innerHTML = keyNote;
  // будем проигрывать каждое аудио с самого начала
  audio.currentTime = 0;
  // включаем звук нажатой клавиши
  audio.play();
}

// отслеживаем нажатие каждой клавиши и сразу включаем звук
document.addEventListener('keydown', playNote);

// функция, которая убирает анимацию нажатия на клавишу
function removeTransition(e) {
  // если у клавиши уже нет свойства transform
  if (e.propertyName !== 'transform') return;
  // убираем класс playing из описания клавиши
  this.classList.remove('playing');
}

// функция отображения подсказок
function hintsOn(e, index) {
  // показываем на экране все подсказки с плавной задержкой слева направо
  // время задержки зависит от позиции клавиши
  e.setAttribute('style', 'transition-delay:' + index * 50 + 'ms');
}

// включаем отображение подсказок
hints.forEach(hintsOn);

// перебираем все клавиши, где запустилась анимация, и убираем обводку с тех клавиш, где она уже закончила отрисовываться
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

// запускаем аудио по клику на клавиши
//перебираем все клавиши и на каждую назначаем функцию
for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener('click', function () {
    const keyClick = document.querySelector(`.key-${i}`); //получаем каждую клавишу по циклу
    // добавляем класс, который отвечает за анимацию нажатия
    keyClick.classList.add('playing');
    const audioClick = document.querySelector(`.play-${i}`); // получаем каждое аудио по циклу
    audioClick.currentTime = 0; // будем проигрывать каждое аудио с самого начала
    audioClick.play(); // включаем звук нажатой клавиши.
  });
}
