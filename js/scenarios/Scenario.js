import ErrorGraph from '../ErrorGraph.js'

export default class Scenario {
    constructor(perceptron, dataCount, mainCanvas, errorCanvas, step) {
        this.perceptron = perceptron;
        this.dataCount = dataCount;
        this.mainCanvas = mainCanvas;
        this.errorCanvas = errorCanvas;
        this.ctx = mainCanvas.getContext('2d');
        this.step = step;
        this.running = false;
        this.trainIndex;

        this.errorGraph = new ErrorGraph(this.errorCanvas);
    }

    reset() {
        this.errorGraph = new ErrorGraph(this.errorCanvas);
    }

    async run(step, dataCount) {
        this.step = step;
        this.dataCount = dataCount;
        this.running = true;
    }

    stop() {
        this.running = false;
    }

    update() {

    }

    draw() {
        
    }
}