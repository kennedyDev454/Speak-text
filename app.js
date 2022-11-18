const textarea = document.querySelector("textarea");
const button = document.querySelector(".button button");
const select = document.querySelector("select");

const sinth = window.speechSynthesis;

let voices = []

function populateSelect (){
  voices = sinth.getVoices()
  for(let voice of voices){

    const option = document.createElement('option')
    option.textContent = voice.name

    if(voice.default){
      option.text = `${voices[0].name}`
    }
    select.append(option)
  }
  
}

function SpeakText(value){
  const uterance = new SpeechSynthesisUtterance(value)
  const voiceSelected = select[select.selectedIndex].value

  for(let voice of sinth.getVoices()){
    if(voice.name == voiceSelected){
      uterance.voice = voice
    }
  }

  sinth.speak(uterance)
}

button.addEventListener('click',() => {
  if(textarea.value != ''){
    if(!sinth.speaking){
      SpeakText(textarea.value)
    }
  }

})
sinth.addEventListener('voiceschanged',populateSelect)
window.addEventListener('DOMContentLoaded',()=>{
  textarea.focus()
})