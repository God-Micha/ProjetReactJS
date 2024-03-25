import Grid from '../models/grid';

export let batch = {};

export function processBatch() {
    Object.entries(batch).forEach(([gridId, updates]) => {
        Grid.findById(gridId).then((grid) => {
            if (!grid) {
                return;
            }
            updates.forEach(({ x, y, color }) => {
                if (grid.pixels[x] && grid.pixels[x][y]) {
                    grid.pixels[x][y].color = color;
                }
            });
            grid.lastUpdate = Date.now();
            grid.save().catch(err => console.log(err));
        }).catch((err) => {
            console.log(err);
        });
    });
    batch = {};
}

export default { processBatch, batch };