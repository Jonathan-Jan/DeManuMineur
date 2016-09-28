/**
 * Created by jonathan on 28/09/16.
 */

"use strict";

try {
    //test mode
    var Coordinate = require('./Coordinate');
}
catch (e) {
    //web mode
    var Coordinate = window.Coordinate;
}

/**
 * Return a grid for Demineur
 * @param size
 * @param mineNumber
 */
function DemineurGridBuilder(size, mineNumber) {

    /**
     * Constructor
     */
    let Constructor = () => {
        //getting all coordinate
        this.coordinates = Coordinate.helperGridCoordinate(size);

        //placing bomb
        for(let i = 0; i < mineNumber; i++) {
            let x = Math.floor((Math.random() * size));
            let y = Math.floor((Math.random() * size));

            let cell = new Cell(new Coordinate(x,y,size-1,size-1), true);

            if (!(this.coordinates[y][x] instanceof Cell)) {
                this.coordinates[y][x] = cell;
            }
            else {
                i--; //no bomb placed
            }
        }

        //placing cell which are next to a bomb
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {

                let current = this.coordinates[y][x];

                if (current instanceof Cell && current.isBomb) {
                    this.getCell(current.coordinate.north()).addBombNeightbor(current);
                    this.getCell(current.coordinate.south()).addBombNeightbor(current);
                    this.getCell(current.coordinate.east()).addBombNeightbor(current);
                    this.getCell(current.coordinate.west()).addBombNeightbor(current);
                    this.getCell(current.coordinate.north().east()).addBombNeightbor(current);
                    this.getCell(current.coordinate.north().west()).addBombNeightbor(current);
                    this.getCell(current.coordinate.south().east()).addBombNeightbor(current);
                    this.getCell(current.coordinate.south().west()).addBombNeightbor(current);
                }
            }
        }
    };

    /**
     * Getting a cell from coordinates
     * @param x
     * @param y
     * @returns {Cell}
     */
    this.getCell = (coordinate) => {

        let x = coordinate.x;
        let y = coordinate.y;

        let cell = this.coordinates[y][x];

        if (cell instanceof Cell) {
            return cell;
        }
        else {
            this.coordinates[y][x] = new Cell(new Coordinate(x,y, this.coordinates.length-1, this.coordinates.length-1));
            return this.coordinates[y][x];
        }
    };

    this.build = () => {
        let grid = Coordinate.helperGridCoordinate(size);

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {

                let cell = this.coordinates[y][x];

                if (cell instanceof Cell && cell.isBomb) {
                    grid[y][x] = -1;
                }
                else if (cell instanceof Cell) {
                    grid[y][x] = cell.addBombNeightbor.length;
                }
                else {
                    grid[y][x] = 0;
                }
            }
        }

        return grid;
    };

    Constructor();
}

function Cell(coordinate, isBomb) {
    this.coordinate = coordinate;
    this.isBomb = isBomb;
    this.bombNeightbor = [];

    this.addBombNeightbor = (bombCell) => {

        if (this.bombNeightbor.indexOf(bombCell.coordinate.getId()) > -1) {
            return;
        }

        this.bombNeightbor.push(bombCell.coordinate.getId());

    }
}

//for test purpose.
//do not care about this, newbie
try {
    //stop watching, I said DO NOT CARE
    module.exports = DemineurGridBuilder;
}
catch (e) {
    //nothing to do here
}