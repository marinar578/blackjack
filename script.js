"use strict";

// $(function () {
    console.log("doc ready");

    var deck = [];
    var playerAmount = 0;
    var dealerAmount = 0;

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

    //calculates game value of a card in terms of points
    //0 = King, 1=Ace, 11=Jack, 12=Queen
    var calcPoints = function(card){
        var gameValue = card%13;
        switch(gameValue){
            case 0:
                gameValue = 10;
                break;
            case 1:
                gameValue = 11;
                break;
            case 11:
                gameValue = 10;
                break;
            case 12:
                gameValue = 10;
                break;
        };
        return gameValue;
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
    var deal = function(){
        var card = deck.pop();
        console.log(calcPoints(card), cardValue(card) + " of " + cardSuit(card));
    }










    // // following function finds the card's name from the deck
    // //unnecessary in actual code, delete this before submitting
    // //0=hearts, 1=diamonds, 2=clubs, 3=spades
    // var displayCardName = function(i){
        

    //     var cardName = deck.map(function(card){
    //         var cardSuit = Math.floor(card / 13);
    //         switch(cardSuit){
    //             case 0:
    //                 cardSuit = "hearts";
    //                 break;
    //             case 1:
    //                 cardSuit = "diamonds";
    //                 break;
    //             case 2:
    //                 cardSuit = "clubs";
    //                 break;
    //             case 3:
    //                 cardSuit = "spaces";
    //                 break;
    //         }

    //         var cardValue = card%13;
    //         switch (cardValue) {
    //             case 0:
    //                 cardValue = "2";
    //                 break;
    //             case 1:
    //                 cardValue = "3";
    //                 break;
    //             case 2:
    //                 cardValue= "4";
    //                 break;
    //             case 3:
    //                 cardValue = "5";
    //                 break;
    //             case 4:
    //                 cardValue = "6";
    //                 break;
    //             case 5:
    //                 cardValue = "7";
    //                 break;
    //             case 6:
    //                 cardValue = "8";
    //                 break;
    //             case 7:
    //                 cardValue= "9";
    //                 break;
    //             case 8:
    //                 cardValue = "10";
    //                 break;
    //             case 9:
    //                 cardValue = "Jack";
    //                 break;
    //             case 10:
    //                 cardValue = "Queen";
    //                 break;
    //             case 11:
    //                 cardValue= "King";
    //                 break;
    //             case 12:
    //                 cardValue = "Ace";
    //                 break;
    //         }
    //         return cardValue + " of " + cardSuit;
    //     });
        
    //     return cardName      
    // };


    
// });
