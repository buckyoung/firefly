var FFExamples = FFExamples || {};

FFExamples.forestFire = {};

FFExamples.forestFire.initialize = function(FF) {
    var treeProb = .0006;
    var fireProb = .00001;

    initializeModel(FF);

    function initializeModel(FF) {
        FF.registerState('tree', [100, 200, 100], processTree);
        FF.registerState('fire', [255, 70, 70], processFire);
        FF.registerState('empty', [40, 40, 40], processEmpty);

        FF.initialize(initializeWorld(FF));
    }

    function processTree(currentCell, nextCell) {
        var burningNeighborCount = currentCell.countMooreNeighbors('fire');

        if (burningNeighborCount > 0) {
            nextCell.setState('fire');
            return;
        }

        if (Math.random() <= fireProb) {
            nextCell.setState('fire');
            return;
        }

        nextCell.setState('tree');
    }

    function processFire(currentCell, nextCell) {
        nextCell.setState('empty');
    }

    function processEmpty(currentCell, nextCell) {
        if (Math.random() <= treeProb) {
            nextCell.setState('tree');
            return;
        }

        nextCell.setState('empty');
    }

    function initializeWorld(FF) {
        return function(world, width, height) {
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    world[i][j] = new FF.Cell('empty', i, j); 
                }
            }
        };
    }
};