/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {

        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let arrayNew = [];

    for (let i = 0; i < array.length; i++) {
        arrayNew.push(fn(array[i], i, array));
    }

    return arrayNew;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let prevValue = initial ? initial : array[0];

    let i = initial ? 0 : 1;

    for (i; i < array.length; i++) {
        prevValue = fn(prevValue, array[i], i, array);
    }

    return prevValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    return Object.keys(obj).map((item) => item.toUpperCase())
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let slicedArray = [];
    let startIndex;
    let length;

    if (from > 0) {
        startIndex = from;
    } else if (from < 0) {
        startIndex = (array.length + from < 0) ? 0 : array.length + from;
    } else {
        startIndex = 0;
    }

    if (to >= 0 && to < array.length) {
        length = to;
    } else if (to < 0) {
        length = array.length + to;
    } else {
        length = array.length
    }

    for (let i = startIndex; i < length; i++) {
        slicedArray.push(array[i]);
    }

    return slicedArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
