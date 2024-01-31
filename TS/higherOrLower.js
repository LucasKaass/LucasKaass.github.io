"use strict";
/**
 * @author Lucas Kaas
 * @description Awesomest game ever
 */
let randomComposerData;
function main() {
    const randomNumbers = giveRandomNumbers();
    if (randomNumbers) {
        randomComposerData = getComposerData(randomNumbers[0], randomNumbers[1]);
        displayComposers(randomComposerData[0], randomComposerData[1]);
    }
}
function guessEerder() {
    if (randomComposerData != null && randomComposerData[0].dateOfBirth > randomComposerData[1].dateOfBirth) {
        rightGuess();
    }
    else {
        wrongGuess();
    }
}
function guessLater() {
    if (randomComposerData != null && randomComposerData[0].dateOfBirth < randomComposerData[1].dateOfBirth) {
        rightGuess();
    }
    else {
        wrongGuess();
    }
}
function rightGuess() {
    if (composerImage) {
        composerImage.classList.add('borderWin');
        updateScoreRightGuess();
        countdownAndExecute(() => {
            composerImage.classList.remove('borderWin');
            main();
        });
    }
}
let score = 0;
function updateScoreRightGuess() {
    if (scoreElement) {
        score = score + 1;
        scoreElement.innerText = 'SCORE: ' + score;
    }
}
function wrongGuess() {
    if (composerImage) {
        resetScore();
        composerImage.classList.add('borderLose');
        countdownAndExecute(() => {
            composerImage.classList.remove('borderLose');
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
function generateRandomNumber() {
    return Math.floor(Math.random() * 14) + 1;
}
function giveRandomNumbers() {
    const composerID1 = generateRandomNumber();
    const composerID2 = generateRandomNumber();
    if (composerID1 === composerID2) {
        console.log(composerID1, composerID2 + "Numbers are the same, rerolling");
        giveRandomNumbers();
    }
    else {
        console.log(composerID1, composerID2);
        return [composerID1, composerID2];
    }
}
function getComposerData(composerID1, composerID2) {
    const composer1 = composersData.find(composer => composer.id === composerID1);
    const composer2 = composersData.find(composer => composer.id === composerID2);
    return [composer1, composer2].filter(composer => composer !== undefined);
}
function displayComposers(composer1, composer2) {
    const imageElementComposer1 = document.getElementById('composerImage1');
    const imageElementComposer2 = document.getElementById('composerImage2');
    const descriptionElementComposer1 = document.getElementById('composerDescription1');
    const descriptionElementComposer2 = document.getElementById('composerDescription2');
    if (composer1 && imageElementComposer1) {
        imageElementComposer1.src = composer1.image;
        descriptionElementComposer1.innerText = composer1.name + ', Geboortedatum: ' + composer1.dateOfBirth;
    }
    if (composer2 && imageElementComposer2) {
        imageElementComposer2.src = composer2.image;
        descriptionElementComposer2.innerText = composer2.name;
    }
}
const composerImage = document.getElementById('composerImage2');
const guessEerderButton = document.getElementById('guessEerder');
const guessLaterButton = document.getElementById('guessLater');
const scoreElement = document.getElementById('score');
if (guessEerderButton) {
    guessEerderButton.addEventListener('click', guessEerder);
}
if (guessLaterButton) {
    guessLaterButton.addEventListener('click', guessLater);
}
window.addEventListener('load', main);
const composersData = [
    {
        "id": 1,
        "name": "Ludwig van Beethoven",
        "dateOfBirth": "1770-12-16",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Ludwig_Van_Beethoven_LCCN2003663902.jpg/220px-Ludwig_Van_Beethoven_LCCN2003663902.jpg"
    },
    {
        "id": 2,
        "name": "Wolfgang Amadeus Mozart",
        "dateOfBirth": "1756-01-27",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Portrait_of_Wolfgang_Amadeus_Mozart_at_the_age_of_13_in_Verona%2C_1770.jpg/220px-Portrait_of_Wolfgang_Amadeus_Mozart_at_the_age_of_13_in_Verona%2C_1770.jpg"
    },
    {
        "id": 3,
        "name": "Johann Sebastian Bach",
        "dateOfBirth": "1685-03-31",
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg"
    },
    {
        "id": 4,
        "name": "Pyotr Ilyich Tchaikovsky",
        "dateOfBirth": "1840-05-07",
        "image": "https://assets.classicfm.com/2021/50/tchaikovsky-1639562612-editorial-long-form-0.jpg"
    },
    {
        "id": 5,
        "name": "Johannes Brahms",
        "dateOfBirth": "1833-05-07",
        "image": "https://www.meisterdrucke.us/kunstwerke/1200w/Ludwig%20Michalek%20-%20Portrait%20of%20Johannes%20Brahms%201891%20-%20(MeisterDrucke-630825).jpg"
    },
    {
        "id": 6,
        "name": "Claude Debussy",
        "dateOfBirth": "1862-08-22",
        "image": "https://medias.gazette-drouot.com/prod/medias/mediatheque/85952.jpg"
    },
    {
        "id": 7,
        "name": "Maurice Ravel",
        "dateOfBirth": "1875-03-07",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Maurice_Ravel_1925.jpg/1200px-Maurice_Ravel_1925.jpg"
    },
    {
        "id": 8,
        "name": "John Williams",
        "dateOfBirth": "1932-02-08",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/John_Williams_with_Boston_Pops-1.jpg/330px-John_Williams_with_Boston_Pops-1.jpg"
    },
    {
        "id": 9,
        "name": "Hans Zimmer",
        "dateOfBirth": "1957-09-12",
        "image": "https://waldorfmusic.com/wp-content/uploads/2023/01/Hans-Zimmer.png"
    },
    {
        "id": 10,
        "name": "Ennio Morricone",
        "dateOfBirth": "1928-11-10",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1vbfWTlFBV24ZbukUdlQGR25Vz32Tnb9PA&usqp=CAU"
    },
    {
        "id": 11,
        "name": "Erik Satie",
        "dateOfBirth": "1866-05-17",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Erik_Satie_en_1909.PNG/150px-Erik_Satie_en_1909.PNG"
    },
    {
        "id": 12,
        "name": "Yiruma",
        "dateOfBirth": "1978-02-15",
        "image": "https://www.udiscovermusic.com/wp-content/uploads/2020/08/Yiruma_credit_UniversalMusicGroupKorea.jpg"
    },
    {
        "id": 13,
        "name": "Ludovico Einaudi",
        "dateOfBirth": "1955-11-23",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Ludovico_Einaudi_in_Tehran_12_%28cropped%292.jpg"
    },
    {
        "id": 14,
        "name": "Yann Tiersen",
        "dateOfBirth": "1970-06-23",
        "image": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/02/21/10/yann-tiersen.jpg?width=1200"
    },
    {
        "id": 15,
        "name": "Frédéric Chopin",
        "dateOfBirth": "1810-03-01",
        "image": "https://assets.classicfm.com/2009/04/frederic-chopin-1233248000-view-0.jpg"
    }
];
function countdownAndExecute(callback) {
    let secondsRemaining = 1;
    const countdownInterval = setInterval(() => {
        secondsRemaining--;
        if (secondsRemaining < 0) {
            clearInterval(countdownInterval);
            callback(); // Execute the provided callback after 3 seconds
        }
    }, 1000); // Update every 1 second
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else {
            // entry.target.classList.remove('show')
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
