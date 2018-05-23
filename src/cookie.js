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

const deleteBtn = homeworkContainer.querySelectorAll('.delete-button');

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});


addButton.addEventListener('click', () => {

    let cookies = parseCookies();

    if (addNameInput.value && addValueInput.value) {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        if (!(addNameInput.value in cookies)) {
            listTable.innerHTML +=
                `<tr>
            <td>${addNameInput.value}</td>
            <td>${addValueInput.value}</td>
            <td><button class="delete-button">Удалить</button></td>
        </tr>`;
            addNameInput.value = '';
            addValueInput.value = '';
        }
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

    for (let name in obj) {
        listTable.innerHTML +=
            `<tr>
                <td>${name}</td>
                <td>${obj[name]}</td>
                <td><button class="delete-button">Удалить</button></td>
            </tr>`;
    }
}


function writeCookies(obj) {
    let array = [];

    for (let prop in obj) {
        array.push(`${prop}=${obj[prop]}`)
    }
    document.cookie = array.join(';');
}

listTable.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {

        let trParent = e.target.parentElement.parentElement;

        let cookiesObj = parseCookies();

        let trName = [...trParent.children][0].textContent;

        delete cookiesObj[trName];

        writeCookies(cookiesObj);

        console.log(document.cookie)
    }
});