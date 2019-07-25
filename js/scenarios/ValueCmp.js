import Scenario from './Scenario.js';

const CIRCLE_RAD = 5;
const MARGIN = 20;
const SEP_HEIGHT = 50;

export default class ValueCmp extends Scenario {

    constructor(perceptron, dataCount, mainCanvas, errorCanvas, step) {
        super(perceptron, dataCount, mainCanvas, errorCanvas, step);

        this.points = [];
        this.value;

        this.reset();
    }

    reset() {
        super.reset();

        this.points = [];
        this.generateValue();
        requestAnimationFrame(this.draw.bind(this));
    }

    async run(step, dataCount) {
        super.run(step, dataCount);
        
        for(this.trainIndex = 0; this.trainIndex < this.dataCount && this.running == true; ++this.trainIndex) {
            this.update(this.generatePoint(this.mainCanvas.width));
            await sleep(this.step);
        }
    }

    update(input) {
        super.update();

        let output = this.perceptron.work([input.value], [input.label]);
        this.errorGraph.addResult(output, input.label);
        console.log(`Error rate: ${this.errorGraph.errorRates[this.errorGraph.totalResults-1]}`);

        requestAnimationFrame(this.draw.bind(this));
    }

    draw() {
        super.draw();

        // Draw background
        this.ctx.fillStyle = '#111111';
        this.ctx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

        // Draw axis
        this.ctx.strokeStyle = 'white';
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.mainCanvas.height / 2);
        this.ctx.lineTo(this.mainCanvas.width, this.mainCanvas.height / 2);
        this.ctx.stroke();

        // Draw points
        for (let i = 0; i < this.points.length; ++i) {
            this.ctx.strokeStyle = this.points[i].label == 1 ? 'red' : 'yellow';
            this.ctx.beginPath();
            this.ctx.arc(this.points[i].value, this.mainCanvas.height / 2, CIRCLE_RAD, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        // Draw separator
        this.ctx.strokeStyle = 'white';
        this.ctx.beginPath();
        this.ctx.moveTo(this.value, this.mainCanvas.height / 2 - SEP_HEIGHT / 2);
        this.ctx.lineTo(this.value, this.mainCanvas.height / 2 + SEP_HEIGHT / 2);
        this.ctx.stroke();
    }

    /** Generates points in an area defined by width, height and a margin */
    generatePoint(width) {
        let x = Math.ceil(Math.random() * (width - MARGIN)) + MARGIN / 2;

        let label;
        if (x > this.value) {
            label = 1;
        } else {
            label = 0;
        }
        
        let point = {
            value: x,
            label: label
        };
        this.points[this.points.length] = point;
        return point;
    }

    generateValue() {
        this.value = 100 + Math.random() * (this.mainCanvas.width - 100);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }