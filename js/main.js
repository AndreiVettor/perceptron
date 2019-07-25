import Perceptron from './Perceptron.js';
import PlaneCmp from './scenarios/PlaneCmp.js';
import ValueCmp from './scenarios/ValueCmp.js';

const CURRENT_SCENARIO = 1;

const mainCanvas = document.getElementById('main-canvas');
const errorCanvas = document.getElementById('error-canvas');

const toggleButton = document.getElementById('btn-toggle-scenario');
const resetButton = document.getElementById('btn-reset-scenario');

const stepSlider = document.getElementById('sld-scenario-step');
const stepText = document.getElementById('txt-scenario-step');

const dataSlider = document.getElementById('sld-scenario-data');
const dataText = document.getElementById('txt-scenario-data');

let scenarioRunning = 0;


// Event Handlers
toggleButton.addEventListener("click", toggleButtonHandler, false);
resetButton.addEventListener("click", resetButtonHandler, false);

stepSlider.addEventListener("input", function() {
    stepText.value = stepSlider.value;
}, false);

dataSlider.addEventListener("input", function() {
    dataText.value = dataSlider.value;
}, false);


// Create perceptron
let p;
let scenario;
init();

// Draw background
mainCanvas.getContext('2d').fillStyle = '#111111';
mainCanvas.getContext('2d').fillRect(0, 0, mainCanvas.width, mainCanvas.height);

errorCanvas.getContext('2d').fillStyle = '#111111';
errorCanvas.getContext('2d').fillRect(0, 0, errorCanvas.width, errorCanvas.height);
errorCanvas.getContext('2d').transform(1, 0, 0, -1, 0, errorCanvas.height)


function stopScenario() {
    scenario.stop();
}

function resetScenario() {
    scenario.reset();
}

function init() {
    p = new Perceptron(1, false);
    scenario = new ValueCmp(p, dataSlider.value, mainCanvas, errorCanvas, stepSlider.value);
}

async function runScenario(scenarioNumber = CURRENT_SCENARIO) {
    scenarioRunning = 1;
    await scenario.run(stepSlider.value, dataSlider.value);
    
    toggleButton.innerText = "Run Scenario";
    scenarioRunning = 0;
}

function toggleButtonHandler() {
    if(scenarioRunning) {
        stopScenario();
        toggleButton.innerText = "Run Scenario";
        scenarioRunning = 0;
    } else {
        runScenario();
        toggleButton.innerText = "Stop Scenario";
        scenarioRunning = 1;
    }
}

function resetButtonHandler() {
    resetScenario();
}