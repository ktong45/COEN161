const createButton = document.querySelector('.secondary');
const addButton = document.getElementById('add-card-button');
const uploadButton = document.getElementById('upload-label');
const fileInput = document.getElementById('upload-input');

createButton.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const setName = document.getElementById('name').value;
    const courseName = document.getElementById('course').value;

    let termsList = document.getElementsByName('terms');
    let defsList = document.getElementsByName('defs');

    var terms = [];
    var defs = [];
    for(let i =0; i <termsList.length; i++) {
        terms[i] = termsList[i].value;
        defs[i] = defsList[i].value;
    }
    Storage.createSet(setName, courseName, terms, defs);

    var route = new URL("./browse.html", window.location.href);
    route.searchParams.set('set-name', setName);
    route.searchParams.set('course-name', courseName);
    window.location.href = route;
});


addButton.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    term = document.getElementById('word-input').value;
    def = document.getElementById('definition-input').value;
    addCard(term, def);
});

addCard = function (word, def) {
    const dl = document.querySelector('dl')

    if(document.getElementById('empty-placeholder')) {
        holder = document.getElementById('empty-placeholder');
        dl.removeChild(holder);
    }
    //create hidden input for term
    var hiddenTerm = document.createElement('input');
    hiddenTerm.setAttribute('type', 'hidden');
    hiddenTerm.setAttribute("name", "terms");
    hiddenTerm.setAttribute("value", word);
    document.getElementById('create-set-form').appendChild(hiddenTerm);
    
    //create hidden input for def
    var hiddenDef = document.createElement('input');
    hiddenDef.setAttribute('type', 'hidden');
    hiddenDef.setAttribute("name", "defs");
    hiddenDef.setAttribute("value", def);
    document.getElementById('create-set-form').appendChild(hiddenDef);

    //adding term and def to definition list
    dt = document.createElement('dt');
    dt.innerHTML = word;

    dd = document.createElement('dd');
    dd.innerHTML = def;

    dl.appendChild(dt);
    dl.appendChild(dd);
}

fileInput.addEventListener("change", function () {
    const reader = new FileReader();
    const input = fileInput.files[0];
    reader.readAsText(input);

    cards = [];
    reader.onloadend = () => {
        cards = reader.result.split('\n');
        
        for(let i = 0; i < cards.length; i++) {
            console.log(cards[i]);
            words = cards[i].split(',');
            addCard(words[0], words[1]);
        }
    }
})