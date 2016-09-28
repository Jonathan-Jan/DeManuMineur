/**
 * Created by jonathan on 27/09/16.
 */


angular.module('deManuMineur', ['ngMaterial'])
    .controller('deManuMineurController', [

        '$scope',
        '$mdDialog',
        function ($scope,$mdDialog) {
            let Ctrl = this;

            // watch for gameOver to became true
            $scope.$watch('Ctrl.demineur.gameOver', (newVal) => {
                if (!newVal) {
                    return;
                }

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
            });

            //wrapping some demineur function
            Ctrl.getValue = (cell) => {
                return Ctrl.demineur.getCellValue(Ctrl.demineur.buildBoundedCoordinate(cell.x, cell.y))
            };

            Ctrl.getClass = (cell) => {
                if (Ctrl.getValue(cell) === false) {
                    return 'hiddenCell';
                }
                if (Ctrl.getValue(cell) === -1) {
                    return 'bombCell';
                }
                return "cell";
            };

            Ctrl.new = (size, mineNumber) => {

                Ctrl.mineNumber = mineNumber;
                Ctrl.size = size;

                Ctrl.demineur = new Demineur();
                Ctrl.demineur.grid = new DemineurGridBuilder(size,mineNumber).build();
                Ctrl.coordinates = Coordinate.helperGridCoordinate(size);
            };
            Ctrl.new(5,3);
        }
    ]);