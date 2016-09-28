/**
 * Created by jonathan on 27/09/16.
 */


angular.module('deManuMineur', ['ngMaterial'])
    .controller('deManuMineurController', [

        '$scope',
        '$mdDialog',
        function ($scope,$mdDialog) {
            let Ctrl = this;

            //that's all
            Ctrl.demineur = new Demineur();

            $scope.$watch('Ctrl.demineur.gameOver', (newVal) => {
                if (!newVal) {
                    return;
                }

                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('Game Over')
                    .textContent('You\'re such a noob, but I give you another chance...')
                    .ariaLabel('Lucky day')
                    .ok('Please let me try again')
                    .cancel('I better go back to learn how to be a good JavaScript Developper');

                $mdDialog.show(confirm).then(function() {
                    Ctrl.demineur = new Demineur();
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

            //build an array of coordinate (for ng-repeat)
            Ctrl.coordinates = [];
            for (let i = 0; i < Ctrl.demineur.grid.length; i++) {

                Ctrl.coordinates.push([]);

                for (let j = 0; j < Ctrl.demineur.grid[i].length; j++) {
                    Ctrl.coordinates[i].push({x:j,y:i});
                }
            }
        }
    ]);