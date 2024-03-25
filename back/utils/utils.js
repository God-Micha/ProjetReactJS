export function calculateGridId(x, y) {
    const gridSize = 10; // Taille de la sous-grille, ajuste selon ton application
    const gridX = Math.floor(x / gridSize);
    const gridY = Math.floor(y / gridSize);
    return `grid-${gridX}-${gridY}`;
}