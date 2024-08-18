const inputEl = document.getElementById("input");
const infotextEl = document.getElementById("info-text");
const meaningcontainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
    try {
        infotextEl.style.display = "block";
        meaningcontainerEl.style.display = "none";
        infotextEl.innerText = `Searching the eaning of "${word}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());
        if (result.title) {
            meaningcontainerEl.style.display = "block";
            infotextEl.style.display = "none";
            titleEl.innerText = word;
            meaningEl.innerText = "N/A";
            audioEl.style.display = "none";
        } else {
            infotextEl.style.display = "none";
            meaningcontainerEl.style.display = "block";
            audioEl.style.display = "block";
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }
    }catch(error){
        console.log(error);
        infotextEl.innerText=`error happened,try again`
    }
    
}
inputEl.addEventListener("keyup",(e)=>{
        if(e.target.value && e.key==="Enter"){
            fetchAPI(e.target.value);
        }
    })