const inputNamePlayer = document.querySelector('.text');
const inputPasswordPlayer = document.querySelector('.password');
const btnEnterPlayer = document.querySelector('.form__text_btn');
const section1 = document.querySelector('.name-player');
const btnTaskNote = document.querySelector('.btn-note');
const btnsListenNote = document.querySelectorAll('.btn_ball');
const btnsAnswerRight = document.querySelectorAll('.btn_answer');
const btnReset = document.querySelector('.reset');
const btnCheck = document.querySelector('.check');
const textLeo = document.querySelector('.leo__text');
const notes = document.querySelectorAll('.note');
let letter = [];
document.querySelector(
  '.leo__text'
).textContent = `Сегодня такой замечательный день, чтобы поиграть во что-нибудь веселое. Вперед!`;
setTimeout(function () {
  document.querySelector(
    '.leo__text'
  ).textContent = `Выполни задание. Когда догадаешься, с каким мячиком я играю - жми на кнопку "ПРОВЕРИТЬ" 😉`;
}, 8000);

//массив из нот для выбора ответа
const notesVariantAnswer = Array.from([notes[2], notes[5], notes[4]]); //ноты ре фа ми

//нажимаем на кнопку с заданием
btnTaskNote.addEventListener('click', function (e) {
  notesVariantAnswer[2].currentTime = 0;
  notesVariantAnswer[2].play();
});

const num = [0, 1, 2];

//рандомное положение задания
function renderRandomImage() {
  const randomImage = num
    .map((image) => image)
    .sort(() => Math.random() - 0.5)
    .map(
      (image) =>
        ` <div class="btn_sound">
                        <button type="button" class="btn_ball btn_ball_${image}" data-ball="${image}"></button>
                        <label>
                        ЖМИ
                        <input type="radio" name="answer" value="answer" class="btn_answer btn_answer_${image}" data-answer=${image}>
                      <span class="btn_custom"></span>
                        </label>
                    </div>
      `
    )
    .join('\n');
  document.querySelector('.btns').insertAdjacentHTML('afterbegin', randomImage);

  document.querySelector('.btns').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn_ball')) {
      console.log('e.target', e.target);
      const ball = e.target.getAttribute('data-ball');
      const notesVariantAnswer = [notes[2], notes[5], notes[4]];
      //связываем кнопку с аудио
      Array.from(document.querySelector('.btns').children).forEach(function (
        el,
        i
      ) {
        console.log(el);
        if (ball == i) {
          notesVariantAnswer[i].currentTime = 0;
          notesVariantAnswer[i].play();
        }
      });
    }

    if (e.target.classList.contains('btn_custom')) {
      const btnCheck = document.querySelector('.check');
      btnCheck.classList.remove('disabled');
      btnCheck.disabled = false;
    }

    //верный ответ или нет

    if (e.target.classList.contains('btn_answer')) {
      console.log('e.target', e.target);
      // e.target.classList.toggle('answer');
      letter = [];
      //ответ верный
      if (e.target.getAttribute('data-answer') != 2) {
        console.log(e.target.getAttribute('data-answer'));
        letter.push('б');
        console.log(letter);
        //ответ неверный
      } else {
        letter.push('a');
        console.log(letter);
      }
      console.log('letterrr', letter);
      //Проверка результата по кнопке Проверить
      document.querySelector('.check').addEventListener('click', function () {
        console.log('letter', letter);
        if (!letter) return;
        if (letter.includes('a')) {
          console.log('верно');
          document.querySelector('.main').classList.add('hidden');
          document.querySelector('.answer').classList.remove('hidden');
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
        } else {
          console.log('неверно');

          document.querySelector('.main').classList.add('hidden');
          document.querySelector('.wrong-answer').classList.remove('hidden');
          //переход на главную страницу, если ответ неверный
          document
            .querySelector('.reset')
            .addEventListener('click', function () {
              document.querySelector('.wrong-answer').classList.add('hidden');
              document.querySelector('.main').classList.remove('hidden');
              document.querySelector('.answer').classList.add('hidden');
              document.querySelectorAll('.btn_answer').forEach((el) => {
                console.log(el);
                el.checked = false;
                letter = null;
              });
            });
        }
      });
    }
  });
}

renderRandomImage();
