/**
 * Created by jonathan on 27/09/16.
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
 * Demnieur
 * @constructor
 */
function Demineur() {
    this.grid=
        [
            [0,1,1,1,0],
            [0,2,-1,2,0],
            [0,2,-1,2,0],
            [0,2,2,2,0],
            [0,1,-1,1,0]
        ];
    this.bombNumber = 3;

    this.gameOver = false;
    this.win = false;

    //list of coordinate of revealed Cell
    this.revealed = [];

    /**
     * a player click on the game
     * @param x
     * @param y
     */
    this.click = (x,y) => {

        if (this.gameOver || this.win) {
            return;
        }

        let coordinate = this.buildBoundedCoordinate(x,y);

        //gameOver became true if the user clicked on a bomb
        this.gameOver = this.getValue(coordinate) === -1;

        //reveal this cell, and maybe is neighbor
        this.reveal(coordinate);

        this.win = this.isWin();
    };

    /**
     * return a instance of Coordinate boudned with maxX and maxY
     */
    this.buildBoundedCoordinate = (x,y) => {
        return new Coordinate(
            x,
            y,
            this.grid.length-1,   //max X value (4)
            this.grid[0].length-1 //max Y value (4)
        );
    };

    /**
     * get value from the grid (visible or not, doesn't matter)
     * @param coordinate
     */
    this.getValue = (coordinate) => {
        return this.grid[coordinate.y][coordinate.x];
    };

    /**
     * Reveal a cell
     * push the cell coordinate into the revealed Array
     * @param coordinate
     */
    this.reveal = (coordinate) => {

        //if this is a discovered cell, stop here
        if (this.getCellValue(coordinate) !== false) {
            return;
        }

        //add this coordinate to the list of discovered cell
        this.revealed.push(coordinate.getId());

        //get the value of this cell
        let value = this.getValue(coordinate);

        //if this is 0, reveal this cell neighbor
        if (value === 0) {
            this.reveal(coordinate.north());
            this.reveal(coordinate.south());
            this.reveal(coordinate.east());
            this.reveal(coordinate.west());
            this.reveal(coordinate.north().east());
            this.reveal(coordinate.north().west());
            this.reveal(coordinate.south().east());
            this.reveal(coordinate.south().west());
        }
    };

    /**
     * get value a cell
     * return value of the cell if it has been revealed
     * return false if not
     * @param coordinate
     * @returns {*}
     */
    this.getCellValue = (coordinate) => {
        if (this.revealed.indexOf(coordinate.getId()) > -1) {
            return this.getValue(coordinate);
        }
        else {
            return false;
        }
    };

    /**
     * test if the game is over
     */
    this.isWin = () => {
        let cellNumber = this.grid.length * this.grid.length;
        return (cellNumber - this.revealed.length) == this.bombNumber;
    };

    this.setGrid = (gridBuilder) => {
        this.grid = gridBuilder.build();
        this.bombNumber = gridBuilder.bombCells.length;
    }
}


//for test purpose.
//do not care about this, newbie
try {
    //stop watching, I said DO NOT CARE
    module.exports = Demineur;
}
catch (e) {
    //nothing to do here
}