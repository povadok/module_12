// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
// const maxWeightInput = document.querySelector('.maxweight__input').value; // поле с макс весом
// const minWeightInput = document.querySelector('.minweight__input').value; // поле с мин весом
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22},
  {"kind": "Апельсин", "color": "оранжевый", "weight": 30},
  {"kind": "Томат", "color": "красный", "weight": 45},
  {"kind": "Шелковица", "color": "белый", "weight": 3}
]`;

const colors = {
  fruit_violet: 'фиолетовый',
  fruit_green: 'зеленый',
  fruit_carmazin: 'розово-красный',
  fruit_yellow: 'желтый',
  fruit_lightbrown: 'светло-коричневый',
  fruit_red: 'красный',
  fruit_orange: 'оранжевый'
}

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {  
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  while (fruitsList.firstChild) {
    fruitsList.removeChild(fruitsList.firstChild);
  }   
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let valueClassOfColor = classOfColor(fruits[i].color, colors);
    let fruitItem = document.createElement("li");
    let fruitInfo = document.createElement("div");
    let indexFruitInfo = document.createElement("div");
    let kindFruitInfo = document.createElement("div");
    let colorFruitInfo = document.createElement("div");
    let weightFruitInfo = document.createElement("div");
    fruitsList.appendChild(fruitItem);
    fruitItem.className = `fruit__item ${valueClassOfColor}`;
    fruitItem.appendChild(fruitInfo); 
    fruitInfo.className = 'fruit__info';  
    fruitInfo.appendChild(indexFruitInfo);
    indexFruitInfo.textContent = `index: ${i}`;
    fruitInfo.appendChild(kindFruitInfo);
    kindFruitInfo.textContent = `kind: ${fruits[i].kind}`;
    fruitInfo.appendChild(colorFruitInfo);
    colorFruitInfo.textContent = `color: ${fruits[i].color}`;
    fruitInfo.appendChild(weightFruitInfo);
    weightFruitInfo.textContent = `weight: ${fruits[i].weight}`;
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const controlArr = [...fruits];  
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let randElem = getRandomInt(0,fruits.length-1);
    result = [...result,...fruits.splice(randElem, 1)];
  }

  fruits = result;
  let equality = true;
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].kind != controlArr[i].kind) {
      equality = false;
    }
  }
  if (equality) {
    alert('Ничего не перемешалось');
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let filteredFruits = fruits.filter((item) => {
    // TODO: допишите функцию
    return (item.weight >= document.querySelector('.minweight__input').value)&&(item.weight <= document.querySelector('.maxweight__input').value);
  });
  fruits = filteredFruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});
//==================================================================================================----
/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});

// определение класса цвета фрукта
function classOfColor(colorName, colectionOfColors) { 
  let color = 'fruit_grey'; 
  for (let key in colectionOfColors) {    
    if (colectionOfColors[key] == colorName) {
      color = key;
    } 
  }
  return color;
};
