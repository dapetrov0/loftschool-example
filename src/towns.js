/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

function loadTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return new Promise((resolve, reject) => {
        // 1. Создаем новый объект XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // 2. Подготовка запроса, конфигурация
        xhr.open('GET', url);

        // 3. Вешаем событие загрузки
        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                let towns = null;

                try {
                    towns = JSON.parse(this.response);
                } catch (e) {
                    throw new Error('Что-то пошло не так')
                }

                const sortFunc = function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                };

                resolve(towns.sort(sortFunc));
            } else {
                const error = new Error(this.statusText);

                error.code = this.status;
                reject(error);
            }
        });

        xhr.addEventListener('error', () => reject(new Error('Ошибка сети')));

        // 4. Отсылаем запрос
        xhr.send();
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */

function isMatching(full, chunk) {
    // ~str.inexOf означает "не равно -1"

    if (~full.toLowerCase().indexOf(chunk.toLowerCase())) {
        return true;
    }

    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

/* Блок с сообщением, что загрузка не удалась*/

const errorBlock = homeworkContainer.querySelector('#error-block');
const repeatBtn = homeworkContainer.querySelector('#repeat-btn');

// Функция, которая будет вызываться при положительном разрешении промиса

function loadResolve(data) {
    // показываем блок с поиском
    filterBlock.style.display = 'block';

    // скрываем блок загрузки
    loadingBlock.style.display = 'none';

    // вешаем обработчик собитый на нажатие клавиши и выводим города

    filterInput.addEventListener('keyup', (event) => {
        let value = event.target.value;

        filterResult.innerHTML = '';

        if (value) {
            for (let town of data) {
                if (isMatching(town.name, value)) {
                    filterResult.innerHTML += `<div>${town.name}</div>`;
                }
            }
        }
    });
}

// Функция, которая будет вызываться при положительном разрешении промиса

function loadReject() {
    // скрываем блок загрузки
    loadingBlock.style.display = 'none';
    // показываем блок ошибки
    errorBlock.style.display = 'block';
}

loadTowns()
    .then((data) => loadResolve(data))
    .catch((error) => loadReject(error));

// Вешаем обработчик событий на повторную загрузку городов

repeatBtn.addEventListener('click', () => {
    loadTowns()
        .then((data) => loadResolve(data))
        .catch((error) => loadReject(error));
});

export {
    loadTowns,
    isMatching
};
