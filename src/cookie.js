/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');


filterNameInput.addEventListener('keyup', (e) => {
    let value = e.target.value;

    let cookies = parseCookies();

    if (value) {
        listTable.innerHTML = '';
        for (let name in cookies) {
            if (isMatching(name, value) || isMatching(cookies[name], value) ) {
                renderCookie(name, cookies[name])
            }
        }
    } else {
        renderCookiesTable(parseCookies())
    }

});

addButton.addEventListener('click', () => {

    let cookieName = addNameInput.value;
    let cookieValue = addValueInput.value;
    let inputValue = filterNameInput.value;

    if (cookieName && cookieValue && !inputValue) {
        setCookie(cookieName, cookieValue);
        renderCookiesTable(parseCookies());
        addNameInput.value = '';
        addValueInput.value = '';
    } else {
        setCookie(cookieName, cookieValue);
        let cookies = parseCookies();

        if (inputValue) {
            listTable.innerHTML = '';
            for (let name in cookies) {
                if (isMatching(name, inputValue) || isMatching(cookies[name], inputValue) ) {
                    renderCookie(name, cookies[name])
                }
            }
        }

        addNameInput.value = '';
        addValueInput.value = '';
    }


});

document.addEventListener('DOMContentLoaded', () => {
    renderCookiesTable(parseCookies());
});

function parseCookies() {

    // Получаем массив из cookies, где каждый элемент - это строка вида "key=value"
    const cookies = document.cookie.split('; ');

    // Перебираем элементы массива

    let cookiesObj = cookies.reduce((prev, curr) => {
        // на каждой итерации присваиваем переменной name значение до "=", а
        // переменной value значение после "="

        const [name, value] = curr.split('=');

        // Заносим в объект имя куки и значение
        prev[name] = value;

        // возвращаем управление и передаем объект prev на каждой итерации
        return prev;
    }, {}); // <--- в качестве initialValue передаем пустой объект

    return cookiesObj; // возвращаем управление и передаем предеаем объект cookies
}

function renderCookiesTable(obj) {
    // Очищаем listTable от элементов

    listTable.innerHTML = '';

    if (document.cookie !== '') {
        for (let name in obj) {
            renderCookie(name, obj[name])
        }
    }
}

function renderCookie(name, value) {
    listTable.innerHTML +=
        `<tr>
           <td>${name}</td>
           <td>${value}</td>
           <td><button class="delete-button">Удалить</button></td>
        </tr>`;
}

function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == 'number' && expires) {

        let d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {
        updatedCookie += '; ' + propName;
        let propValue = options[propName];

        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, '', {
        expires: -1
    })
}

listTable.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {

        let trParent = e.target.parentElement.parentElement;

        let trName = [...trParent.children][0].textContent;

        deleteCookie(trName);

        renderCookiesTable(parseCookies());

    }
});

function isMatching(full, chunk) {

    if (~full.toLowerCase().indexOf(chunk.toLowerCase())) {
        return true;
    }

    return false;
}