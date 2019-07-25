export default class Perceptron {

    constructor(size = 1, hasBias = false) {
        if(size <= 0) {
            console.log('Size of perceptron has to be 1 or bigger');
            return undefined;
        }
        this.size = size;
        this.weights = [];
        this.hasBias = hasBias;

        this.initializeWeights();
    }

    initializeWeights() {
        if(this.hasBias) {
            // Set bias to 1
            this.setWeight(0, 1);
        }

        let i = (this.hasBias ? 1 : 0);
        for (; i < this.size; ++i) {
            // Set all weights between -1 and 1
            this.setWeight(i, Math.random() * 2 - 1);
        }
    }

    updateWeights(inputs, output, desiredOutput) {
        for (let i = 0; i < this.size; ++i) {
            this.weights[i] = this.weights[i] + (desiredOutput - output) * inputs[i];
        }
    }

    setWeight(index, value) {
        this.weights[index] = value;
        console.log(`Weight #${index}: ${this.weights[index]}`);
    }

    work(inputs, desiredOutput) {
        // TODO: Handle variable input dynamically
        // (add, remove weights based on frequency of use)

        // Return if inputs size different than perceptron size
        if (inputs.length != this.size) {
            console.log('Input cannot be handled by this perceptron');
            console.log(`Perceptron size: ${this.size}. Input size: ${inputs.length}.`);
            return;
        }

        // Sum the inputs * weights
        let sum = 0;
        for (let i = 0; i < this.size; ++i) {
            sum += this.weights[i] * inputs[i];
        }

        // Activation function
        let output;
        if (sum > 1) {
            output = 1;
        } else {
            output =  0;
        }

        if(desiredOutput != undefined) {
            this.updateWeights(inputs, output, desiredOutput);
        }        

        return output;
    }
}