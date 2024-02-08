"use strict";
var objectData;
var composersData;
var historicalEventsData;
var composersButton = document.getElementById("composersRadio");
var historicalEventsButton = document.getElementById("historicalEventsRadio");
var imageRight = document.getElementById('composerImage2');
var guessEerderButton = document.getElementById('guessEerder');
var guessLaterButton = document.getElementById('guessLater');
var scoreElement = document.getElementById('score');
var amountOfObjects;
var randomObjectData;
var score = 0;
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
function fetchJSONFile(url, callback) {
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (fetchedData) {
        callback(fetchedData);
    })
        .catch(function (error) { return console.error('Error fetching JSON:', error); });
}
function handleComposerData(fetchedData) {
    composersData = fetchedData;
    setInitialGameState(fetchedData);
}
function handleHistoricalEventData(fetchedData) {
    historicalEventsData = fetchedData;
}
function setInitialGameState(fetchedData) {
    objectData = fetchedData;
    if (composersData != null) {
        amountOfObjects = composersData.length;
        main();
    }
}
function switchData(newData) {
    var confirmation = window.confirm('Warning: if you switch, your score will reset. Do you want to proceed?');
    if (confirmation) {
        objectData = newData;
        amountOfObjects = newData.length;
        resetScore();
        main();
    }
    else {
        composersButton.checked = objectData === composersData;
        historicalEventsButton.checked = objectData === historicalEventsData;
    }
}
function main() {
    var randomNumbers = giveRandomNumbers();
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
    }
    else {
        wrongGuess();
    }
}
function guessLater() {
    if (randomObjectData && randomObjectData[0] && randomObjectData[1] != null && randomObjectData[0].data < randomObjectData[1].data) {
        rightGuess();
    }
    else {
        wrongGuess();
    }
}
function rightGuess() {
    if (imageRight) {
        imageRight.classList.add('borderWin');
        updateScoreRightGuess();
        countdownAndExecute(function () {
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
        countdownAndExecute(function () {
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
function giveRandomNumbers() {
    var objectId1;
    var objectId2;
    do {
        objectId1 = generateRandomNumber();
        objectId2 = generateRandomNumber();
        if (objectId1 === objectId2) {
            console.log(objectId1, objectId2 + " Numbers are the same, rerolling");
        }
        else {
            console.log(objectId1, objectId2);
            return [objectId1, objectId2];
        }
    } while (true);
}
function generateRandomNumber() {
    return Math.floor(Math.random() * amountOfObjects);
}
function getObjectData(objectID1, objectID2) {
    if (objectData) {
        var object1 = objectData.find(function (object) { return object.id === objectID1; });
        var object2 = objectData.find(function (object) { return object.id === objectID2; });
        return [object1, object2].filter(function (HigherOrLowerObject) { return HigherOrLowerObject !== undefined; });
    }
}
function displayObjects(object1, object2) {
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
}
function countdownAndExecute(callback) {
    var secondsRemaining = 1;
    guessEerderButton.disabled = true;
    guessLaterButton.disabled = true;
    var countdownInterval = setInterval(function () {
        secondsRemaining--;
        if (secondsRemaining < 0) {
            clearInterval(countdownInterval);
            guessEerderButton.disabled = false;
            guessLaterButton.disabled = false;
            callback(); // Execute the provided callback after 3 seconds
        }
    }, 1000); // Update every 1 second
}
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
/* Initial Fetch */
window.addEventListener('load', function () {
    fetchJSONFile('/otherFiles/composers.json', handleComposerData);
    fetchJSONFile('/otherFiles/historicalevents.json', handleHistoricalEventData);
});
