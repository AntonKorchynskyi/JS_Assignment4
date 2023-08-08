const name_studId = document.querySelector("#name_StudID");
const submitBtn = document.querySelector("#submitBtn");
const wordPar = document.querySelector("#word");
const definitionsPar = document.querySelector("#definitions")
definitionsPar.setAttribute('style', 'white-space: pre;');
const synonymPar = document.querySelector("#synonyms");
synonymPar.setAttribute('style', 'white-space: pre;');
const img = document.querySelector("img");
const hDefinitions = document.querySelector("#hDefinitions");
hDefinitions.style.display = "none";
const hSynonyms = document.querySelector("#hSynonyms");
hSynonyms.style.display = "none";


const url = 'https://wordsapiv1.p.rapidapi.com/words/';
const synonymsUrl = 'https://wordsapiv1.p.rapidapi.com/words/';

var userWord;
var newUrl;
var li;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bdef38e416msh11c4e157ba7c91fp1d43dejsneb7c3e097847',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

submitBtn.addEventListener("click", wordGet);

function wordGet() {

    userWord = document.querySelector("#inputWord").value;
    if (userWord === "") {
        wordPar.textContent = "You need to input word first";
    }
    else {
        newUrl = url + userWord + "/definitions";

        fetch(newUrl, options).then(response => {
            return response.json();
        }).then(json => displayResults(json)
        ).catch(error => wordPar.textContent = "No word was found!")
    }

}

function synonymWordGet(userWord) {

    newUrl = synonymsUrl + userWord + "/synonyms";

    fetch(newUrl, options).then(response => {
        return response.json();
    }).then(json => displaySynonymResults(json)
    ).catch(error => synonymPar.textContent = "No synonyms were found!")
    
}

function displayResults(json) {
    console.log(json);
    definitionsPar.textContent = "";
    synonymPar.textContent = "";
    name_studId.textContent = "Anton Korchynskyi - 200524341";
    wordPar.textContent = "Your word: " + json.word;
    hDefinitions.style.display = "initial";
    for (let i = 0; i < json.definitions.length; i++) {
        li = document.createElement("li");
        li.textContent = json.definitions[i].definition + " - " + json.definitions[i].partOfSpeech;
        definitionsPar.appendChild(li);
    }

    synonymWordGet(json.word);
}

function displaySynonymResults(json) {
    synonymPar.textContent = "";
    hSynonyms.style.display = "initial";
    li = document.createElement("li");
    for (let i = 0; i < json.synonyms.length; i++) {
        li = document.createElement("li");
        li.textContent = json.synonyms[i];
        synonymPar.appendChild(li);
    }
    img.setAttribute("src", "https://robohash.org/" + json.word);
}