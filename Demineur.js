/**
 * Created by jonathan on 27/09/16.
 */

"use strict";

try {
    let Coordinate = require('./Coordinate');
}
catch (e) {
    let Coordinate = window.Coordinate;
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

    this.gameOver = false;

    /**
     * a player click on the game
     * @param x
     * @param y
     */
    this.click = (x,y) => {

        if (this.gameOver) {
            return;
        }

        let coordinate = this.buildBoundedCoordinate(x,y);

        //gameOver became true if the user clicked on a bomb
        this.gameOver = this.getValue(coordinate) === -1;

        //reveal this cell, and maybe is neighbor
        this.reveal(coordinate);
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

    //list of coordinaite of revealed Cell
    this.revealed = [];

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