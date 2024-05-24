
const word_el=document.getElementById('word');
const popup= document.getElementById('popup-conteiner');
const message_el = document.getElementById('success-message')
const wrongLetters_e = document.getElementById('wrong-letters')
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const btn = document.getElementById('play-again');
const puan = document.getElementById('puan');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandom();
let point=0;




function getRandom(){
    
    const words = ["javascript","java","python","html","emre"];

    return words[Math.floor(Math.random()*words.length)];

}
function displayMessage(){
    message.classList.add('show');
    setTimeout(function() {
        message.classList.remove('show');
    }, 2000);
}
btn.addEventListener('click', function(){

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandom();

    displayWord();
    updateLetters();
    
    popup.style.display ='none';

});

function displayWord(){
    


    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
        <div class="letter">
            ${correctLetters.includes(letter) ? letter:''}
        </div>
        `).join('')}

    `;
    const w = word_el.innerText.replace(/\n/g,'');
    if(w === selectedWord){
        popup.style.display ='flex';
        message_el.innerText = 'Tebrikler kazandınız!!! '
    }
}

function updateLetters(){
    wrongLetters_e.innerHTML =`
        ${wrongLetters.length>0?'<h3>Hatalı Harfler</h3>':'' }
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}

    `;
    
    items.forEach((item,index) =>{
        const errorCount = wrongLetters.length;
        if(index<errorCount){
            item.style.display ='block';
        }else{
            item.style.display ='none';
        }
    })
    if(wrongLetters.length ===  items.length){
        popup.style.display ='flex';
        message_el.innerText = 'KAYBETTİNİZ';
    }
}

window.addEventListener('keydown',function(e){
if(e.keyCode >= 65 && e.keyCode <=90){
    const letter = e.key;
    if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
            correctLetters.push(letter);
            displayWord();
            point++;
            console.log(point);
            puan.innerHTML =`
            <div class='puanlar'>
            Puanınız : ${point}
            </div> 
            `;
            
        }else{
            displayMessage();
            
            // bu harf eklendi
        }
    }else{
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter);
            updateLetters();
            
            //hatali harfleri guncelle
        }
        else{
            displayMessage()
        }
    }
}
});





displayWord();



