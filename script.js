let gridNumber = 16;

const createGrids = () => {
    const gridContainer = document.querySelector(".grid-container");
    for (let i = 1; i <= gridNumber; i++) {
        for (let j = 1; j <= gridNumber; j++) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            grid.setAttribute("id", `grid-${i}-${j}`);
            hoverGrid(grid);
            gridContainer.append(grid);
        }
    }
}

const hoverGrid = (element) => {
    element.addEventListener("mouseover", () => {
        element.classList.add("hover");
    })
}

const gridButton = () => {
    const button = document.querySelector("button");
    button.addEventListener("click", () => {
        askForGrids();
        removeGrids();
        createGrids();
    })
}

const askForGrids = () => {
    let newGridNumber = 0;
    do {
        newGridNumber = prompt("How many grids per side do you want? From 1 to 100.");
    } while (newGridNumber < 1 || newGridNumber > 100)
    gridNumber = newGridNumber;
}

const removeGrids = () => {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
}

createGrids();
gridButton();