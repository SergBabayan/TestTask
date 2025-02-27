document.addEventListener("DOMContentLoaded", function () {
    // Элементы
    const mol2 = document.getElementById("mol2");
    const mol = document.getElementById("mol");
    const mol3 = document.getElementById("mol3");

    // Проверка наличия элементов
    if (!mol2 || !mol || !mol3) {
        console.error("Один из элементов не найден!");
        return;
    }

    // Исходные позиции и размеры
    const initialPositions = {
        mol2: { x: 530, y: 350, width: 400, height: 400 },
        mol: { x: 350, y: -70, width: 300, height: 300 },
        mol3: { x: -400, y: 0, width: 350, height: 350 }
    };

    // Инициализация начальных позиций
    gsap.set(mol2, initialPositions.mol2);
    gsap.set(mol, initialPositions.mol);
    gsap.set(mol3, initialPositions.mol3);

    // Функция для перестановки элементов
    function rotateElements(direction) {
        const currentPositions = {
            mol2: { ...initialPositions.mol2 },
            mol: { ...initialPositions.mol },
            mol3: { ...initialPositions.mol3 }
        };

        // Определяем новую позицию в зависимости от направления
        if (direction === "clockwise") {
            initialPositions.mol2 = currentPositions.mol;
            initialPositions.mol = currentPositions.mol3;
            initialPositions.mol3 = currentPositions.mol2;
        } else {
            initialPositions.mol2 = currentPositions.mol3;
            initialPositions.mol = currentPositions.mol2;
            initialPositions.mol3 = currentPositions.mol;
        }

        // Анимация перемещения
        gsap.to(mol2, {
            x: initialPositions.mol2.x,
            y: initialPositions.mol2.y,
            width: initialPositions.mol2.width,
            height: initialPositions.mol2.height,
            duration: 0.8,
            ease: "power2.inOut",
            onStart: () => mol2.classList.add("active")
        });

        gsap.to(mol, {
            x: initialPositions.mol.x,
            y: initialPositions.mol.y,
            width: initialPositions.mol.width,
            height: initialPositions.mol.height,
            duration: 0.8,
            ease: "power2.inOut",
            onStart: () => mol.classList.add("active")
        });

        gsap.to(mol3, {
            x: initialPositions.mol3.x,
            y: initialPositions.mol3.y,
            width: initialPositions.mol3.width,
            height: initialPositions.mol3.height,
            duration: 0.8,
            ease: "power2.inOut",
            onStart: () => mol3.classList.add("active"),
            onComplete: () => {
                [mol2, mol, mol3].forEach(el => el.classList.remove("active"));
            }
        });
    }

    // Обработчики кликов
    mol2.addEventListener("click", () => rotateElements("clockwise"));
    mol.addEventListener("click", () => rotateElements("counterclockwise"));
    mol3.addEventListener("click", () => rotateElements("clockwise"));

    // Обработчики свайпов
    let startX = 0;
    let isSwiping = false;
    const minSwipeDistance = 50;

    // Touch события
    document.addEventListener(
        "touchstart",
        e => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        },
        { passive: true } // touchstart может быть пассивным
    );

    document.addEventListener(
        "touchmove",
        e => {
            if (!isSwiping) return;
            e.preventDefault(); // Блокируем скролл страницы
        },
        { passive: false } // Явно указываем, что событие не пассивное
    );

    document.addEventListener(
        "touchend",
        e => {
            if (!isSwiping) return;
            const endX = e.changedTouches[0].clientX;
            handleSwipe(endX);
            isSwiping = false;
        },
        { passive: true } // touchend может быть пассивным
    );

    // Mouse события
    document.addEventListener("mousedown", e => {
        startX = e.clientX;
        isSwiping = true;
    });

    document.addEventListener("mousemove", e => {
        if (!isSwiping) return;
        e.preventDefault();
    });

    document.addEventListener("mouseup", e => {
        if (!isSwiping) return;
        const endX = e.clientX;
        handleSwipe(endX);
        isSwiping = false;
    });

    // Обработка свайпа
    function handleSwipe(endX) {
        const diffX = endX - startX;

        if (Math.abs(diffX) < minSwipeDistance) return;

        if (diffX > 0) {
            rotateElements("counterclockwise"); // Свайп вправо
        } else {
            rotateElements("clockwise"); // Свайп влево
        }
    }
});