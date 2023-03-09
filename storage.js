const Storage = {
    // take name and course, creates set name (set-name-course)
    getSetName: function(name, course) {
        name = name.replaceAll(' ', '-').toLowerCase();
        course = course.replaceAll(' ', '-').toLowerCase();
        setName = "set-" + name + "-" + course;
        return setName;
    },
    // gets JSON list of all set names (list of all set-name-course)
    getAllSetInfo: function() {
        let allSets = localStorage.getItem("sets");
        if(allSets === null) {
            return {};
        }
        return JSON.parse(allSets);
    },
    // takes name,course,terms,defs and adds set name to "sets"
    // and adds card to set name
    createSet: function(name, course, terms, defs) {
        var allSets = this.getAllSetInfo();
        var setName = this.getSetName(name, course);
        // setname = set-practice-coen-161
        // allsets = {set-something, set-another, set-example}

        allSets[setName] = { name: name, course: course };
        localStorage.setItem("sets", JSON.stringify(allSets));

        for(let i=0; i < terms.length; i++) {
            this.addCard(setName, terms[i], defs[i]);
        }
    },
    // takes name,term,def and adds term+def to set name
    addCard: function(setName, term, def) {
        let set = localStorage.getItem(setName);
        if(set === null) {
            set = {};
        }
        else {
            set = JSON.parse(set);
        }

        set[term] = def;

        localStorage.setItem(setName, JSON.stringify(set));
    },
    // takes set name and gets all terms and defs from that set
    getCards: function(setName) {
        const readSet = localStorage.getItem(setName);
        let cards = [];
        if(readSet === null) {
            return cards;
        }
        cards = Object.entries(JSON.parse(readSet));
        return cards;
    }
}