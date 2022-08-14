const COLUMNS = 16;
const ROWS = 16;

const createGrids = () => {
    const gridContainer = document.querySelector(".grid-container");
    for (let i = 1; i <= COLUMNS; i++) {
        for (let j = 1; j <= ROWS; j++) {
            let grid = document.createElement("div");
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

createGrids();