interface HigherOrLowerObject {
    id: number;
    name: string;
    data: string;
    image: string;
}

/**
 * @typedef {Object} HigherOrLowerObject
 * @property {number} id - Unique identifier for the object.
 * @property {string} name - Name of the object.
 * @property {string} data - The data associated with the object (e.g., year, date).
 * @property {string} image - URL to the image associated with the object.
 */

/**
 * Represents the main game logic for the Sooner or Later Game.
 * @class
 */
class SoonerOrLaterGame {
    private objectData: HigherOrLowerObject[] | undefined;
    private composersData: HigherOrLowerObject[];
    private historicalEventsData: HigherOrLowerObject[];

    private composersButton: HTMLInputElement;
    private historicalEventsButton: HTMLInputElement;
    private readonly imageRight: HTMLElement | null;
    private readonly guessEerderButton: HTMLButtonElement;
    private readonly guessLaterButton: HTMLButtonElement;
    private readonly scoreElement: HTMLElement;

    private amountOfObjects: number;
    private randomObjectData: HigherOrLowerObject[] | undefined;

    private score: number;

    /**
     * Initializes a new instance of the SoonerOrLaterGame class.
     * Sets up event listeners and fetches initial data.
     */
    constructor() {
        this.composersData = [];
        this.historicalEventsData = [];
        this.amountOfObjects = 0;
        this.score = 0;

        this.composersButton = document.getElementById("composersRadio") as HTMLInputElement;
        this.historicalEventsButton = document.getElementById("historicalEventsRadio") as HTMLInputElement;
        this.imageRight = document.getElementById('composerImage2');
        this.guessEerderButton = document.getElementById('guessEerder') as HTMLButtonElement;
        this.guessLaterButton = document.getElementById('guessLater') as HTMLButtonElement;
        this.scoreElement = document.getElementById('score') as HTMLElement;

        this.init();
    }

    /**
     * Initializes the game by setting up event listeners and fetching initial data.
     * @private
     */
    private async init() {
        this.composersButton.addEventListener("click", () => {
            this.switchData(this.composersData);
        });

        this.historicalEventsButton.addEventListener("click", () => {
            this.switchData(this.historicalEventsData);
        });

        if (this.guessEerderButton) {
            this.guessEerderButton.addEventListener('click', this.guessEerder.bind(this));
        }

        if (this.guessLaterButton) {
            this.guessLaterButton.addEventListener('click', this.guessLater.bind(this));
        }

        await this.fetchJSONFile('/otherFiles/composers.json', this.handleComposerData.bind(this));
        await this.fetchJSONFile('/otherFiles/historicalevents.json', this.handleHistoricalEventData.bind(this));
    }

    /**
     * Fetches a JSON file and executes a callback function with the fetched data.
     * @private
     * @param {string} url - The URL of the JSON file to fetch.
     * @param {(fetchedData: HigherOrLowerObject[]) => void} callback - The callback function to execute with the fetched data.
     */
    private async fetchJSONFile(url: string, callback: (fetchedData: HigherOrLowerObject[]) => void) {
        await fetch(url)
            .then(response => response.json())
            .then(fetchedData => {
                callback(fetchedData);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    /**
     * Handles the composer data once it's fetched by storing it in the class.
     * @private
     * @param {HigherOrLowerObject[]} fetchedData - The fetched composer data.
     */
    private handleComposerData(fetchedData: HigherOrLowerObject[]) {
        this.composersData = fetchedData;
    }

    /**
     * Handles the historical event data once it's fetched and sets the initial game state.
     * @private
     * @param {HigherOrLowerObject[]} fetchedData - The fetched historical event data.
     */
    private handleHistoricalEventData(fetchedData: HigherOrLowerObject[]) {
        this.historicalEventsData = fetchedData;
        this.setInitialGameState(fetchedData);
    }

    /**
     * Sets the initial game state using the provided data.
     * @private
     * @param {HigherOrLowerObject[] | undefined} fetchedData - The initial data to set the game state with.
     * @returns {void}
     */
    private setInitialGameState(fetchedData: HigherOrLowerObject[] | undefined): void {
        this.objectData = fetchedData;
        if (this.composersData.length > 0) {
            this.amountOfObjects = this.composersData.length;
            this.main();
        } else {
            console.log('data is empty')
        }
    }

    /**
     * Switches the current data to a new set and resets the score if confirmed.
     * @private
     * @param {HigherOrLowerObject[]} newData - The new data to switch to.
     */
    private switchData(newData: HigherOrLowerObject[]) {
        const confirmation: boolean = window.confirm('Warning: if you switch, your score will reset. Do you want to proceed?');

        if (confirmation) {
            this.objectData = newData;
            this.amountOfObjects = newData.length;
            this.resetScore();
            this.main();
        } else {
            this.composersButton.checked = this.objectData === this.composersData;
            this.historicalEventsButton.checked = this.objectData === this.historicalEventsData;
        }
    }

    /**
     * The main game logic for selecting random objects and displaying them.
     * @private
     */
    private main() {
        const randomNumbers = this.giveRandomNumbers();

        if (randomNumbers) {
            this.randomObjectData = this.getObjectData(randomNumbers[0], randomNumbers[1]);
            if (this.randomObjectData) {
                this.loadObjects(this.randomObjectData[0], this.randomObjectData[1]);
            }
        }
    }

    /**
     * Handles the logic for guessing if the first object occurred earlier.
     * @private
     */
    private guessEerder() {
        if (this.randomObjectData && this.randomObjectData[0].data > this.randomObjectData[1].data) {
            this.rightGuess();
        } else {
            this.wrongGuess();
        }
    }

    /**
     * Handles the logic for guessing if the first object occurred later.
     * @private
     */
    private guessLater() {
        if (this.randomObjectData && this.randomObjectData[0] && this.randomObjectData[1] != null && this.randomObjectData[0].data < this.randomObjectData[1].data) {
            this.rightGuess();
        } else {
            this.wrongGuess();
        }
    }

    /**
     * Handles the logic for a correct guess.
     * @private
     */
    private rightGuess() {
        if (this.imageRight) {
            this.imageRight.classList.add('borderWin');
            this.updateScoreRightGuess();
            this.countdownAndExecute(() => {
                if (this.imageRight) {
                    this.imageRight.classList.remove('borderWin');
                    this.main();
                }
            });
        }
    }

    /**
     * Updates the score for a correct guess.
     * @private
     */
    private updateScoreRightGuess() {
        if (this.scoreElement) {
            this.score = this.score + 1;
            this.scoreElement.innerText = 'SCORE: ' + this.score;
        }
    }

    /**
     * Handles the logic for an incorrect guess.
     * @private
     */
    private wrongGuess() {
        if (this.imageRight) {
            this.resetScore();
            this.imageRight.classList.add('borderLose');
            this.countdownAndExecute(() => {
                if (this.imageRight) {
                    this.imageRight.classList.remove('borderLose');
                    this.main();
                }
            });
        }
    }

    /**
     * Resets the score to 0.
     * @private
     */
    private resetScore() {
        if (this.scoreElement) {
            this.score = 0;
            this.scoreElement.innerText = 'SCORE: 0';
        }
    }

    /**
     * Generates two unique random numbers to select objects.
     * @private
     * @returns {number[] | undefined} An array of two unique random numbers or undefined if it fails.
     */
    private giveRandomNumbers(): number[] | undefined {
        let objectId1: number;
        let objectId2: number;
        let attempts = 0;
        const maxAttempts = 100;

        do {
            if (attempts >= maxAttempts) {
                console.log("Exceeded maximum attempts. Unable to generate unique numbers.");
                return undefined;
            }

            objectId1 = this.generateRandomNumber();
            objectId2 = this.generateRandomNumber();

            if (objectId1 === objectId2) {
                console.log(objectId1.toString() + objectId2.toString() + " Numbers are the same, rerolling");
            } else {
                console.log(objectId1, objectId2);
                return [objectId1, objectId2];
            }

            attempts++;
        } while (true);
    }

    /**
     * Generates a random number based on the amount of objects available.
     * @private
     * @returns {number} A random number.
     */
    private generateRandomNumber(): number {
        return Math.floor(Math.random() * this.amountOfObjects);
    }

    /**
     * Retrieves object data based on the provided IDs.
     * @private
     * @param {number} objectID1 - The ID of the first object.
     * @param {number} objectID2 - The ID of the second object.
     * @returns {HigherOrLowerObject[] | undefined} An array of the selected objects' data or undefined.
     */
    private getObjectData(objectID1: number, objectID2: number): HigherOrLowerObject[] | undefined {
        if (this.objectData) {
            const object1 = this.objectData.find(object => object.id === objectID1);
            const object2 = this.objectData.find(object => object.id === objectID2);
            return [object1, object2].filter(HigherOrLowerObject => HigherOrLowerObject !== undefined) as HigherOrLowerObject[];
        }
    }

    /**
     * Loads the objects' images and descriptions onto the page.
     * @private
     * @param {HigherOrLowerObject} object1 - The first object.
     * @param {HigherOrLowerObject} object2 - The second object.
     */
    private loadObjects(object1: HigherOrLowerObject, object2: HigherOrLowerObject) {
        const image1 = object1.image;
        const image2 = object2.image;
        const imageElementObject1 = document.getElementById('composerImage1') as HTMLImageElement;
        const imageElementObject2 = document.getElementById('composerImage2') as HTMLImageElement;
        const descriptionElementObject1 = document.getElementById('composerDescription1') as HTMLElement;
        const descriptionElementObject2 = document.getElementById('composerDescription2') as HTMLElement;
        const loaderElement = document.getElementById('loader1') as HTMLElement;

        imageElementObject1.style.opacity = '0.5';
        imageElementObject2.style.opacity = '0.5';

        this.displayObjects(object1, object2, image1, image2, imageElementObject1, imageElementObject2, descriptionElementObject1, descriptionElementObject2, loaderElement);
    }

    /**
     * Displays the objects' images and descriptions on the page.
     * @private
     * @param {HigherOrLowerObject} object1 - The first object.
     * @param {HigherOrLowerObject} object2 - The second object.
     * @param {string} image1 - The URL of the first object's image.
     * @param {string} image2 - The URL of the second object's image.
     * @param {HTMLImageElement} imageElementObject1 - The first image element on the page.
     * @param {HTMLImageElement} imageElementObject2 - The second image element on the page.
     * @param {HTMLElement} descriptionElementObject1 - The first description element on the page.
     * @param {HTMLElement} descriptionElementObject2 - The second description element on the page.
     * @param {HTMLElement} loaderElement - The loader element on the page.
     */
    private displayObjects(object1: HigherOrLowerObject, object2: HigherOrLowerObject, image1: string, image2: string, imageElementObject1: HTMLImageElement, imageElementObject2: HTMLImageElement, descriptionElementObject1: HTMLElement, descriptionElementObject2: HTMLElement, loaderElement: HTMLElement) {
        imageElementObject1.onload = () => {
            imageElementObject1.style.opacity = '1';
        };
        imageElementObject1.src = object1.image;
        descriptionElementObject1.innerText = object1.name;

        imageElementObject2.onload = () => {
            imageElementObject2.style.opacity = '1';
        };
        imageElementObject2.src = image2;
        descriptionElementObject2.innerText = object2.name;

        loaderElement.classList.remove('loader');
    }

    /**
     * Disables the buttons, adds a countdown, and then executes a callback function.
     * @private
     * @param {() => void} callback - The callback function to execute after the countdown.
     */
    private countdownAndExecute(callback: () => void): void {
        const loaderElement = document.getElementById('loader1') as HTMLElement;
        let secondsRemaining = 0.5;

        this.guessEerderButton.disabled = true;
        this.guessLaterButton.disabled = true;
        loaderElement.classList.add('loader');

        const countdownInterval = setInterval(() => {
            secondsRemaining--;

            if (secondsRemaining < 0) {
                clearInterval(countdownInterval);
                this.guessEerderButton.disabled = false;
                this.guessLaterButton.disabled = false;
                callback(); // Execute the provided callback after the given amount of seconds
            }
        }, 1000); // Update every 1 second
    }
}

/** Initialize the IntersectionObserver to handle animations on scroll */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // entry.target.classList.remove('show');
        }
    });
});

/** Observe all elements with the 'hidden' class for the IntersectionObserver */
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/** Start a new instance of the SoonerOrLaterGame */
new SoonerOrLaterGame();
