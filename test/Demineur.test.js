/**
 * Created by jonathan on 27/09/16.
 */

"use strict";

const assert = require('assert');

const Demineur = require('../Demineur');
const Coordinate = require('../Coordinate');


describe('Coordinate', function() {

    describe('#north(), #south(), #east(), #west()', function () {

        it('should return coordinate of its neighbors', function () {
            let coordinate = new Coordinate(1, 1, 4, 4);

            let north = coordinate.north();
            assert.equal(1, north.x);
            assert.equal(0, north.y);

            let south = coordinate.south();
            assert.equal(1, south.x);
            assert.equal(2, south.y);

            let east = coordinate.east();
            assert.equal(2, east.x);
            assert.equal(1, east.y);

            let west = coordinate.west();
            assert.equal(0, west.x);
            assert.equal(1, west.y);
        });
    })
});
/**
 * Demineur test
 */
describe('Demineur', function() {

    describe('#show()', function () {
        it('should return false on an hidden cell', function () {

            let demineur = new Demineur();

            let coordinate = new Coordinate(0, 0, demineur.grid.length-1, demineur.grid[0].length-1);

            assert.equal(false, demineur.getCellValue(coordinate));
        });
    });

    describe('#reveal()', function () {

        it('should reveal the given square and its neighbors', function () {

            let demineur = new Demineur();

            let coordinate = new Coordinate(0, 0, demineur.grid.length-1, demineur.grid[0].length-1);

            demineur.reveal(coordinate);

            assert.equal(0,     demineur.getCellValue(coordinate));
            assert.equal(1,     demineur.getCellValue(coordinate.east()));
            assert.equal(false, demineur.getCellValue(coordinate.east().east())); //hidden cell

            assert.equal(10,    demineur.revealed.length); //10 cell has been revealed
        });

        it('should reveal the given square and its neighbors', function () {

            let demineur = new Demineur();

            let coordinate = new Coordinate(4, 0, demineur.grid.length-1, demineur.grid[0].length-1);

            demineur.reveal(coordinate);

            assert.equal(10,    demineur.revealed.length); //10 cell has been revealed
        });

    });

    describe('#click()', function () {

        let demineur = new Demineur();

        demineur.click(1,1);

        assert(demineur.revealed.indexOf('1.1') > -1);
    });

    describe('#click()', function () {

        let demineur = new Demineur();

        demineur.click(0,0);

        assert(10,demineur.revealed.length);
    });

    describe('#click()', function () {

        let demineur = new Demineur();

        demineur.click(4,0);

        assert(10,demineur.revealed.length);
    });
});