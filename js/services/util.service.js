export const utilService = {
    getRandomInt,
    makeId,
    makeLorem,
    saveToStorage,
    loadFromStorage,
    getYoutubeVideoId
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeId(length=5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function makeLorem(length) {
    var randStr = '';
    while (randStr.length < length) {
        var wordLength = getRandomInt(3, 6);
        var word = _createWord(wordLength);
        if (Math.random() > 0.9) word += ',';
        randStr += word + ' ';
    }
    randStr = randStr.substring(0, length);
    randStr = randStr[0].toUpperCase() + randStr.substr(1)

    return randStr;
}

function _getRandChar() {
    var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    var randIndex = parseInt(Math.random() * LETTERS.length)
    return LETTERS.charAt(randIndex);
}

function _createWord(length) {
    var word = '';
    while (word.length < length) {
        var randChar = _getRandChar();
        word += randChar;
    }
    return word;
}

function saveToStorage(key, any) {
    localStorage[key] = JSON.stringify(any);
}

function loadFromStorage(key) {
    var str = localStorage[key] || 'null';
    return JSON.parse(str);
}

function getYoutubeVideoId(url) {
    // RegEx by Stephan Schmitz <eyecatchup@gmail.com>
    // https://stackoverflow.com/a/10315969/624466
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const res = url.match(youtubeRegex);
    return (res) ? res[1] : '';
}