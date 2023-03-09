const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
var setName = urlParams.get('set-name')
var course = urlParams.get('course-name')
const addCardButton = document.getElementById('add-button');
const titleSet = document.getElementsByTagName('h1');

const loadCards = function () {
    setName = Storage.getSetName(setName, course);
    cards = Storage.getCards(setName);
    console.log(cards);

    setTitle = urlParams.get('set-name');
    if(setTitle === '') {
        titleSet[0].innerHTML = "<i>unnamed set</i>";
    } else {
        titleSet[0].innerHTML = setTitle;
    }

    if(cards) {
        dl = document.querySelector('dl');
        dl.remove();
        main = document.querySelector('main');
        dl = document.createElement('dl');
        main.appendChild(dl);

        for(let i =0; i < cards.length; i++) {
            div = document.createElement('div');
            dt = document.createElement('dt');
            dd = document.createElement('dd');

            dt.innerHTML = cards[i][0];
            dd.innerHTML = cards[i][1];

            dl.appendChild(div);
            div.appendChild(dt);
            div.appendChild(dd);
        }
    }
    // add card element
    dl = document.querySelector('dl');
    div = document.createElement('div');
    div.setAttribute('id', 'addCard');
    div.style.visibility = 'hidden';

    // addCard inputs...
    termInput = document.createElement('input');
    termInput.setAttribute('type', 'text');
    termInput.setAttribute("placeholder", 'Term');
    termInput.setAttribute('id', 'termInput');
    defInput = document.createElement('input');
    defInput.setAttribute('type', 'text');
    defInput.setAttribute("placeholder", 'Definition');
    defInput.setAttribute('id', 'defInput');

    // addCard submit button
    button = document.createElement('button');
    button.setAttribute('id', 'cardAdder');
    button.innerHTML = 'Add Card';

    div.appendChild(termInput);
    div.appendChild(defInput);
    div.appendChild(button);
    dl.appendChild(div);

    adderButton = document.getElementById('cardAdder');
    adderButton.addEventListener('click', function () {
        const term = document.getElementById('termInput').value;
        const def = document.getElementById('defInput').value;
        const setName = Storage.getSetName(urlParams.get('set-name'), urlParams.get('course-name'))
        if(term.length !== 0 && def.length !== 0) {
            Storage.addCard(setName, term, def);
            
            newCard = document.createElement('div');
            dt = document.createElement('dt');
            dd = document.createElement('dd');

            dt.innerHTML = term;
            dd.innerHTML = def;

            newCard.appendChild(dt);
            newCard.appendChild(dd);

            replaceCard = document.getElementById('addCard');
            replaceCard.before(newCard)
        }
        toggleAdd();
    });
}
toggleAdd = function () {
    style = getComputedStyle(document.getElementById('addCard'));
    addCard = document.getElementById('addCard');
    style.visibility === 'hidden' ? addCard.style.visibility ='visible': addCard.style.visibility ='hidden';
    document.getElementById('termInput').value = '';
    document.getElementById('defInput').value = '';
}


addCardButton.addEventListener('click', toggleAdd);

const interval = setTimeout(function(){
    if(Storage) {
        loadCards();
        clearInterval(interval);
    }
}, 50);