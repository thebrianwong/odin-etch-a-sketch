const COLUMNS = 16;
const ROWS = 16;

const createGrids = () => {
    const gridContainer = document.querySelector(".grid-container");
    for (let i = 0; i < COLUMNS; i++) {
        for (let j = 0; j < ROWS; j++) {
            let grid = document.createElement("div");
            grid.classList.add("grid");
            grid.setAttribute("id", `grid-${i}-${j}`);
            console.log(grid);
            console.log(gridContainer)
            gridContainer.append(grid);
        }
    }
}

createGrids();