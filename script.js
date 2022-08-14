let columns = 16;
let rows = 16;

const createGrids = () => {
    const gridContainer = document.querySelector(".grid-container");
    for (let i = 1; i <= columns; i++) {
        for (let j = 1; j <= rows; j++) {
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