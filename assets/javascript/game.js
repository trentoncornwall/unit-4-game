// Object of toons
var luke = {
    name: "luke",
    hp: 130,
    image: "assets/images/luke.png",

};

var yoda = {
    name: "yoda",
    hp: 100,
    image: "assets/images/yoda.png",
};

var vader = {
    name: "vader",
    hp: 140,
    image: "assets/images/vader.png",
};

var maul = {
    name: "maul",
    hp: 125,
    image: "assets/images/maul.png",
};


//use ojbect
var userToon = {
    toonSelected: false,
    selected: ""
    
};

var userDefender = {
    toonSelected: false,
    selected: ""
};

var userEnemies = {
    toonSelected: false,
    selected: ""
    
};



//creates board
var board = {

    toons: [luke, yoda, vader, maul],

    createSelector: function(){
        for (i=0; i < this.toons.length; i++) {
            //creating DIV container
            var toonBtn = $("<div>");
            toonBtn.addClass("toon toon-button toon-button-color");
            toonBtn.attr("data-name", this.toons[i].name);
           
            
            //name container
            var toonBtnName = $("<span>");
            toonBtnName.addClass("button-name");
            toonBtnName.attr("id", this.toons[i].name);
            toonBtnName.text(this.toons[i].name)
            
            //image container
            var toonBtnImg = $('<img>');
            toonBtnImg.addClass("button-image");
            toonBtnImg.attr("src", this.toons[i].image);

            //health container
            var toonBtnHp = $("<span>");
            toonBtnHp.addClass("button-hp");
            toonBtnHp.attr("data-value",this.toons[i].hp);
            toonBtnHp.text(this.toons[i].hp);

            //putting it tall together
            toonBtn.append(toonBtnName);
            toonBtn.append(toonBtnImg);
            toonBtn.append(toonBtnHp);

            //place on the page
            $(".selectToon").append(toonBtn);
        };
    },

};

$("document").ready(function(){
    //creates object buttons
    board.createSelector();
    //detect click

    //if user hasn't selected their toon yet, select their toon and move toons to enemies

    //else select enemy
});