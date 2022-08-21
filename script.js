let gridNumber = 16;
let colorMode = "free-draw";
let autoModeTimer;

// CANVAS CREATION AND ALTERATION RELATED FUNCTIONS

// Creates canvas of pixels using a nested array.
const createCanvas = () => {
    const gridContainer = document.querySelector(".grid-container");
    for (let i = 1; i <= gridNumber; i++) {
        for (let j = 1; j <= gridNumber; j++) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            grid.setAttribute("id", `grid-${i}-${j}`);
            adjustDimensions(grid);
            gridContainer.append(grid);
            changeModes(grid);
        }
    }
}

// Changes the height and width of each grid when the user changes the number of pixels in each row and column.
// Container width and border width are static, so the dimensions of each grid have to change to compensate.
const adjustDimensions = (grid) => {
    const gridContainerWidth = 672;
    const gridBorderWidth = 2;
    let newDimensions = gridContainerWidth / gridNumber - gridBorderWidth;
    grid.style.height = `${newDimensions}px`;
    grid.style.width = `${newDimensions}px`;
}

// Creates a new blank canvas when the user changes the number of pixels in each row and column.
const changeCanvasSize = () => {
    const button = document.querySelector(".change-number");
    button.addEventListener("click", () => {
        askForGrids();
        removeCanvas();
        createCanvas();
    })
}

// Prompts the user to enter their desired new number of pixels.
const askForGrids = () => {
    let newGridNumber = 0;
    do {
        newGridNumber = Number(prompt("How many grids per side do you want? From 1 to 100."));
    } while (newGridNumber < 1 || newGridNumber > 100)
    gridNumber = newGridNumber;
}

// Resets the colors of the canvas.
const resetCanvas = () => {
    const button = document.querySelector(".reset");
    button.addEventListener("click", () => {
        removeCanvas();
        createCanvas();
    })
}

// Deletes the current canvas.
const removeCanvas = () => {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
}

// COLOR MODE RELATED FUNCTIONS

// Changes the current mode based on the button clicked.
const changeModes = (grid) => {
    switch (colorMode) {
        case "free-draw":
        default:
            grid.addEventListener("mouseover", () => {
                grid.classList.add("hover");
            })
            break;
        case "random":
            grid.addEventListener("mouseover", () => {
                createRandomColors(grid);
            })
            break;
        case "monochrome":
            grid.addEventListener("mouseover", () => {
                let randomColor = Math.floor(Math.random() * 255);
                grid.style.backgroundColor = `rgb(${randomColor}, ${randomColor}, ${randomColor})`;
            })            
            break;
        case "shade-in":
            let currentColor = 255;
            grid.addEventListener("mouseover", () => {
                if (currentColor > 0) {
                    currentColor -= 25.5;
                    grid.style.backgroundColor = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
                }
            })
            break;
        case "auto-random":
            selectForRandomColors();
            break;
        case "auto-move":
            break;
    }
}

// Enables color mode to change when a button is clicked.
const addColorModeButtons = () => {
    let colorModeButtons = document.querySelectorAll(".color-mode");
    colorModeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let newColorMode = button.getAttribute("id");
            if (newColorMode === "auto-move") {
                enableAutoMoveMode();
            }
            if (colorMode !== newColorMode) {
                colorMode = newColorMode;
                if (newColorMode !== "auto-random"){
                    toggleAutoRandomMode("off");
                }
                removeCanvas();
                createCanvas();
                if (colorMode === "auto-random") {
                    toggleAutoRandomMode("on");
                } else if (colorMode === "auto-move") {
                    enableAutoMoveMode();
                }
            }
        })
    })
}

// Creates color palette options for free draw mode.
const addColorOptions = () => {
    const colorContainer = document.querySelector(".color-container");
    const colorPalette = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "#191919", "white"];
    colorPalette.forEach((color) => {
        const colorOption = document.createElement("div");
        colorOption.classList.add("special-grid");
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener("click", () => {
            changePaintColor(color);
        })
        colorContainer.append(colorOption);
    })
}

// Changes paint color in free draw mode when clicking a color palette option.
const changePaintColor = (newColor) => {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
        grid.removeEventListener("mouseover", changeModes);
        grid.addEventListener("mouseover", () => {
            grid.style.backgroundColor = newColor;
        })
    })
}

// Shows and hides color palette options depending if in free draw mode or not.
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

// Selects canvas pixels to create random colors.
const selectForRandomColors = () => {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
        createRandomColors(grid);
    })
}

// Creates random colors for the target pixel.
const createRandomColors = (grid) => {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    grid.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

// AUTO MODE RELATED FUNCTIONS

// Toggle auto random mode on or off.
const toggleAutoRandomMode = (toggle) => {
    if (toggle === "on") {
        autoModeTimer = setInterval(selectForRandomColors, 1000);
    } else if (toggle === "off") {
        clearInterval(autoModeTimer);
    }   
}

// Enable auto move mode timers for each pixel.
const enableAutoMoveMode = () => {
    for (let i = 1; i <= gridNumber; i++) {
        for (let j = 1; j <= gridNumber; j++) {
            if (autoModeTimer !== null) {
                clearInterval(autoModeTimer);
            }
            const activeGrid = document.querySelector(`#grid-${i}-${j}`);
            console.log(`#grid-${i}-${j}`)
            sendSnakingGrid(activeGrid, i, j);
        }
    }
}

// Creates a snaking pattern by setting timers to turn each pixel "on and off" (black then white).
const sendSnakingGrid = (grid, row, column) => {
    if (row % 2 !== 0) {
        setTimeout(snakeLeftToRight = () => {
            grid.style.backgroundColor = "#191919";
        }, ((row - 1) * gridNumber + column) * 50);
        setTimeout(disableSnaking = () => {
            grid.style.backgroundColor = "white";
        }, ((row - 1) * gridNumber + column) * 50 + 50);
    } else {
        setTimeout(snakeRightToLeft = () => {
            grid.style.backgroundColor = "#191919";
        }, ((row - 1) * gridNumber + ((gridNumber + 1) - column)) * 50);
        setTimeout(disableSnaking = () => {
            grid.style.backgroundColor = "white";
        }, ((row - 1) * gridNumber + ((gridNumber + 1) - column)) * 50 + 50);
    }
}

createCanvas();
changeCanvasSize();
resetCanvas();
addColorModeButtons();

addColorOptions();
toggleColorOptions();