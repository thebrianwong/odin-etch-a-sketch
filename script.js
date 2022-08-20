let gridNumber = 16;
const gridContainerWidth = 672;
const gridBorderWidth = 2;
let colorMode = "free-draw";
let autoMode;

const createGrids = () => {
    const gridContainer = document.querySelector(".grid-container");
    for (let i = 1; i <= gridNumber; i++) {
        for (let j = 1; j <= gridNumber; j++) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            grid.setAttribute("id", `grid-${i}-${j}`);
            adjustDimensions(grid);
            gridContainer.append(grid);
            hoverGrid(grid);
        }
    }
}

const hoverGrid = (element) => {
    switch (colorMode) {
        case "free-draw":
        default:
            element.addEventListener("mouseover", () => {
                element.classList.add("hover");
            })
            break;
        case "random":
            element.addEventListener("mouseover", () => {
                createRandomColors(element);
            })
            break;
        case "monochrome":
            element.addEventListener("mouseover", () => {
                let randomColor = Math.floor(Math.random() * 255);
                element.style.backgroundColor = `rgb(${randomColor}, ${randomColor}, ${randomColor})`;
            })            
            break;
        case "shade-in":
            let currentColor = 255;
            element.addEventListener("mouseover", () => {
                if (currentColor > 0) {
                    currentColor -= 25.5;
                    element.style.backgroundColor = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
                }
            })
            break;
        case "auto-random":
            changeRandomColors();
            break;
        case "auto-move":
            break;
    }
}

const adjustDimensions = (element) => {
    let newDimensions = gridContainerWidth / gridNumber - gridBorderWidth;
    element.style.height = `${newDimensions}px`;
    element.style.width = `${newDimensions}px`;
}

const changeGrid = () => {
    const button = document.querySelector(".change-number");
    button.addEventListener("click", () => {
        askForGrids();
        removeGrids();
        createGrids();
    })
}

const resetGrid = () => {
    const button = document.querySelector(".reset");
    button.addEventListener("click", () => {
        removeGrids();
        createGrids();
    })
}

const askForGrids = () => {
    let newGridNumber = 0;
    do {
        newGridNumber = Number(prompt("How many grids per side do you want? From 1 to 100."));
    } while (newGridNumber < 1 || newGridNumber > 100)
    gridNumber = newGridNumber;
}

const removeGrids = () => {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
}

const addColorModeButtons = () => {
    let colorModeButtons = document.querySelectorAll(".color-mode");
    colorModeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let newColorMode = button.getAttribute("id");
            if (newColorMode === "auto-move") {
                autoMove();
            }
            if (colorMode !== newColorMode) {
                colorMode = newColorMode;
                if (newColorMode !== "auto-random"){
                    autoRandom("off");
                }
                removeGrids();
                createGrids();
                if (colorMode === "auto-random") {
                    autoRandom("on");
                } else if (colorMode === "auto-move") {
                    autoMove();
                }
            }
        })
    })
}

const addColorOptions = () => {
    const colorContainer = document.querySelector(".color-container");
    const genericColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "#191919", "white"];
    genericColors.forEach((color) => {
        const colorOption = document.createElement("div");
        colorOption.classList.add("special-grid");
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener("click", () => {
            changeColor(color);
        })
        colorContainer.append(colorOption);
    })
}

const changeColor = (newColor) => {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
        grid.removeEventListener("mouseover", hoverGrid);
        grid.addEventListener("mouseover", () => {
            grid.style.backgroundColor = newColor;
        })
    })
}

const toggleColorOptions = () => {
    const colorContainer = document.querySelector(".color-container");
    const freeDrawButton = document.querySelector("#free-draw");
    freeDrawButton.addEventListener("click", () => {
        colorContainer.style.visibility = "visible";
    })
    const nonFreeDrawButtons = document.querySelectorAll(".no-options");
    nonFreeDrawButtons.forEach((button) => {
        button.addEventListener("click", () => {
            colorContainer.style.visibility = "hidden";
        })
    })
}

const changeRandomColors = () => {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
        createRandomColors(grid);
    })
}

const createRandomColors = (grid) => {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    grid.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}


createGrids();
changeGrid();
resetGrid();
addColorModeButtons();

addColorOptions();
toggleColorOptions();

const autoRandom = (toggle) => {
    if (toggle === "on") {
        autoMode = setInterval(changeRandomColors, 1000);
    } else if (toggle === "off") {
        clearInterval(autoMode);
    }   
}

const autoMove = () => {
    for (let i = 1; i <= gridNumber; i++) {
        if  (i % 2 !== 0) {
            for (let j = 1; j <= gridNumber; j++) {
                if (autoMode !== null) {
                    clearInterval(autoMode);
                }
                const activeGrid = document.querySelector(`#grid-${i}-${j}`);
                autoMode = snakingGrid(activeGrid, i, j);
            }
        } else {
            for (let j = gridNumber; j > 0; j--) {
                if (autoMode !== null) {
                    clearInterval(autoMode);
                }
                const activeGrid = document.querySelector(`#grid-${i}-${j}`);
                autoMode = snakingGrid(activeGrid, i, j);
            }
        }
    }
}

const snakingGrid = (grid, row, column) => {
    if (row % 2 !== 0) {
        autoMode = setTimeout(snakingColor = () => {
            grid.style.backgroundColor = "#191919";
        }, ((row - 1) * gridNumber + column) * 50);
        const offAutoMode = setTimeout(offSnakingColor = () => {
            grid.style.backgroundColor = "white";
        }, ((row - 1) * gridNumber + column) * 50 + 50);
    } else {
        autoMode = setTimeout(snakingColor = () => {
            grid.style.backgroundColor = "#191919";
        }, ((row - 1) * gridNumber + ((gridNumber + 1) - column)) * 50);
        const offAutoMode = setTimeout(offSnakingColor = () => {
            grid.style.backgroundColor = "white";
        }, ((row - 1) * gridNumber + ((gridNumber + 1) - column)) * 50 + 50);
    }
}
