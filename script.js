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

//вводим данные и пароль, переходим на главную страницу
btnEnterPlayer.addEventListener('click', function () {
  inputPasswordPlayer.value.toLowerCase();
  const name = inputNamePlayer.value;
  const firstLetterName = name.slice(0, 1).toUpperCase();
  const lettersName = name.slice(1);
  let nameLetters = [];
  nameLetters.push(firstLetterName, lettersName);
  console.log(nameLetters);
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
      ).textContent = `Выполни задание. Когда догадаешься, какая бабочка села на цветок - жми на кнопку "ПРОВЕРИТЬ" 😉`;
    }, 5000);
  }
});

const notesVariantAnswer = Array.from([notes[0], notes[2], notes[4]]);

//нажимаем на кнопку с заданием
btnTaskNote.addEventListener('click', function (e) {
  notesVariantAnswer[0].play();
});

const num = [0, 1, 2];

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
      if (e.target.getAttribute('data-answer') != 0) {
        console.log(e.target.getAttribute('data-answer'));
        letter.push('б');
        console.log(letter);
      } else {
        letter.push('a');
        console.log(letter);
      }

      //Проверка результата по кнопке Проверить
      document.querySelector('.check').addEventListener('click', function () {
        console.log('letter', letter);
        if (letter.includes('a')) {
          console.log('ууу');
          document.querySelector('.main').classList.add('hidden');
          document.querySelector('.answer').classList.remove('hidden');
          //звуки пианино
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
            const audio = document.querySelector(
                `audio[data-key="${e.keyCode}"]`
              ),
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
          keys.forEach((key) =>
            key.addEventListener('transitionend', removeTransition)
          );

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
        } else {
          console.log('ttt');

          document.querySelector('.main').classList.add('hidden');
          document.querySelector('.wrong-answer').classList.remove('hidden');
          //переход на главную страницу, если ответ неверный
          document
            .querySelector('.reset')
            .addEventListener('click', function () {
              document.querySelector('.wrong-answer').classList.add('hidden');
              document.querySelector('.main').classList.remove('hidden');
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

function wrongAnswer() {}

renderRandomImage();
