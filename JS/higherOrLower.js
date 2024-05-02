"use strict";
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
        var _this = this;
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
        window.addEventListener('load', function () {
            _this.fetchJSONFile('/otherFiles/composers.json', _this.handleComposerData.bind(_this));
            _this.fetchJSONFile('/otherFiles/historicalevents.json', _this.handleHistoricalEventData.bind(_this));
        });
    };
    SoonerOrLaterGame.prototype.fetchJSONFile = function (url, callback) {
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (fetchedData) {
            callback(fetchedData);
        })
            .catch(function (error) { return console.error('Error fetching JSON:', error); });
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
        if (this.composersData != null) {
            this.amountOfObjects = this.composersData.length;
            this.main();
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
                console.log(objectId1, objectId2 + " Numbers are the same, rerolling");
            }
            else {
                console.log(objectId1, objectId2);
                return [objectId1, objectId2];
            }
            attempts++;
        } while (true);
    };
    SoonerOrLaterGame.prototype.generateRandomNumber = function () {
        var randomNumber = Math.floor(Math.random() * this.amountOfObjects);
        console.log(randomNumber);
        return randomNumber;
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
new SoonerOrLaterGame();
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
