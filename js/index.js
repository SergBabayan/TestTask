document.addEventListener("DOMContentLoaded", function () {

    const mol2 = document.getElementById("mol2");
    const mol = document.getElementById("mol");
    const mol3 = document.getElementById("mol3");

    if (!mol2 || !mol || !mol3) {
        console.error("Один из элементов не найден!");
        return;
    }

    const initialPositions = {
        mol2: { x: 530, y: 350, width: 400, height: 400 },
        mol: { x: 350, y: -70, width: 300, height: 300 },
        mol3: { x: -400, y: 0, width: 350, height: 350 }
    };

    gsap.set(mol2, initialPositions.mol2);
    gsap.set(mol, initialPositions.mol);
    gsap.set(mol3, initialPositions.mol3);

    function rotateElements() {
        const currentPositions = {
            mol2: { ...initialPositions.mol2 },
            mol: { ...initialPositions.mol },
            mol3: { ...initialPositions.mol3 }
        };

        initialPositions.mol2 = currentPositions.mol;
        initialPositions.mol = currentPositions.mol3;
        initialPositions.mol3 = currentPositions.mol2;

        gsap.to(mol2, {
            x: initialPositions.mol2.x,
            y: initialPositions.mol2.y,
            width: initialPositions.mol2.width,
            height: initialPositions.mol2.height,
            duration: 1,
            ease: "power2.inOut",
            onStart: () => mol2.classList.add("active"),
            onComplete: () => mol2.classList.remove("active")
        });

        gsap.to(mol, {
            x: initialPositions.mol.x,
            y: initialPositions.mol.y,
            width: initialPositions.mol.width,
            height: initialPositions.mol.height,
            duration: 1,
            ease: "power2.inOut",
            onStart: () => mol.classList.add("active"),
            onComplete: () => mol.classList.remove("active")
        });

        gsap.to(mol3, {
            x: initialPositions.mol3.x,
            y: initialPositions.mol3.y,
            width: initialPositions.mol3.width,
            height: initialPositions.mol3.height,
            duration: 1,
            ease: "power2.inOut",
            onStart: () => mol3.classList.add("active"),
            onComplete: () => mol3.classList.remove("active")
        });
    }

    [mol2, mol, mol3].forEach((element) => {
        element.addEventListener("click", rotateElements);
    });
});