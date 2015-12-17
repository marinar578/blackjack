"use strict";

// $(function () {
    console.log("doc ready");

    var deck = [];

    //the following variables keep track of the amount  of points the player and dealer have
    var playerPoints = 0;
    var dealerPoints = 0;

    //populates the original deck array
    for(var i=0; i<52; i++){
        deck.push(i)
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

    //shuffles deck
    var shuffleDeck = function () {
        for (var i = deck.length - 1; i > 0; i--) {
            var j = Math.round(Math.random() * i );
            var iHolder = deck[i];
            deck[i] = deck[j];
            deck[j] = iHolder;
        }
        return deck;
    }

    //deals cards from deck. shuffleDeck() must be called first for this to 
    // work on a shuffled deck and not on the original deck
    var deal = function(player){
        shuffleDeck();
        var card = deck.pop();
        if(player === "player"){
            playerPoints+=calcPoints(card);
            var playerCard = $('<div class="player-card">');
            $('.player-hand').append(playerCard);
            playerCard.text(cardValue(card) + " of " + cardSuit(card));
             $('.player-score').text("Player score: " + playerPoints);
        } else if (player === "dealer"){
            dealerPoints+=calcPoints(card);
            var dealerCard = $('<div class="dealer-card">');
            $('.dealer-hand').append(dealerCard);
            dealerCard.text(cardValue(card) + " of " + cardSuit(card));
             $('.dealer-score').text("Dealer score: " + dealerPoints);
        };

        return [calcPoints(card), cardValue(card), cardSuit(card)];
    }

    //serve out first four cards of the game
      var initialDeal = function(){
        deal("dealer"); deal("player"); deal("dealer"); deal("player");
        
        //shows the hit button and deals cards to player
        $('.hit').show().click(function(){
            deal("player");
        });

        //shows the stand button and deals cards to dealer
        $('.stand').show().click(function(){
            deal("dealer");
        });
     }

     //start the game with the play button, but hide the hit and stand buttons initially
    $('.hit').hide();
    $('.stand').hide();
    $('.play').click(initialDeal);













    
// });
