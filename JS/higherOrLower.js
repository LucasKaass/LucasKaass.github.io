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
var SoonerOrLaterGame = /** @class */ (function () {
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
    SoonerOrLaterGame.prototype.handleComposerData = function (fetchedData) {
        this.composersData = fetchedData;
    };
    SoonerOrLaterGame.prototype.handleHistoricalEventData = function (fetchedData) {
        this.historicalEventsData = fetchedData;
        this.setInitialGameState(fetchedData);
    };
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
    SoonerOrLaterGame.prototype.main = function () {
        var randomNumbers = this.giveRandomNumbers();
        if (randomNumbers) {
            this.randomObjectData = this.getObjectData(randomNumbers[0], randomNumbers[1]);
            if (this.randomObjectData) {
                this.displayObjects(this.randomObjectData[0], this.randomObjectData[1]);
            }
        }
    };
    SoonerOrLaterGame.prototype.guessEerder = function () {
        if (this.randomObjectData != null && this.randomObjectData[0].data > this.randomObjectData[1].data) {
            this.rightGuess();
        }
        else {
            this.wrongGuess();
        }
    };
    SoonerOrLaterGame.prototype.guessLater = function () {
        if (this.randomObjectData && this.randomObjectData[0] && this.randomObjectData[1] != null && this.randomObjectData[0].data < this.randomObjectData[1].data) {
            this.rightGuess();
        }
        else {
            this.wrongGuess();
        }
    };
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
    SoonerOrLaterGame.prototype.updateScoreRightGuess = function () {
        if (this.scoreElement) {
            this.score = this.score + 1;
            this.scoreElement.innerText = 'SCORE: ' + this.score;
        }
    };
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
    SoonerOrLaterGame.prototype.resetScore = function () {
        if (this.scoreElement) {
            this.score = 0;
            this.scoreElement.innerText = 'SCORE: 0';
        }
    };
    SoonerOrLaterGame.prototype.giveRandomNumbers = function () {
        var objectId1;
        var objectId2;
        var attempts = 0;
        var maxAttempts = 100; // Adjust this value as needed
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
    SoonerOrLaterGame.prototype.generateRandomNumber = function () {
        return Math.floor(Math.random() * this.amountOfObjects);
    };
    SoonerOrLaterGame.prototype.getObjectData = function (objectID1, objectID2) {
        if (this.objectData) {
            var object1 = this.objectData.find(function (object) { return object.id === objectID1; });
            var object2 = this.objectData.find(function (object) { return object.id === objectID2; });
            return [object1, object2].filter(function (HigherOrLowerObject) { return HigherOrLowerObject !== undefined; });
        }
    };
    SoonerOrLaterGame.prototype.displayObjects = function (object1, object2) {
        var imageElementObject1 = document.getElementById('composerImage1');
        var imageElementObject2 = document.getElementById('composerImage2');
        var descriptionElementObject1 = document.getElementById('composerDescription1');
        var descriptionElementObject2 = document.getElementById('composerDescription2');
        if (object1 && imageElementObject1) {
            imageElementObject1.src = object1.image;
            descriptionElementObject1.innerText = object1.name;
        }
        if (object2 && imageElementObject2) {
            imageElementObject2.src = object2.image;
            descriptionElementObject2.innerText = object2.name;
        }
    };
    SoonerOrLaterGame.prototype.countdownAndExecute = function (callback) {
        var _this = this;
        var secondsRemaining = 0.5;
        this.guessEerderButton.disabled = true;
        this.guessLaterButton.disabled = true;
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
var hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(function (el) { return observer.observe(el); });
new SoonerOrLaterGame();
