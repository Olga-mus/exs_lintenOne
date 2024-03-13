const inputNamePlayer = document.querySelector('.text');
const inputPasswordPlayer = document.querySelector('.password');
const btnEnterPlayer = document.querySelector('.form__text_btn');
const section1 = document.querySelector('.name-player');
const btnTaskNote = document.querySelector('.btn-note');
const btnsListenNote = document.querySelectorAll('.btn_butterfly');
const btnsAnswerRight = document.querySelectorAll('.btn_answer');
const btnReset = document.querySelector('.reset');
const btnCheck = document.querySelector('.check');
const textLeo = document.querySelector('.leo__text');
const notes = document.querySelectorAll('.note');

//открытие пароля (по глазику)
document
  .querySelector('.form__btn-password')
  .addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target);
    const input = document.querySelector('.password');
    if (input.type === 'password') {
      input.type = 'text';
      e.target.style.backgroundImage = "url('./image/show.png')";
    } else {
      input.type = 'password';
      e.target.style.backgroundImage = "url('./image/close.png')";
    }
  });

//вводим данные и пароль, переходим на главную страницу
btnEnterPlayer.addEventListener('click', function () {
  inputPasswordPlayer.value.toLowerCase();
  const name = inputNamePlayer.value;
  const firstLetterName = name.slice(0, 1).toUpperCase();
  const lettersName = name.slice(1).toLowerCase();
  let nameLetters = [];
  nameLetters.push(firstLetterName, lettersName);
  const fullName = nameLetters.join('');
  if (inputPasswordPlayer.value === 'скрипка') {
    document.querySelector('.name-player').classList.add('hidden');
    document.querySelector('.main').classList.remove('hidden');
    document.querySelector(
      '.leo__text'
    ).textContent = `Привет, ${fullName}! Рад видеть тебя! Сегодня у нас удивительное приключение в
    мире
    звуков! Начнем?`;
    setTimeout(function () {
      document.querySelector(
        '.leo__text'
      ).textContent = `У меня есть три секрета. Ты узнаешь их, разгадывая задания`;
    }, 7000);
    setTimeout(function () {
      document.querySelector(
        '.leo__text'
      ).textContent = `Выполни задание. Когда догадаешься, какая бабочка села на цветок - жми на кнопку "ПРОВЕРИТЬ" 😉`;
    }, 13000);
  } else {
    //попап с неверным паролем
    const popup = document.querySelector('.form__popup');
    popup.classList.remove('hidden');
    setTimeout(function () {
      popup.classList.add('hidden');
    }, 1000);
  }
});

//массив из нот для выбора ответа
const notesVariantAnswer = Array.from([notes[0], notes[2], notes[4]]); //ноты до ре ми

//нажимаем на кнопку с заданием
btnTaskNote.addEventListener('click', function (e) {
  notesVariantAnswer[0].play(); //нота до
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
                        <button type="button" class="btn_butterfly btn_butterfly_${image}" data-butterfly="${image}"></button>
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
    if (e.target.classList.contains('btn_butterfly')) {
      console.log('e.target', e.target);
      const butterfly = e.target.getAttribute('data-butterfly');
      const notesVariantAnswer = [notes[0], notes[2], notes[4]]; //как в 40 строке
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

    if (e.target.classList.contains('btn_custom')) {
      const btnCheck = document.querySelector('.check');
      btnCheck.classList.remove('disabled');
      btnCheck.disabled = false;
    }

    //верный ответ или нет

    if (e.target.classList.contains('btn_answer')) {
      console.log('e.target', e.target);
      // e.target.classList.toggle('answer');
      let letter = [];
      //ответ верный

      // - 0 это нота до строка 44
      if (e.target.getAttribute('data-answer') != 0) {
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
