export default class ErrorGraph {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.padding = 10;

        this.totalResults = 0;
        this.errorResults = 0;
        this.errorRates = [];

        this.draw();
    }

    addResult(output, desiredOutput) {
        
        ++this.totalResults;
        if(output != desiredOutput) {
            ++this.errorResults;
        }

        this.errorRates[this.totalResults - 1] = this.errorResults / this.totalResults * 100;
        
        requestAnimationFrame(this.draw.bind(this));
    }
    
    draw() {
        this.ctx.fillStyle = '#111111';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = '#f3f3f3';
        this.ctx.beginPath();
        
        this.ctx.moveTo(
            0 + this.padding / 2,
            this.padding/2 + (this.errorRates[0] / 100) * (this.canvas.height - this.padding));
            
        for(let i = 0; i < this.totalResults; ++i) {
            this.ctx.lineTo(
                this.padding + ((this.canvas.width - this.padding) / this.totalResults) * i,
                this.padding /2 + this.errorRates[i] / 100 * (this.canvas.height - this.padding));
        }
        this.ctx.stroke();
    }
}