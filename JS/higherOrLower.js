"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var SoonerOrLaterGame = /** @class */ (function () {
    /**
     * Initializes a new instance of the SoonerOrLaterGame class.
     * Sets up event listeners and fetches initial data.
     */
    function SoonerOrLaterGame() {
        this.composersData = [];
        this.historicalEventsData = [];
        this.amountOfObjects = 0;
        this.score = 0;
        this.composersButton = document.getElementById("composersRadio");
        this.historicalEventsButton = document.getElementById("historicalEventsRadio");
        this.imageRight = document.getElementById('composerImage2');
        this.guessEerderButton = document.getElementById('guessEerder');
        this.guessLaterButton = document.getElementById('guessLater');
        this.scoreElement = document.getElementById('score');
        this.init();
    }
    /**
     * Initializes the game by setting up event listeners and fetching initial data.
     * @private
     */
    SoonerOrLaterGame.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.composersButton.addEventListener("click", function () {
                            _this.switchData(_this.composersData);
                        });
                        this.historicalEventsButton.addEventListener("click", function () {
                            _this.switchData(_this.historicalEventsData);
                        });
                        if (this.guessEerderButton) {
                            this.guessEerderButton.addEventListener('click', this.guessEerder.bind(this));
                        }
                        if (this.guessLaterButton) {
                            this.guessLaterButton.addEventListener('click', this.guessLater.bind(this));
                        }
                        return [4 /*yield*/, this.fetchJSONFile('/otherFiles/composers.json', this.handleComposerData.bind(this))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fetchJSONFile('/otherFiles/historicalevents.json', this.handleHistoricalEventData.bind(this))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches a JSON file and executes a callback function with the fetched data.
     * @private
     * @param {string} url - The URL of the JSON file to fetch.
     * @param {(fetchedData: HigherOrLowerObject[]) => void} callback - The callback function to execute with the fetched data.
     */
    SoonerOrLaterGame.prototype.fetchJSONFile = function (url, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)
                            .then(function (response) { return response.json(); })
                            .then(function (fetchedData) {
                            callback(fetchedData);
                        })
                            .catch(function (error) { return console.error('Error fetching JSON:', error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles the composer data once it's fetched by storing it in the class.
     * @private
     * @param {HigherOrLowerObject[]} fetchedData - The fetched composer data.
     */
    SoonerOrLaterGame.prototype.handleComposerData = function (fetchedData) {
        this.composersData = fetchedData;
    };
    /**
     * Handles the historical event data once it's fetched and sets the initial game state.
     * @private
     * @param {HigherOrLowerObject[]} fetchedData - The fetched historical event data.
     */
    SoonerOrLaterGame.prototype.handleHistoricalEventData = function (fetchedData) {
        this.historicalEventsData = fetchedData;
        this.setInitialGameState(fetchedData);
    };
    /**
     * Sets the initial game state using the provided data.
     * @private
     * @param {HigherOrLowerObject[] | undefined} fetchedData - The initial data to set the game state with.
     * @returns {void}
     */
    SoonerOrLaterGame.prototype.setInitialGameState = function (fetchedData) {
        this.objectData = fetchedData;
        if (this.composersData.length > 0) {
            this.amountOfObjects = this.composersData.length;
            this.main();
        }
        else {
            console.log('data is empty');
        }
    };
    /**
     * Switches the current data to a new set and resets the score if confirmed.
     * @private
     * @param {HigherOrLowerObject[]} newData - The new data to switch to.
     */
    SoonerOrLaterGame.prototype.switchData = function (newData) {
        var confirmation = window.confirm('Warning: if you switch, your score will reset. Do you want to proceed?');
        if (confirmation) {
            this.objectData = newData;
            this.amountOfObjects = newData.length;
            this.resetScore();
            this.main();
        }
        else {
            this.composersButton.checked = this.objectData === this.composersData;
            this.historicalEventsButton.checked = this.objectData === this.historicalEventsData;
        }
    };
    /**
     * The main game logic for selecting random objects and displaying them.
     * @private
     */
    SoonerOrLaterGame.prototype.main = function () {
        var randomNumbers = this.giveRandomNumbers();
        if (randomNumbers) {
            this.randomObjectData = this.getObjectData(randomNumbers[0], randomNumbers[1]);
            if (this.randomObjectData) {
                this.loadObjects(this.randomObjectData[0], this.randomObjectData[1]);
            }
        }
    };
    /**
     * Handles the logic for guessing if the first object occurred earlier.
     * @private
     */
    SoonerOrLaterGame.prototype.guessEerder = function () {
        if (this.randomObjectData && this.randomObjectData[0].data > this.randomObjectData[1].data) {
            this.rightGuess();
        }
        else {
            this.wrongGuess();
        }
    };
    /**
     * Handles the logic for guessing if the first object occurred later.
     * @private
     */
    SoonerOrLaterGame.prototype.guessLater = function () {
        if (this.randomObjectData && this.randomObjectData[0] && this.randomObjectData[1] != null && this.randomObjectData[0].data < this.randomObjectData[1].data) {
            this.rightGuess();
        }
        else {
            this.wrongGuess();
        }
    };
    /**
     * Handles the logic for a correct guess.
     * @private
     */
    SoonerOrLaterGame.prototype.rightGuess = function () {
        var _this = this;
        if (this.imageRight) {
            this.imageRight.classList.add('borderWin');
            this.updateScoreRightGuess();
            this.countdownAndExecute(function () {
                if (_this.imageRight) {
                    _this.imageRight.classList.remove('borderWin');
                    _this.main();
                }
            });
        }
    };
    /**
     * Updates the score for a correct guess.
     * @private
     */
    SoonerOrLaterGame.prototype.updateScoreRightGuess = function () {
        if (this.scoreElement) {
            this.score = this.score + 1;
            this.scoreElement.innerText = 'SCORE: ' + this.score;
        }
    };
    /**
     * Handles the logic for an incorrect guess.
     * @private
     */
    SoonerOrLaterGame.prototype.wrongGuess = function () {
        var _this = this;
        if (this.imageRight) {
            this.resetScore();
            this.imageRight.classList.add('borderLose');
            this.countdownAndExecute(function () {
                if (_this.imageRight) {
                    _this.imageRight.classList.remove('borderLose');
                    _this.main();
                }
            });
        }
    };
    /**
     * Resets the score to 0.
     * @private
     */
    SoonerOrLaterGame.prototype.resetScore = function () {
        if (this.scoreElement) {
            this.score = 0;
            this.scoreElement.innerText = 'SCORE: 0';
        }
    };
    /**
     * Generates two unique random numbers to select objects.
     * @private
     * @returns {number[] | undefined} An array of two unique random numbers or undefined if it fails.
     */
    SoonerOrLaterGame.prototype.giveRandomNumbers = function () {
        var objectId1;
        var objectId2;
        var attempts = 0;
        var maxAttempts = 100;
        do {
            if (attempts >= maxAttempts) {
                console.log("Exceeded maximum attempts. Unable to generate unique numbers.");
                return undefined;
            }
            objectId1 = this.generateRandomNumber();
            objectId2 = this.generateRandomNumber();
            if (objectId1 === objectId2) {
                console.log(objectId1.toString() + objectId2.toString() + " Numbers are the same, rerolling");
            }
            else {
                console.log(objectId1, objectId2);
                return [objectId1, objectId2];
            }
            attempts++;
        } while (true);
    };
    /**
     * Generates a random number based on the amount of objects available.
     * @private
     * @returns {number} A random number.
     */
    SoonerOrLaterGame.prototype.generateRandomNumber = function () {
        return Math.floor(Math.random() * this.amountOfObjects);
    };
    /**
     * Retrieves object data based on the provided IDs.
     * @private
     * @param {number} objectID1 - The ID of the first object.
     * @param {number} objectID2 - The ID of the second object.
     * @returns {HigherOrLowerObject[] | undefined} An array of the selected objects' data or undefined.
     */
    SoonerOrLaterGame.prototype.getObjectData = function (objectID1, objectID2) {
        if (this.objectData) {
            var object1 = this.objectData.find(function (object) { return object.id === objectID1; });
            var object2 = this.objectData.find(function (object) { return object.id === objectID2; });
            return [object1, object2].filter(function (HigherOrLowerObject) { return HigherOrLowerObject !== undefined; });
        }
    };
    /**
     * Loads the objects' images and descriptions onto the page.
     * @private
     * @param {HigherOrLowerObject} object1 - The first object.
     * @param {HigherOrLowerObject} object2 - The second object.
     */
    SoonerOrLaterGame.prototype.loadObjects = function (object1, object2) {
        var image1 = object1.image;
        var image2 = object2.image;
        var imageElementObject1 = document.getElementById('composerImage1');
        var imageElementObject2 = document.getElementById('composerImage2');
        var descriptionElementObject1 = document.getElementById('composerDescription1');
        var descriptionElementObject2 = document.getElementById('composerDescription2');
        var loaderElement = document.getElementById('loader1');
        imageElementObject1.style.opacity = '0.5';
        imageElementObject2.style.opacity = '0.5';
        this.displayObjects(object1, object2, image1, image2, imageElementObject1, imageElementObject2, descriptionElementObject1, descriptionElementObject2, loaderElement);
    };
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
    SoonerOrLaterGame.prototype.displayObjects = function (object1, object2, image1, image2, imageElementObject1, imageElementObject2, descriptionElementObject1, descriptionElementObject2, loaderElement) {
        imageElementObject1.onload = function () {
            imageElementObject1.style.opacity = '1';
        };
        imageElementObject1.src = object1.image;
        descriptionElementObject1.innerText = object1.name;
        imageElementObject2.onload = function () {
            imageElementObject2.style.opacity = '1';
        };
        imageElementObject2.src = image2;
        descriptionElementObject2.innerText = object2.name;
        loaderElement.classList.remove('loader');
    };
    /**
     * Disables the buttons, adds a countdown, and then executes a callback function.
     * @private
     * @param {() => void} callback - The callback function to execute after the countdown.
     */
    SoonerOrLaterGame.prototype.countdownAndExecute = function (callback) {
        var _this = this;
        var loaderElement = document.getElementById('loader1');
        var secondsRemaining = 0.5;
        this.guessEerderButton.disabled = true;
        this.guessLaterButton.disabled = true;
        loaderElement.classList.add('loader');
        var countdownInterval = setInterval(function () {
            secondsRemaining--;
            if (secondsRemaining < 0) {
                clearInterval(countdownInterval);
                _this.guessEerderButton.disabled = false;
                _this.guessLaterButton.disabled = false;
                callback(); // Execute the provided callback after the given amount of seconds
            }
        }, 1000); // Update every 1 second
    };
    return SoonerOrLaterGame;
}());
/** Initialize the IntersectionObserver to handle animations on scroll */
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else {
            // entry.target.classList.remove('show');
        }
    });
});
/** Observe all elements with the 'hidden' class for the IntersectionObserver */
var hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(function (el) { return observer.observe(el); });
/** Start a new instance of the SoonerOrLaterGame */
new SoonerOrLaterGame();
