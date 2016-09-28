/**
 * Created by jonathan on 28/09/16.
 */

"use strict";

const DemineurGridBuilder = require('../DemineurGridBuilder');

const assert = require('assert');

describe('DemineurGridBuilder', function() {

    describe('#new()', function () {

        it('should return a grid', function () {
            let gridBuilder = new DemineurGridBuilder(5,1);
            assert(gridBuilder);
            let grid = gridBuilder.build();
            assert(grid);
        });
    })
});