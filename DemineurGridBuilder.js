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
     * (called at this end of DemineurGridBuilder(...))
     */
    let Constructor = () => {
        //getting all coordinate
        this.coordinates = Coordinate.helperGridCoordinate(size);

        this.bombCells = [];

        //placing bomb
        for(let i = 0; i < mineNumber; i++) {
            //random x and y
            let x = Math.floor((Math.random() * size));
            let y = Math.floor((Math.random() * size));



            if (!(this.coordinates[y][x] instanceof Cell)) {

                //creating a bomb cell (see class Cell below)
                let cell = new Cell(new Coordinate(x,y,size-1,size-1), true);

                //adding this cell to the grid
                this.coordinates[y][x] = cell;
                //and to the list of bomb
                this.bombCells.push(cell);
            }
            else {
                i--; //no bomb placed
            }
        }

        //placing cell which are next to a bomb
        this.bombCells.forEach(bombCell => {
            this.getCell(bombCell.coordinate.north()).addBombNeightbor(bombCell);
            this.getCell(bombCell.coordinate.south()).addBombNeightbor(bombCell);
            this.getCell(bombCell.coordinate.east()).addBombNeightbor(bombCell);
            this.getCell(bombCell.coordinate.west()).addBombNeightbor(bombCell);
            this.getCell(bombCell.coordinate.north().east()).addBombNeightbor(bombCell);
            this.getCell(bombCell.coordinate.north().west()).addBombNeightbor(bombCell);
            this.getCell(bombCell.coordinate.south().east()).addBombNeightbor(bombCell);
            this.getCell(bombCell.coordinate.south().west()).addBombNeightbor(bombCell);
        });
    };

    /**
     * Getting a cell from coordinates
     * @param coordinate
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

    /**
     * build a grid for the Demineur class
     */
    this.build = () => {
        //creating a grid of coordinate
        let grid = Coordinate.helperGridCoordinate(size);

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {

                // we have 3 types of cell in this.coordinates
                // 1 - bomb
                // 2 - cell which are next to one or more bomb
                // 3 - other cell (which are not effectively in this.coordinates as Cell instance

                //getting the cell from coordinates of the builder
                let cell = this.coordinates[y][x];

                //if this cell is a bomb... (1)
                if (cell instanceof Cell && cell.isBomb) {
                    grid[y][x] = -1;
                }
                //if this cell is next to a bomb (2)
                else if (cell instanceof Cell) {
                    grid[y][x] = cell.addBombNeightbor.length;
                }
                //if this is an empty cell (3)
                else {
                    grid[y][x] = 0;
                }
            }
        }

        return grid;
    };

    Constructor();
}

/**
 * A cell of the futur Demineur grid
 * @param coordinate
 * @param isBomb
 * @constructor
 */
function Cell(coordinate, isBomb) {
    this.coordinate = coordinate; //x.y
    this.isBomb = isBomb; //true if this is a bomb cell
    this.bombNeightbor = []; //array of near cell which are bomb cell (sometimes it can contains the cell itself, but it doesn't matter)

    /**
     * Adding a neightbor cell
     * @param bombCell
     */
    this.addBombNeightbor = (bombCell) => {

        //check if it has already been registered
        if (this.bombNeightbor.indexOf(bombCell.coordinate.getId()) > -1) {
            return;
        }

        //add it
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