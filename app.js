/**
 * Created by jonathan on 27/09/16.
 */


angular.module('deManuMineur', ['ngMaterial'])
    .controller('deManuMineurController', [

        '$scope',
        '$mdDialog',
        function ($scope,$mdDialog) {
            let Ctrl = this;

            /**
             * Called when onGameOver event is thrown by Demineur
             * @param newVal
             */
            let onGameOver = () => {
                var confirm = $mdDialog.confirm()
                    .title('Game Over')
                    .textContent('You\'re such a noob, but I give you another chance...')
                    .ariaLabel('Lucky day')
                    .ok('Please let me try again')
                    .cancel('I better go back to learn how to be a good JavaScript Developper');

                $mdDialog.show(confirm).then(function() {
                    Ctrl.new(Ctrl.size,Ctrl.mineNumber);
                }, function() {

                });
            };

            let onWin = () => {
                var confirm = $mdDialog.confirm()
                    .title('You win')
                    .textContent('You win')
                    .ariaLabel('Lucky day')
                    .ok('Please let me try again')
                    .cancel('I better go back to learn how to be a good JavaScript Developper');

                $mdDialog.show(confirm).then(function() {
                    Ctrl.new(Ctrl.size,Ctrl.mineNumber);
                }, function() {

                });
            };

            //wrapping some demineur function
            Ctrl.getValue = (cell) => {
                return Ctrl.demineur.getCellValue(Ctrl.demineur.buildBoundedCoordinate(cell.x, cell.y))
            };

            /**
             * get css class according to cell state
             * @param cell
             * @returns {*}
             */
            Ctrl.getClass = (cell) => {
                if (Ctrl.getValue(cell) === false) {
                    return 'hiddenCell';
                }
                if (Ctrl.getValue(cell) === -1) {
                    return 'bombCell';
                }
                return "cell";
            };

            /**
             * New game
             * @param size
             * @param mineNumber
             */
            Ctrl.new = (size, mineNumber) => {

                Ctrl.mineNumber = mineNumber;
                Ctrl.size = size;

                Ctrl.demineur = new Demineur();

                let gridBuilder = new DemineurGridBuilder(size,mineNumber);
                Ctrl.demineur.setGrid(gridBuilder);
                Ctrl.coordinates = Coordinate.helperGridCoordinate(size);

                Ctrl.demineur.onGameOver = onGameOver;
                Ctrl.demineur.onWin = onWin;
            };
            Ctrl.new(5,3);
        }
    ]);