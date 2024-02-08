interface HigherOrLowerObject {
    id: number;
    name: string;
    data: string;
    image: string;
}

let objectData: HigherOrLowerObject[] | undefined;
let composersData: HigherOrLowerObject[];
let historicalEventsData: HigherOrLowerObject[];

const composersButton = document.getElementById("composersRadio") as HTMLInputElement;
const historicalEventsButton = document.getElementById("historicalEventsRadio") as HTMLInputElement;
const imageRight = document.getElementById('composerImage2');
const guessEerderButton = document.getElementById('guessEerder') as HTMLButtonElement;
const guessLaterButton = document.getElementById('guessLater') as HTMLButtonElement;
const scoreElement = document.getElementById('score');

let amountOfObjects: number;
let randomObjectData: HigherOrLowerObject[] | undefined;

let score = 0;

/* Event Listeners */

composersButton.addEventListener("click", function () {
    switchData(composersData);
});

historicalEventsButton.addEventListener("click", function () {
    switchData(historicalEventsData);
});

if (guessEerderButton) {
    guessEerderButton.addEventListener('click', guessEerder);
}

if (guessLaterButton) {
    guessLaterButton.addEventListener('click', guessLater);
}

/* Functions */

function fetchJSONFile(url: string, callback: (fetchedData: HigherOrLowerObject[]) => void): any {
    fetch(url)
        .then(response => response.json())
        .then(fetchedData => {
            callback(fetchedData);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function handleComposerData(fetchedData: HigherOrLowerObject[]) {
    composersData = fetchedData;
    setInitialGameState(fetchedData);
}

function handleHistoricalEventData(fetchedData: HigherOrLowerObject[]) {
    historicalEventsData = fetchedData;
}

function setInitialGameState(fetchedData: HigherOrLowerObject[] | undefined): any {
    objectData = fetchedData;
    if (composersData != null) {
        amountOfObjects = composersData.length;
        main();
    }
}

function switchData(newData: HigherOrLowerObject[]) {
    const confirmation: boolean = window.confirm('Warning: if you switch, your score will reset. Do you want to proceed?');

    if (confirmation) {
        objectData = newData;
        amountOfObjects = newData.length;
        resetScore();
        main();
    } else {
        composersButton.checked = objectData === composersData;
        historicalEventsButton.checked = objectData === historicalEventsData;
    }
}

function main() {
    const randomNumbers = giveRandomNumbers();

    if (randomNumbers) {
        randomObjectData = getObjectData(randomNumbers[0], randomNumbers[1]);
        if (randomObjectData) {
            displayObjects(randomObjectData[0], randomObjectData[1]);
        }
    }
}

function guessEerder() {
    if (randomObjectData != null && randomObjectData[0].data > randomObjectData[1].data) {
        rightGuess();
    } else {
        wrongGuess();
    }
}

function guessLater() {
    if (randomObjectData && randomObjectData[0] && randomObjectData[1] != null && randomObjectData[0].data < randomObjectData[1].data) {
        rightGuess();
    } else {
        wrongGuess();
    }
}

function rightGuess() {
    if (imageRight) {
        imageRight.classList.add('borderWin');
        updateScoreRightGuess();
        countdownAndExecute(() => {
            imageRight.classList.remove('borderWin');
            main();
        });
    }
}

function updateScoreRightGuess() {
    if (scoreElement) {
        score = score + 1;
        scoreElement.innerText = 'SCORE: ' + score;
    }
}

function wrongGuess() {
    if (imageRight) {
        resetScore();
        imageRight.classList.add('borderLose');
        countdownAndExecute(() => {
            imageRight.classList.remove('borderLose');
            main();
        });
    }
}

function resetScore() {
    if (scoreElement) {
        score = 0;
        scoreElement.innerText = 'SCORE: 0';
    }
}

function giveRandomNumbers(): number[] | undefined {
    let objectId1: number;
    let objectId2: number;

    do {
        objectId1 = generateRandomNumber();
        objectId2 = generateRandomNumber();

        if (objectId1 === objectId2) {
            console.log(objectId1, objectId2 + " Numbers are the same, rerolling");
        } else {
            console.log(objectId1, objectId2);
            return [objectId1, objectId2];
        }
    } while (true);
}

function generateRandomNumber(): number {
    return Math.floor(Math.random() * amountOfObjects);
}

function getObjectData(objectID1: number, objectID2: number): HigherOrLowerObject[] | undefined {
    if (objectData) {
        const object1 = objectData.find(object => object.id === objectID1);
        const object2 = objectData.find(object => object.id === objectID2);
        return [object1, object2].filter(HigherOrLowerObject => HigherOrLowerObject !== undefined) as HigherOrLowerObject[];
    }
}

function displayObjects(object1: HigherOrLowerObject | undefined, object2: HigherOrLowerObject | undefined) {
    const imageElementObject1 = document.getElementById('composerImage1') as HTMLImageElement | null;
    const imageElementObject2 = document.getElementById('composerImage2') as HTMLImageElement | null;
    const descriptionElementObject1 = document.getElementById('composerDescription1') as HTMLElement;
    const descriptionElementObject2 = document.getElementById('composerDescription2') as HTMLElement;

    if (object1 && imageElementObject1) {
        imageElementObject1.src = object1.image;
        descriptionElementObject1.innerText = object1.name;
    }

    if (object2 && imageElementObject2) {
        imageElementObject2.src = object2.image;
        descriptionElementObject2.innerText = object2.name;
    }
}

function countdownAndExecute(callback: () => void): void {
    let secondsRemaining = 1;

    guessEerderButton.disabled = true;
    guessLaterButton.disabled = true;

    const countdownInterval = setInterval(() => {
        secondsRemaining--;

        if (secondsRemaining < 0) {
            clearInterval(countdownInterval);
            guessEerderButton.disabled = false;
            guessLaterButton.disabled = false;
            callback(); // Execute the provided callback after 3 seconds
        }
    }, 1000); // Update every 1 second
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));

/* Initial Fetch */

window.addEventListener('load', () => {
    fetchJSONFile('/otherFiles/composers.json', handleComposerData);
    fetchJSONFile('/otherFiles/historicalevents.json', handleHistoricalEventData);
});
