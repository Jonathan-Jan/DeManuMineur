/**
 * Created by jonathan on 28/09/16.
 */

"use strict";

const DemineurGridBuilder = require('../DemineurGridBuilder');

const assert = require('assert');

describe('DemineurGridBuilder', function() {

    describe('#new()', function () {

        it('should return a gridBuilder with no bomb', function () {
            let gridBuilder = new DemineurGridBuilder(5,0);
            assert.equal(0, gridBuilder.bombCells.length);
        });

        it('should return a grid with one bomb', function () {
            let gridBuilder = new DemineurGridBuilder(5,1);
            assert.equal(1, gridBuilder.bombCells.length);

            let bombCell = gridBuilder.bombCells[0];

            let grid = gridBuilder.build();

            let x = bombCell.coordinate.x;
            let y = bombCell.coordinate.y;

            assert.equal(-1, grid[y][x]);

            let neightbors = [];

            neightbors.push({
                    x:bombCell.coordinate.north().x,
                    y:bombCell.coordinate.north().y
                });
            neightbors.push({
                    x:bombCell.coordinate.south().x,
                    y:bombCell.coordinate.south().y
                });
            neightbors.push({
                    x:bombCell.coordinate.east().x,
                    y:bombCell.coordinate.east().y
                });
            neightbors.push({
                    x:bombCell.coordinate.west().x,
                    y:bombCell.coordinate.west().y
                });
            neightbors.push({
                    x:bombCell.coordinate.north().east().x,
                    y:bombCell.coordinate.north().east().y
                });
            neightbors.push({
                    x:bombCell.coordinate.north().west().x,
                    y:bombCell.coordinate.north().west().y
                });
            neightbors.push({
                    x:bombCell.coordinate.south().east().x,
                    y:bombCell.coordinate.south().east().y
                });
            neightbors.push({
                    x:bombCell.coordinate.south().west().x,
                    y:bombCell.coordinate.south().west().y
                }
            );

            neightbors.forEach(n => {
                if (n.x !== x && n.y !== y) {
                    assert.notEqual(0, grid[y][x]);
                }
            });
        });
    })
});