"use strict";

// $(function () {
    console.log("doc ready");

    var cardImages = ["images/00_heart_K.svg", "images/14_diamond_A.svg", "images/28_club_2.svg", "images/42_spade_3.svg", "images/01_heart_A.svg", "images/15_diamond_2.svg", "images/29_club_3.svg", "images/43_spade_4.svg", "images/02_heart_2.svg", "images/16_diamond_3.svg", "images/30_club_4.svg", "images/44_spade_5.svg", "images/03_heart_3.svg", "images/17_diamond_4.svg", "images/31_club_5.svg", "images/45_spade_6.svg", "images/04_heart_4.svg", "images/18_diamond_5.svg", "images/32_club_6.svg", "images/46_spade_7.svg", "images/05_heart_5.svg", "images/19_diamond_6.svg", "images/33_club_7.svg", "images/47_spade_8.svg", "images/06_heart_6.svg", "images/20_diamond_7.svg", "images/34_club_8.svg", "images/48_spade_9.svg", "images/07_heart_7.svg", "images/21_diamond_8.svg", "images/35_club_9.svg", "images/49_spade_10.svg", "images/08_heart_8.svg", "images/22_diamond_9.svg", "images/36_club_10.svg", "images/50_spade_J.svg", "images/09_heart_9.svg", "images/23_diamond_10.svg", "images/37_club_J.svg", "images/51_spade_Q.svg", "images/10_heart_10.svg", "images/24_diamond_J.svg", "images/38_club_Q.svg", "images/11_heart_J.svg", "images/25_diamond_Q.svg", "images/39_spade_K.svg", "images/12_heart_Q.svg", "images/26_club_K.svg", "images/40_spade_A.svg", "images/13_diamond_K.svg", "images/27_club_A.svg", "images/41_spade_2.svg"];

    var sortedImages = cardImages.sort();

    var initialDeck = [];

    //the following variables keep track of the amount  of points the player and dealer have
    var playerPoints = 0;
    var dealerPoints = 0;

    //use these to keep track of each player's hand as cards are dealt (for ace conditionals)
    var playerHand = [];
    var dealerHand = [];

    //populates the original deck array
    for(var i=0; i<52; i++){
        initialDeck.push(i)
    };

    //0 = King, 1=Ace, 11=Jack, 12=Queen
    //will probably not need this
    var cardValue = function(card){
        var value = card%13;
        switch(value){
            case 0:
                value = "King";
                break;
            case 1:
                value = "Ace";
                break;
            case 11:
                value = "Jack";
                break;
            case 12:
                value = "Queen";
                break;
        };
        return value;
    }

    //calculates point value of a card
    //0 = King, 1=Ace, 11=Jack, 12=Queen, all other card values = their numbers
    var calcPoints = function(card){
        var pointValue = card%13;
        switch(pointValue){
            case 0:
                pointValue = 10;
                break;
            case 1:
                pointValue = 11;
                break;
            case 11:
                pointValue = 10;
                break;
            case 12:
                pointValue = 10;
                break;
        };
        return pointValue;
    }

    //0=hearts, 1=diamonds, 2=clubs, 3=spades
    var cardSuit = function(card){
        var suit = Math.floor(card/13);
        switch(suit){
            case 0:
                suit = "hearts";
                break;
            case 1:
                suit = "diamonds";
                break;
            case 2:
                suit = "clubs";
                break;
            case 3:
                suit = "spades"
                break;
        }
        return suit;
    }

    // initialDeck.forEach(function(el){
    //     console.log(el, cardValue(el) + " of " + cardSuit(el));
    // })

    //shuffles deck
    var shuffleDeck = function(deck) {
        for (var i = deck.length - 1; i > 0; i--) {
            var j = Math.round(Math.random() * i );
            var iHolder = deck[i];
            deck[i] = deck[j];
            deck[j] = iHolder;
        }
        return deck;
    }

    //deals cards from shuffled deck and returns array of [card point value, card name, card suit]
    var deal = function(player){
        // shuffleDeck(initialDeck);
        var card = initialDeck.pop();

        if(player === "player"){
                //changes ace value to 1 if necessary and adds appropriate amount to playerPoints
                if (calcPoints(card)===11 && (playerPoints+11>21)){
                    playerPoints+=1;
                } else if ((playerHand.indexOf(11) > -1) && (calcPoints(card)===11) && (playerPoints+11>21)){
                    dealerPoints-=10;
                } else {
                    playerPoints+=calcPoints(card);
                }

                //creates new player-card div, adds text to new div describing card that was dealt and shows player score
                var playerCardTxt = $('<div class="player-card">');
                $('.player-hand').append(playerCardTxt);
                playerCardTxt.text(cardValue(card) + " of " + cardSuit(card));     

                var playerCard = $('<img class="playerCard">');
                $('.player-hand').append(playerCard);
                playerCard.attr('src', sortedImages[card]);

                playerHand.push(card);

        } else if (player === "dealer"){
                //changes ace value to 1 if necessary and adds appropriate amount to dealerPoints
                if (calcPoints(card)===11 && (dealerPoints+11>21)){
                    dealerPoints+=1;
                } else if ((dealerHand.indexOf(11)> -1) && (calcPoints(card)===11) && (dealerPoints+11>21)){
                    dealerPoints-=10;
                } else {
                    dealerPoints+=calcPoints(card);
                };

                //creates new dealer-card div, adds text to it and shows dealer score
                var dealerCardTxt = $('<div class="dealer-card">');
                $('.dealer-hand').append(dealerCardTxt);
                dealerCardTxt.text(cardValue(card) + " of " + cardSuit(card));

                var dealerCard = $('<img class="dealerCard">');
                $('.dealer-hand').append(dealerCard);
                dealerCard.attr('src', sortedImages[card]);

                dealerHand.push(card);
                
        };

        return [calcPoints(card), cardValue(card), cardSuit(card)];
    }

    //displays player and dealer points
    var displayScore = function(){
        $('.player-score').text("Player score: " + playerPoints);
        $('.dealer-score').text("Dealer score: " + dealerPoints);
    }
    //removes score display
    var removeScore = function(){
        $('.player-score').text('');
        $('.dealer-score').text('');
        $('.end-message').text('');
    }

    //hides hit and stand buttons
    var hideButtons = function(){
        $('.hit').hide();
        $('.stand').hide();
    }

    //serve out first four cards of the game
    var initialDeal = function(){
        deal("dealer"); deal("player"); deal("dealer"); deal("player");        
        $('.hit').show()
        $('.stand').show()
        $('.play').hide();
     }

     //start the game with the play button, but hide the hit and stand buttons initially
    var playGame = function(){
        hideButtons();
        shuffleDeck(initialDeck);
        $('.play').show().click(initialDeal);
        console.log("game start")
    }
    playGame();

    // var clearTable = function(){
    //     playerPoints = 0;
    //     dealerPoints = 0;
    //     $('.player-card').remove();
    //     $('.dealer-card').remove();
    //     removeScore();
    // }

    var endOfGame = function(){
        hideButtons();
        displayScore();
        // var playAgain = confirm("new round?");
        // if(playAgain){
        //     clearTable();
        //     newRound();
        // };
    };

    $('.hit').click(function(){
            deal("player");
            if(playerPoints>21){
                $('.end-message').text("Player bust, dealer wins =/")
                endOfGame();
            };
    });

    $('.stand').click(function(){
        while(dealerPoints<17){
            deal("dealer");
        };

        if(dealerPoints>21){
            $('.end-message').text("Dealer bust, you win!");
            endOfGame();
        } else if(dealerPoints<playerPoints){
            $('.end-message').text("You win!!");
            endOfGame();
        } else if (dealerPoints>playerPoints){
            $('.end-message').text("Dealer wins =/");
            endOfGame();
        } else {
            $('.end-message').text("Tie!");
            endOfGame();
        };



    });













    
// });
