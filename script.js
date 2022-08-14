let gridNumber = 16;
let gridContainerWidth = 672;
let gridBorderWidth = 2;
let colorMode = "single";

const createGrids = () => {
    const gridContainer = document.querySelector(".grid-container");
    for (let i = 1; i <= gridNumber; i++) {
        for (let j = 1; j <= gridNumber; j++) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            grid.setAttribute("id", `grid-${i}-${j}`);
            hoverGrid(grid);
            adjustDimensions(grid);
            gridContainer.append(grid);
        }
    }
}

const hoverGrid = (element) => {
    // Single color
    element.addEventListener("mouseover", () => {
        element.classList.add("hover");
    })
    // Monochrome
    // element.addEventListener("mouseover", () => {
    //     let randomColor = Math.floor(Math.random() * 255);
    //     element.style.backgroundColor = `rgb(${randomColor}, ${randomColor}, ${randomColor})`;
    // })
    // Random color
    // element.addEventListener("mouseover", () => {
    //     let red = Math.floor(Math.random() * 255);
    //     let green = Math.floor(Math.random() * 255);
    //     let blue = Math.floor(Math.random() * 255);
    //     element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    // })
    // 10% blacker
    // let currentColor = 255;
    // element.addEventListener("mouseover", () => {
    //     currentColor -= 25.5;
    //     element.style.backgroundColor = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
    // })
}

const adjustDimensions = (element) => {
    let newDimensions = gridContainerWidth / gridNumber - gridBorderWidth;
    element.style.height = `${newDimensions}px`;
    element.style.width = `${newDimensions}px`;
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