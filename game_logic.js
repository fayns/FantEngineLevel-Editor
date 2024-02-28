// Игровой скрипт
let gameObjects = [];

function start() {
  // Инициализация начальных объектов
  const canvas = document.getElementById('gameCanvas');
  const newObject = new GameObject(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50, 'green');

  gameObjects.push(newObject);
  drawScene();
}

function activateGame() {
  // Создаем объект для тестирования
  const testObject = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    color: 'red'
  };

  // Добавляем объект в сцену
  scene.addObject(testObject);

  // Выводим сообщение в консоль
  console.log('Игра активирована! Тестовый объект добавлен.');

  // Отрисовываем сцену после изменений
  drawScene();
}

function update() {
  // Обновление логики игры (вызывается каждый кадр)

  // Двигаем все объекты
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update();
  }

  drawScene();
}

function drawScene() {
  // Отрисовка сцены (вызывается каждый кадр)
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < gameObjects.length; i++) {
    ctx.fillStyle = gameObjects[i].material;
    ctx.fillRect(gameObjects[i].x, gameObjects[i].y, gameObjects[i].width, gameObjects[i].height);
  }
}

function blinkObject() {
  // Функция для мигания объекта при нажатии на кнопку
  if (gameObjects.length > 0) {
    gameObjects[0].blink();
    drawScene();
  }
}

// Объект игры
class GameObject {
  constructor(x, y, width, height, material) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.material = material;
    this.blinkCounter = 0;
  }

  blink() {
    // Функция мигания
    if (this.blinkCounter < 5) {
      this.material = "#ffffff"; // белый цвет
    } else {
      this.material = "green"; // возвращаем исходный цвет (зеленый)
    }

    this.blinkCounter++;

    if (this.blinkCounter > 10) {
      this.blinkCounter = 0;
    }
  }

  update() {
    // Функция обновления объекта (вызывается каждый кадр)
    this.x += 2; // перемещение вправо

    if (this.x > 900) {
      // если объект выходит за пределы холста, возвращаем его в начальное положение
      this.x = -this.width;
    }
  }
}


// Инициализация
start();

// Обновление каждый кадр (60 раз в секунду)
setInterval(update, 1000 / 60);
