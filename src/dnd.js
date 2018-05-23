/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');

    const randomWidth = getRand(10, 200);
    const randomHeight = getRand(10, 200);

    // newDiv.style.position = 'absolute';
    // newDiv.style.width = getRand(10, 200) + 'px';
    // newDiv.style.height = getRand(10, 150) + 'px';
    // newDiv.style.top = getRand(0, window.innerHeight - randomHeight) + 'px';
    // newDiv.style.left = getRand(0, window.innerWidth - randomWidth) + 'px';
    // newDiv.style.backgroundColor = `rgba(${getRand(0, 255)},${getRand(0, 255)},${getRand(0, 255)}) `;

    newDiv.style.cssText = `
        position: absolute;
        width: ${randomWidth}px;
        height: ${randomHeight}px;
        top: ${getRand(0, window.innerHeight - randomHeight)}px;
        left: ${getRand(0, window.innerWidth - randomWidth)}px;
        background-color: rgba(${getRand(0, 255)},${getRand(0, 255)},${getRand(0, 255)})`;

    function getRand(min, max) {
        return min + Math.floor(Math.random() * (max + 1 - min))
    }

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', function (e) {

        let coords = getCoords(target);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        target.style.position = 'absolute';

        moveToCoords(e);

        document.onmousemove = function (e) {
            moveToCoords(e);
        };

        target.onmouseup = function () {
            document.onmousemove = null;
            target.onmouseup = null;
        };

        target.ondragstart = function () {
            return false;
        };

        function moveToCoords(e) {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        }

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
