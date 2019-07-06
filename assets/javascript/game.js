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
var userDefender = {
    toonSelected: false,
    selected: "",

    selectedMe: function (x) {
        if (this.toonSelected == false) {
            this.toonSelected = true;
            this.selected = x;

            console.log("this got ran")
        };
    },
};


var userToon = {
    toonSelected: false,
    selected: "",

    selectedMe: function (x) {
        console.log("got here for" + x);
        if (this.toonSelected == true) {
            userDefender.selectedMe(x)
        } else if (this.toonSelected == false) {
            this.toonSelected = true;
            this.selected = x;
        } 

    },


};



var userEnemies = {
    toonSelected: false,
    selected: ""

};





//creates board
var board = {

    toons: [luke, yoda, vader, maul],
    //creates inital board setup

    drawCards: function () {
        //creates inital veriables to print to page
        var unselected = $("<div>");
        var userSelected = $("<div>");
        var defenderSelected = $("<div>");
        var enemySelected = $("<div>");

        //loop set to create new buttons and place them were they should go
        for (i = 0; i < this.toons.length; i++) {
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
            toonBtnHp.attr("data-value", this.toons[i].hp);
            toonBtnHp.text(this.toons[i].hp);

            //putting it tall together to toonBtn
            toonBtn.append(toonBtnName);
            toonBtn.append(toonBtnImg);
            toonBtn.append(toonBtnHp);


            //identifies were toonBtn supposed to go
            if (userToon.toonSelected === true) {
                //selects the users toon
                if (this.toons[i].name === userToon.selected) {
                    userSelected.append(toonBtn);
                //selects the defender toon
                } else if (this.toons[i].name === userDefender.selected) {
                    defenderSelected.append(toonBtn);
                //else puts everthing into enemies
                } else {
                    enemySelected.append(toonBtn);
                }
            //or puts everything on top
            } else {
                unselected.append(toonBtn)
            }

        };


        $(".selectToon").html(unselected);
        $(".userToon").html(userSelected);
        $(".defendingToon").html(defenderSelected);
        $(".enemyToon").html(enemySelected);
    },



};

$("document").ready(function () {
    //creates object buttons
    board.drawCards();

    //detect click
    $(".toon").on("click", function () {
        //if user hasn't selected their toon yet
        var toon = ($(this).attr("data-name"));

        userToon.selectedMe(toon);
        board.drawCards();
    
    })

});