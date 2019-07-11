// Object of toons
var luke = {
    name: "luke",
    hp: 130,
    alive: true,

    image: "assets/images/luke.png",
};

var yoda = {
    name: "yoda",
    hp: 100,
    alive: true,

    image: "assets/images/yoda.png",
};

var vader = {
    name: "vader",
    hp: 140,
    alive: true,

    image: "assets/images/vader.png",
};

var maul = {
    name: "maul",
    hp: 125,
    alive: true,

    image: "assets/images/maul.png",
};


//use ojbect
var userDefender = {
    toonSelected: false,

    //stores object here
    selected: "",

    selectedMe: function (x) {
        //if userDefender hasn't been selected yet
        if (this.toonSelected == false) {
            this.toonSelected = true;

            //stores object in selected
            for (i = 0; i < board.toons.length; i++) {
                if (board.toons[i].name === x) {
                    this.selected = board.toons[i];
                };
            };
            board.drawCards();
        };
    },

    takeDamage: function (x) {
        this.selected.hp -= x;
        //checks if dead
        if (this.selected.hp <= 0) {
            this.isDead();
        }
        board.drawCards();
    },


    isDead: function () {
        console.log("userDefender :" + this.selected.name + " has died");
        //unselected, toon selected turns back to false
        board.toons.splice(board.toons.indexOf(this.selected), 1)
        this.selected = "";
        this.toonSelected = false;
    }
};


var userToon = {
    toonSelected: false,

    //this will hold obje ct toon
    selected: "",

    healsLeft: 5,
    specialsLeft: 4,

    selectedMe: function (x) {
        //if userToon hasn't been selcted yet
        if (this.toonSelected == false) {
            this.toonSelected = true;
            //sets selected as the object
            for (i = 0; i < board.toons.length; i++) {
                if (board.toons[i].name === x) {
                    this.selected = board.toons[i];
                };
            };
            board.drawCards();
        }
    },


    takeDamage: function (x) {
        this.selected.hp -= x;
        //checks if dead
        if (this.selected.hp <= 0) {
            this.isDead();
        }
        board.drawCards();
    },

    heal: function (x) {
        this.selected.hp += x;

        //checks if dead
        if (this.selected.hp <= 0) {
            this.isDead();
        };
        board.drawCards();
    },

    isDead: function () {
        console.log("userDefender :" + this.selected.name + " has died");
        //unselected, toon selected turns back to false
        board.toons.splice(board.toons.indexOf(this.selected), 1)
        this.selected = "";
        this.toonSelected = false;
    }
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
            toonBtn.addClass("toon-button");
            toonBtn.attr("data-name", this.toons[i].name);
            //determine background color
            if (this.toons[i].name === userToon.selected.name) {
                toonBtn.attr("data-alignment", "good");
            } else if (this.toons[i].name === userDefender.selected.name) {
                toonBtn.attr("data-alignment", "enemy");
            } else if (userToon.toonSelected === true) {
                toonBtn.attr("data-alignment", "bad");
            };

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
                if (this.toons[i].name === userToon.selected.name) {
                    userSelected.append(toonBtn);
                    //selects the defender toon
                } else if (this.toons[i].name === userDefender.selected.name) {
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

        //prints all toons where they should go
        $(".selectToon").html(unselected);
        $(".userToon").html(userSelected);
        $(".defendingToon").html(defenderSelected);
        $(".enemyToon").html(enemySelected);
        waitClick();
    },



};

//detect click
function waitClick() {

    //if user selects a toon
    $(".toon-button").on("click", function () {
        //if user hasn't selected their toon yet
        var toon = ($(this).attr("data-name"));

        //logic to identify users choices
        //user hasn't selected their toon yet        
        if (userToon.toonSelected === false) {
            userToon.selectedMe(toon);

            //user has detected their toon and choosing defender
        } else if (userDefender.toonSelected === false) {
            userDefender.selectedMe(toon);
        }
    });



}
//toons attack
function attack() {
    var defenderRoll = Math.floor(Math.random() * 15);
    var attackerRoll = Math.floor(Math.random() * 20);

    userDefender.takeDamage(attackerRoll);
    userToon.takeDamage(defenderRoll);
};


//used for rolling special or mediate
function fourDten() {
    var min = Math.ceil(1);
    var max = Math.floor(10);
    var firstRoll = Math.floor(Math.random() * (max - min) + min);
    var secondRoll = Math.floor(Math.random() * (max - min) + min);
    var thirdRoll = Math.floor(Math.random() * (max - min) + min);
    var forthRoll = Math.floor(Math.random() * (max - min) + min);
    return (firstRoll + secondRoll + thirdRoll + forthRoll);
}

// user mediates
// enemy attacks
function meditate() {
    // roll die
    var userHeal = fourDten()
    var defenderRoll = Math.floor(Math.random() * 15);

    //update button
    userToon.healsLeft--
    if (userToon.healsLeft <= 0) {
        $("#meditate").html("meditate (heal:4d10)").css("text-decoration", "line-through");
    } else {
        userToon.heal(userHeal);
        userToon.takeDamage(defenderRoll);
        $("#meditate").html("meditate (heal: 4d10) (" + userToon.healsLeft + ")");
    }
}


function special() {
    var defenderRoll = Math.floor(Math.random() * 15);
    var attackerRoll = fourDten();


    userToon.specialsLeft--
    if (userToon.specialsLeft <= 0) {
        $("#special").html("special (damage:4d10)").css("text-decoration", "line-through");
    } else {
        userDefender.takeDamage(attackerRoll);
        userToon.takeDamage(defenderRoll);
        $("#special").html("special (damage: 4d10) (" + userToon.specialsLeft + ")");
    }

}

board.drawCards();