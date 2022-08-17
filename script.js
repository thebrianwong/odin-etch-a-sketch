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
            hoverGrid(grid);
            adjustDimensions(grid);
            gridContainer.append(grid);
        }
    }
    if (colorMode === "auto-random") {
        autoRandom("on")
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
                let red = Math.floor(Math.random() * 255);
                let green = Math.floor(Math.random() * 255);
                let blue = Math.floor(Math.random() * 255);
                element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
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
                currentColor -= 25.5;
                element.style.backgroundColor = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
            })
            break;
        case "auto-random":
            // autoRandom("on");
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
        newGridNumber = prompt("How many grids per side do you want? From 1 to 100.");
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
            if (colorMode !== newColorMode) {
                colorMode = newColorMode;
                // if (colorMode === "free-draw") {
                //     showColorOptions();
                // } else {
                //     hideColorOptions();
                // }
                if (newColorMode !== "auto-random"){
                    autoRandom("off")
                }
                removeGrids();
                createGrids();
            }
        })
    })
}

const addColorOptions = () => {
    const colorContainer = document.querySelector(".color-container");
    const genericColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "#191919", "white"]
    genericColors.forEach((color) => {
        const colorOption = document.createElement("div");
        colorOption.classList.add("special-grid");
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener("click", () => {
            changeColor(color);
        })
        console.log(color)
        colorContainer.append(colorOption);
    })
}

const changeColor = (newColor) => {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
        grid.removeEventListener("mouseover", hoverGrid)
        grid.addEventListener("mouseover", () => {
            grid.style.backgroundColor = newColor;
        })
    })
}

const toggleColorOptions = () => {
    const colorContainer = document.querySelector(".color-container");
    const freeDrawButton = document.querySelector("#free-draw");
    freeDrawButton.addEventListener("click", () => {
        colorContainer.style.display = "flex";
    })
    const nonFreeDrawButtons = document.querySelectorAll(".no-options");
    nonFreeDrawButtons.forEach((button) => {
        button.addEventListener("click", () => {
            colorContainer.style.display = "none";
        })
    })
}

const changeRandomColors = () => {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        grid.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    })
}

createGrids();
changeGrid();
resetGrid();
addColorModeButtons();

addColorOptions();
toggleColorOptions();

const autoRandom = (toggle) => {
    // let autotest;
    if (toggle === "on" && !autoMode && autoMode !== "auto-random") {
        autoMode = setInterval(changeRandomColors, 1000)
        console.log(autoMode)
    } else if (toggle === "off") {
        console.log("BLBLBLB")
        clearInterval(autoMode);
        autoMode = null;
    }   
}
