"use strict";
/**
 * @author Lucas Kaas
 * @description Awesomest game ever
 */
const hiddenElements = document.querySelectorAll('.hidden');
let objectData;
let amountOfObjects;
const composersButton = document.getElementById("composersRadio");
const historicalEventsButton = document.getElementById("historicalEventsRadio");
const imageRight = document.getElementById('composerImage2');
const guessEerderButton = document.getElementById('guessEerder');
const guessLaterButton = document.getElementById('guessLater');
const scoreElement = document.getElementById('score');
function setInitialGameState() {
    objectData = composersData;
    amountOfObjects = composersData.length;
    main();
}
function switchData(newData) {
    const confirmation = window.confirm('Warning: if you switch, your score will reset. Do you want to proceed?');
    if (confirmation) {
        objectData = newData;
        amountOfObjects = newData.length;
        console.log(amountOfObjects);
        resetScore();
        main();
    }
    else {
        // Reset the radio button to the previous state
        composersButton.checked = objectData === composersData;
        historicalEventsButton.checked = objectData === historicalEventsData;
    }
}
composersButton.addEventListener("click", function () {
    switchData(composersData);
});
historicalEventsButton.addEventListener("click", function () {
    switchData(historicalEventsData);
});
let randomObjectData;
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
    }
    else {
        wrongGuess();
    }
}
function guessLater() {
    if (randomObjectData != null && randomObjectData[0].data < randomObjectData[1].data) {
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
        countdownAndExecute(() => {
            imageRight.classList.remove('borderWin');
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
function generateRandomNumber() {
    return Math.floor(Math.random() * amountOfObjects) + 1;
}
function giveRandomNumbers() {
    let objectId1;
    let objectId2;
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
function getObjectData(objectID1, objectID2) {
    if (objectData) {
        const object1 = objectData.find(object => object.id === objectID1);
        const object2 = objectData.find(object => object.id === objectID2);
        return [object1, object2].filter(HigherOrLowerObject => HigherOrLowerObject !== undefined);
    }
}
function displayObjects(object1, object2) {
    const imageElementObject1 = document.getElementById('composerImage1');
    const imageElementObject2 = document.getElementById('composerImage2');
    const descriptionElementObject1 = document.getElementById('composerDescription1');
    const descriptionElementObject2 = document.getElementById('composerDescription2');
    if (object1 && imageElementObject1) {
        imageElementObject1.src = object1.image;
        descriptionElementObject1.innerText = object1.name;
    }
    if (object2 && imageElementObject2) {
        imageElementObject2.src = object2.image;
        descriptionElementObject2.innerText = object2.name;
    }
}
if (guessEerderButton) {
    guessEerderButton.addEventListener('click', guessEerder);
}
if (guessLaterButton) {
    guessLaterButton.addEventListener('click', guessLater);
}
const composersData = [
    {
        "id": 1,
        "name": "Ludwig van Beethoven",
        "data": "1770-12-16",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Ludwig_Van_Beethoven_LCCN2003663902.jpg/220px-Ludwig_Van_Beethoven_LCCN2003663902.jpg"
    },
    {
        "id": 2,
        "name": "Wolfgang Amadeus Mozart",
        "data": "1756-01-27",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Portrait_of_Wolfgang_Amadeus_Mozart_at_the_age_of_13_in_Verona%2C_1770.jpg/220px-Portrait_of_Wolfgang_Amadeus_Mozart_at_the_age_of_13_in_Verona%2C_1770.jpg"
    },
    {
        "id": 3,
        "name": "Johann Sebastian Bach",
        "data": "1685-03-31",
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg"
    },
    {
        "id": 4,
        "name": "Pyotr Ilyich Tchaikovsky",
        "data": "1840-05-07",
        "image": "https://assets.classicfm.com/2021/50/tchaikovsky-1639562612-editorial-long-form-0.jpg"
    },
    {
        "id": 5,
        "name": "Johannes Brahms",
        "data": "1833-05-07",
        "image": "https://www.meisterdrucke.us/kunstwerke/1200w/Ludwig%20Michalek%20-%20Portrait%20of%20Johannes%20Brahms%201891%20-%20(MeisterDrucke-630825).jpg"
    },
    {
        "id": 6,
        "name": "Claude Debussy",
        "data": "1862-08-22",
        "image": "https://medias.gazette-drouot.com/prod/medias/mediatheque/85952.jpg"
    },
    {
        "id": 7,
        "name": "Maurice Ravel",
        "data": "1875-03-07",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Maurice_Ravel_1925.jpg/1200px-Maurice_Ravel_1925.jpg"
    },
    {
        "id": 8,
        "name": "John Williams",
        "data": "1932-02-08",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/John_Williams_with_Boston_Pops-1.jpg/330px-John_Williams_with_Boston_Pops-1.jpg"
    },
    {
        "id": 9,
        "name": "Hans Zimmer",
        "data": "1957-09-12",
        "image": "https://waldorfmusic.com/wp-content/uploads/2023/01/Hans-Zimmer.png"
    },
    {
        "id": 10,
        "name": "Ennio Morricone",
        "data": "1928-11-10",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1vbfWTlFBV24ZbukUdlQGR25Vz32Tnb9PA&usqp=CAU"
    },
    {
        "id": 11,
        "name": "Erik Satie",
        "data": "1866-05-17",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Erik_Satie_en_1909.PNG/150px-Erik_Satie_en_1909.PNG"
    },
    {
        "id": 12,
        "name": "Yiruma",
        "data": "1978-02-15",
        "image": "https://www.udiscovermusic.com/wp-content/uploads/2020/08/Yiruma_credit_UniversalMusicGroupKorea.jpg"
    },
    {
        "id": 13,
        "name": "Ludovico Einaudi",
        "data": "1955-11-23",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Ludovico_Einaudi_in_Tehran_12_%28cropped%292.jpg"
    },
    {
        "id": 14,
        "name": "Yann Tiersen",
        "data": "1970-06-23",
        "image": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/02/21/10/yann-tiersen.jpg?width=1200"
    },
    {
        "id": 15,
        "name": "Frédéric Chopin",
        "data": "1810-03-01",
        "image": "https://assets.classicfm.com/2009/04/frederic-chopin-1233248000-view-0.jpg"
    }
];
const historicalEventsData = [
    {
        id: 1,
        name: "The cold war (start)",
        data: "1947-03-12",
        image: "https://www.forces.net/sites/default/files/Cold%20War%20image%20Soviet%20Union%20vs%20USA%20visual%20CREDIT%20ALAMY.jpg"
    },
    {
        id: 2,
        name: "Battle of Waterloo",
        data: "1815-06-18",
        image: "https://assets.editorial.aetnd.com/uploads/2009/11/gettyimages-599962817.jpg"
    },
    {
        id: 3,
        name: "Wright Brothers' First Powered Flight",
        data: "1903-12-17",
        image: "https://cdn-global-hk.hobbyking.com/media/wysiwyg/Blog/WrightBrother_HistoryCollection.jpg"
    },
    {
        id: 4,
        name: "Titanic Sinks",
        data: "1912-04-15",
        image: "https://hips.hearstapps.com/hmg-prod/images/ngh00003364-6491b92f7399f.jpg"
    },
    {
        id: 5,
        name: "D-Day",
        data: "1944-06-06",
        image: "https://assets.editorial.aetnd.com/uploads/2009/10/d-day-gettyimages-2696319.jpg"
    },
    {
        id: 6,
        name: "Atomic Bombing of Hiroshima",
        data: "1945-08-06",
        image: "https://cdn.britannica.com/92/217192-138-CC625581/Hiroshima-what-happened-75th-anniversary-atomic-bombing-Hiroshima-Japan-World-War-II.jpg"
    },
    {
        id: 7,
        name: "Moon Landing",
        data: "1969-07-20",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Eugene_Cernan_at_the_LM%2C_Apollo_17.jpg/800px-Eugene_Cernan_at_the_LM%2C_Apollo_17.jpg"
    },
    {
        id: 8,
        name: "Fall of the Berlin Wall",
        data: "1989-11-09",
        image: "https://junior.scholastic.com/content/dam/classroom-magazines/junior-scholastic/issues/2019-20/111119/fall-of-the-berlin-wall/JS5-20191111-News-Wall-PO.jpg"
    },
    {
        id: 9,
        name: "Start of world war 1",
        data: "1914-07-28",
        image: "https://assets.editorial.aetnd.com/uploads/2018/08/outbreak-of-world-war-i-gettyimages-506127736.jpg"
    },
    {
        id: 10,
        name: "9/11 Terrorist Attacks",
        data: "2001-09-11",
        image: "https://s.abcnews.com/images/US/remembering-9-11-attack-02-gty-jef-180910_hpEmbed_sl_23x15_1600.jpg?w=1600"
    },
    {
        id: 11,
        name: "JFK assassination",
        data: "1963-11-22",
        image: "https://daily.jstor.org/wp-content/uploads/2023/04/jfks_assassination_and_doing_your_own_research_1050x700.jpg"
    },
    {
        id: 12,
        name: "Napoleonic wars",
        data: "1803-05-05",
        image: "https://images.wondershare.com/edrawmax/article2023/napoleonic-wars-timeline/napoleon.jpg"
    },
    {
        id: 13,
        name: "Chernobyl Nuclear Disaster",
        data: "1986-04-26",
        image: "https://static-cdn.sr.se/images/478/3674457_2048_1152.jpg?preset=1024x576"
    },
    {
        id: 14,
        name: "Assassination of Julius Caesar",
        data: "0000-03-15",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg"
    },
    {
        id: 15,
        name: "French Revolution Begins",
        data: "1789-05-05",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anonymous_-_Prise_de_la_Bastille.jpg/640px-Anonymous_-_Prise_de_la_Bastille.jpg"
    },
    {
        id: 16,
        name: "Great Fire of London",
        data: "1666-09-02",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Great_Fire_London.jpg/1200px-Great_Fire_London.jpg"
    },
    {
        id: 17,
        name: "Eruption of Mount Vesuvius (Destruction of Pompeii)",
        data: "0001-08-24",
        image: "https://cdn.thecollector.com/wp-content/uploads/2023/03/mount-vesuvius-volcano-eruption-etching.jpg"
    },
    {
        id: 18,
        name: "Fall of Constantinople",
        data: "1453-05-29",
        image: "https://miro.medium.com/v2/resize:fit:662/1*0BqqcG9qcGReFKxtcy5i9Q.jpeg"
    },
    {
        id: 19,
        name: "Industrial revolution",
        data: "1830-01-01",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Powerloom_weaving_in_1835.jpg"
    },
    {
        id: 20,
        name: "Cuban Missile Crisis",
        data: "1962-10-16",
        image: "https://cdn.britannica.com/68/146468-050-1DA4EC07/Soviet-military-buildup-Cuba-1962.jpg"
    }
];
function countdownAndExecute(callback) {
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
        }
        else {
            // entry.target.classList.remove('show')
        }
    });
});
hiddenElements.forEach((el) => observer.observe(el));
window.addEventListener('load', setInitialGameState);
