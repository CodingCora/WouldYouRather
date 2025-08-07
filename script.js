const promptContainer = document.getElementById('prompt-container');
const promptText = document.getElementById('prompt');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newpromptBtn = document.getElementById('new-prompt');


let apiprompts = [];
//Show New prompt
function newprompt(){
    //Pick a Random prompt from apiprompts awway
    const prompt = apiprompts[Math.floor(Math.random() * apiprompts.length)];

    //Check if Author field is blank and replace with 'Unknown'

    if (!prompt.author){
        authorText.textContent = 'Unknown';
    } else {
      authorText.textContent = prompt.author;
    
}
//Check prompt Length to determine styling

    if (prompt.text.length > 120){
        promptText.classList.add('long-prompt')
    }else{
        promptText.classList.remove('long-prompt')
    }
    promptText.textContent = prompt.text;
}
// Get prompts from API
async function getprompts(){
const apiURL = 'https://type.fit/api/prompts';
    try {
        const response = await fetch(apiURL);
        apiprompts = await response.json();
        newprompt();
    } catch (error) {
        //Catch Error Here
    }

}

//Tweet prompt

function tweetprompt() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${promptText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


//Event Listeners

newpromptBtn.addEventListener('click', newprompt);
twitterBtn.addEventListener('click', tweetprompt);

//On Load
getprompts();
