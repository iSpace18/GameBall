const field = document.getElementById('field');
const ball = document.getElementById('ball');
const target = document.createElement('div');
const step = 10;
let targetReached = false;

target.classList.add('target');
target.style.position = 'absolute';
target.style.top = '350px'; // Позиция цели по вертикали
target.style.left = '350px'; // Позиция цели по горизонтали
field.appendChild(target);

document.addEventListener('keydown', (event) => {
    if (targetReached) return; // Если цель уже достигнута, игнорируем дальнейшее движение

    const fieldRect = field.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    let newLeft = ball.offsetLeft;
    let newTop = ball.offsetTop;

    switch (event.key) {
        case 'ArrowUp':
            newTop -= step;
            break;
        case 'ArrowDown':
            newTop += step;
            break;
        case 'ArrowLeft':
            newLeft -= step;
            break;
        case 'ArrowRight':
            newLeft += step;
            break;
        case 'q':
            ball.style.backgroundColor = 'red';
            break;
        case 'w':
            ball.style.backgroundColor = 'white';
            break;
        case 'e':
            ball.style.backgroundColor = 'blue';
            break;
    }

    let collision = false;
    const ballCoordinates = {
        top: newTop,
        bottom: newTop + ballRect.height,
        left: newLeft,
        right: newLeft + ballRect.width
    };

    const walls = document.querySelectorAll('.wall');
    walls.forEach(wall => {
        const wallRect = wall.getBoundingClientRect();
        const wallCoordinates = {
            top: wallRect.top - fieldRect.top,
            bottom: wallRect.bottom - fieldRect.top,
            left: wallRect.left - fieldRect.left,
            right: wallRect.right - fieldRect.left
        };

        if (ballCoordinates.left < wallCoordinates.right &&
            ballCoordinates.right > wallCoordinates.left &&
            ballCoordinates.top < wallCoordinates.bottom &&
            ballCoordinates.bottom > wallCoordinates.top) {
            collision = true;
        }
    });

    if (!collision && newLeft >= 0 && newTop >= 0 && newLeft + ballRect.width <= fieldRect.width && newTop + ballRect.height <= fieldRect.height) {
        ball.style.left = `${newLeft}px`;
        ball.style.top = `${newTop}px`;
        
        // Проверка на достижение цели
        const targetRect = target.getBoundingClientRect();
        if (ballCoordinates.left < targetRect.right &&
            ballCoordinates.right > targetRect.left &&
            ballCoordinates.top < targetRect.bottom &&
            ballCoordinates.bottom > targetRect.top) {
            targetReached = true;
            ball.style.animation = 'bounce 0.5s ease infinite alternate'; // Анимация для мячика
            setTimeout(() => {
                alert('Поздравляем! Вы достигли цели!');
            }, 500); // Показываем сообщение о победе через 0.5 секунды
        }
    }
});

// Создаем элементы стен для лабиринта
const wallsPositions = [
    { top: 190, left: 70, width: 100, height: 10 },
    { top: 190, left: 70, width: 20, height: 150 },
    { top: 200, left: 150, width: 20, height: 150 },
    { top: 300, left: 150, width: 20, height: 100},
    { top: 70, left: 70, width: 20, height: 150 },
    { top: 70, left: 70, width: 200, height: 10 },
    { top: 70, left: 250, width: 20, height: 100},
    // Добавьте другие позиции стен по вашему усмотрению
];
wallsPositions.forEach(position => {
    const wall = document.createElement('div');
    wall.classList.add('wall');
    wall.style.position = 'absolute';
    wall.style.top = `${position.top}px`;
    wall.style.left = `${position.left}px`;
    wall.style.width = `${position.width}px`;
    wall.style.height = `${position.height}px`;
    wall.style.backgroundColor = 'black'; // Цвет стены
    field.appendChild(wall);
});