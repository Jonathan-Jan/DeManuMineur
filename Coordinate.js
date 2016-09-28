/**
 * Created by jonathan on 28/09/16.
 */

/**
 * Coordinate of a "Demineur" cell
 * @param x
 * @param y
 * @param maxX
 * @param maxY
 * @constructor
 */
function Coordinate(x,y, maxX, maxY) {

    this.x = x;
    this.y = y;

    /**
     * Ensure that x and y are valid value
     */
    this.x = this.x < 0 ? 0 : this.x;
    this.x = this.x > maxX ? maxX : this.x;

    this.y = this.y < 0 ? 0 : this.y;
    this.y = this.y > maxY ? maxY : this.y;

    /**
     * north coordinate
     */
    this.north = () => {
        return new Coordinate(this.x,this.y-1, maxX, maxY);
    };

    /**
     * south coordinate
     */
    this.south = () => {
        return new Coordinate(this.x,this.y+1, maxX, maxY);
    };

    /**
     * east coordinate
     */
    this.east = () => {
        return new Coordinate(this.x+1,this.y, maxX, maxY);
    };

    /**
     * west coordinate
     */
    this.west = () => {
        return new Coordinate(this.x-1,this.y, maxX, maxY);
    };

    this.getId = () => {
        return `${this.x}.${this.y}`;
    }
}

//for test purpose.
//do not care about this, newbie
try {
    //stop watching, I said DO NOT CARE
    module.exports = Coordinate;
}
catch (e) {
    //nothing to do here
}