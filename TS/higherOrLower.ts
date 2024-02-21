interface HigherOrLowerObject {
    id: number;
    name: string;
    data: string;
    image: string;
}

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

    private init() {
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

        window.addEventListener('load', () => {
            this.fetchJSONFile('/otherFiles/composers.json', this.handleComposerData.bind(this));
            this.fetchJSONFile('/otherFiles/historicalevents.json', this.handleHistoricalEventData.bind(this));
        });
    }

    private fetchJSONFile(url: string, callback: (fetchedData: HigherOrLowerObject[]) => void): any {
        fetch(url)
            .then(response => response.json())
            .then(fetchedData => {
                callback(fetchedData);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    private handleComposerData(fetchedData: HigherOrLowerObject[]) {
        this.composersData = fetchedData;
    }

    private handleHistoricalEventData(fetchedData: HigherOrLowerObject[]) {
        this.historicalEventsData = fetchedData;
        this.setInitialGameState(fetchedData);
    }

    private setInitialGameState(fetchedData: HigherOrLowerObject[] | undefined): any {
        this.objectData = fetchedData;
        if (this.composersData != null) {
            this.amountOfObjects = this.composersData.length;
            this.main();
        }
    }

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

    private main() {
        const randomNumbers = this.giveRandomNumbers();

        if (randomNumbers) {
            this.randomObjectData = this.getObjectData(randomNumbers[0], randomNumbers[1]);
            if (this.randomObjectData) {
                this.displayObjects(this.randomObjectData[0], this.randomObjectData[1]);
            }
        }
    }

    private guessEerder() {
        if (this.randomObjectData != null && this.randomObjectData[0].data > this.randomObjectData[1].data) {
            this.rightGuess();
        } else {
            this.wrongGuess();
        }
    }

    private guessLater() {
        if (this.randomObjectData && this.randomObjectData[0] && this.randomObjectData[1] != null && this.randomObjectData[0].data < this.randomObjectData[1].data) {
            this.rightGuess();
        } else {
            this.wrongGuess();
        }
    }

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

    private updateScoreRightGuess() {
        if (this.scoreElement) {
            this.score = this.score + 1;
            this.scoreElement.innerText = 'SCORE: ' + this.score;
        }
    }

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

    private resetScore() {
        if (this.scoreElement) {
            this.score = 0;
            this.scoreElement.innerText = 'SCORE: 0';
        }
    }

    private giveRandomNumbers(): number[] | undefined {
        let objectId1: number;
        let objectId2: number;

        do {
            objectId1 = this.generateRandomNumber();
            objectId2 = this.generateRandomNumber();

            if (objectId1 === objectId2) {
                console.log(objectId1, objectId2 + " Numbers are the same, rerolling");
            } else {
                console.log(objectId1, objectId2);
                return [objectId1, objectId2];
            }
        } while (true);
    }

    private generateRandomNumber(): number {
        return Math.floor(Math.random() * this.amountOfObjects);
    }

    private getObjectData(objectID1: number, objectID2: number): HigherOrLowerObject[] | undefined {
        if (this.objectData) {
            const object1 = this.objectData.find(object => object.id === objectID1);
            const object2 = this.objectData.find(object => object.id === objectID2);
            return [object1, object2].filter(HigherOrLowerObject => HigherOrLowerObject !== undefined) as HigherOrLowerObject[];
        }
    }

    private displayObjects(object1: HigherOrLowerObject | undefined, object2: HigherOrLowerObject | undefined) {
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

    private countdownAndExecute(callback: () => void): void {
        let secondsRemaining = 0.5;

        this.guessEerderButton.disabled = true;
        this.guessLaterButton.disabled = true;

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

new SoonerOrLaterGame();

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
