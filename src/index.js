/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
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

                towns.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                });

                resolve(towns);
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

export {
    delayPromise,
    loadAndSortTowns
};
