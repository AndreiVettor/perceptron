import Scenario from './Scenario.js';

const CIRCLE_RAD = 5;
const MARGIN = 20;

export default class PlaneCmp extends Scenario {
    
    constructor(perceptron, dataCount, mainCanvas, errorCanvas, step) {
        super(perceptron, dataCount, mainCanvas, errorCanvas, step);

        this.points = [];
        this.line = {
            a: 1,
            b: 1
        };

        this.generateLine();
        this.generatePoints(this.dataCount, this.mainCanvas.width, this.mainCanvas.height);
    }

    run() {
        super.run();

        requestAnimationFrame(this.draw.bind(this));
    }

    update() {
        super.update();


    }

    draw() {
        super.draw();

        // Draw background
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

        // Draw points
        for (let i = 0; i < this.points.length; ++i) {
            this.ctx.fillStyle = this.points[i].label == 'over' ? 'red' : 'yellow';
            this.ctx.beginPath();
            this.ctx.arc(this.points[i].x, this.points[i].y, CIRCLE_RAD, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fill();
        }

        // Draw line
        this.ctx.strokeStyle = 'white';
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.line.b);
        this.ctx.lineTo(this.mainCanvas.width, this.mainCanvas.width * this.line.a + this.line.b);
        this.ctx.stroke();

        // requestAnimationFrame(this.draw.bind(this));
    }

    /** Generates points in an area defined by width, height and a margin */
    generatePoints(number, width, height) {
        for (let i = 0; i < number; ++i) {
            let x = Math.ceil(Math.random() * (width - MARGIN)) + MARGIN / 2;
            let y = Math.ceil(Math.random() * (height - MARGIN)) + MARGIN / 2;

            let label;
            if(y > this.line.a * x + this.line.b) {
                label = 'over';
            } else {
                label = 'under';
            }

            this.points[i] = {
                x: x,
                y: y,
                label: label
            }
        }
    }

    generateLine() {
        this.line.a = (Math.random() - 0.5) * 2;
        this.line.b = this.mainCanvas.height/2 + (Math.random() - 0.5) * this.mainCanvas.height/2;
    }
}


