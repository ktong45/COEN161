var colors = ['darkolivegreen', 'olive', 'green', 'olivedrab', 'darkseagreen', 
                'limegreen', 'yellowgreen', 'seagreen', 'lightgreen', 'forestgreen']
function randColor() {
    return newColor = colors[Math.floor(Math.random()*10)];
}
const loadSets = function() {
    var allSets = Storage.getAllSetInfo();
    allSets = Object.entries(allSets);

    for(let i=0; i < allSets.length; i++) {
        setName = allSets[i][1].name;
        setCourse = allSets[i][1].course;

        makeSet(setName, setCourse);
    }
}
const makeSet = function (name, course) {
    const ul = document.querySelector("ul");
    var li = document.createElement("li");
    ul.appendChild(li);
    
    var a = document.createElement("a");
    li.appendChild(a);
    
    var route = new URL("./browse.html", window.location.href);
    route.searchParams.set('set-name', name);
    route.searchParams.set('course-name', course);
    
    a.href = route;

    var h2 = document.createElement("h2");
    h2.innerHTML = name;
    a.appendChild(h2);

    var p1 = document.createElement("p");
    p1.innerHTML = course;
    a.appendChild(p1);

    let setName = Storage.getSetName(name, course);
    numTerms = Storage.getCards(setName);
    console.log(numTerms)
    numTerms = numTerms.length;

    var p2 = document.createElement("p");
    p2.innerText = `${numTerms} words`;
    a.appendChild(p2);
}
function setColor() {
    let matches = document.querySelectorAll("li");
    for(let i=0; i<matches.length; i++) {
        matches[i].style.backgroundColor = randColor();
    }
}
const id = setTimeout(function() {
    if(Storage) {
        loadSets();
        setColor();
    }
    clearInterval(id);
}, 50);