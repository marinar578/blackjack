"use strict";

$(function () {

    //array holding images of cards (these are named by their index in initialDeck but are not yet sorted)
    var cardImages = ["images/00_heart_K.svg", "images/14_diamond_A.svg", "images/28_club_2.svg", "images/42_spade_3.svg", "images/01_heart_A.svg", "images/15_diamond_2.svg", "images/29_club_3.svg", "images/43_spade_4.svg", "images/02_heart_2.svg", "images/16_diamond_3.svg", "images/30_club_4.svg", "images/44_spade_5.svg", "images/03_heart_3.svg", "images/17_diamond_4.svg", "images/31_club_5.svg", "images/45_spade_6.svg", "images/04_heart_4.svg", "images/18_diamond_5.svg", "images/32_club_6.svg", "images/46_spade_7.svg", "images/05_heart_5.svg", "images/19_diamond_6.svg", "images/33_club_7.svg", "images/47_spade_8.svg", "images/06_heart_6.svg", "images/20_diamond_7.svg", "images/34_club_8.svg", "images/48_spade_9.svg", "images/07_heart_7.svg", "images/21_diamond_8.svg", "images/35_club_9.svg", "images/49_spade_10.svg", "images/08_heart_8.svg", "images/22_diamond_9.svg", "images/36_club_10.svg", "images/50_spade_J.svg", "images/09_heart_9.svg", "images/23_diamond_10.svg", "images/37_club_J.svg", "images/51_spade_Q.svg", "images/10_heart_10.svg", "images/24_diamond_J.svg", "images/38_club_Q.svg", "images/11_heart_J.svg", "images/25_diamond_Q.svg", "images/39_spade_K.svg", "images/12_heart_Q.svg", "images/26_club_K.svg", "images/40_spade_A.svg", "images/13_diamond_K.svg", "images/27_club_A.svg", "images/41_spade_2.svg"];

    //this sorts the above array so that the indices of the images line up with the indices of their cards in initialDeck
    var sortedImages = cardImages.sort();

    //creates deck of cards and corresponds to indices of images in above arrays
    var initialDeck = [];

    //populates the original deck array
    for(var i=0; i<52; i++){
        initialDeck.push(i)
    };

    //the following variables keep track of the amount  of points and wins the player and dealer have
    var playerPoints = 0;
    var dealerPoints = 0;

    var playerWins = 0;
    var dealerWins = 0;
    var ties = 0;

    //use these to keep track of each player's hand and values of cards in the hands as cards are dealt (for ace conditionals)
    var playerHand = [];
    var playerValues = [];

    var dealerHand = [];
    var dealerValues = [];

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

    //deals cards from shuffled deck
    var deal = function(player){

        var card = initialDeck.pop();
        var cardValue = calcPoints(card);

        if(player === "player"){
                // //changes ace value to 1 if necessary and adds appropriate amount to playerPoints
                if(playerPoints + calcPoints(card) > 21){
                    if ((playerValues.indexOf(11) > -1) && (calcPoints(card)===11) && (playerPoints+11>21)){                       
                        playerValues.push(1);
                        var aceIndex = playerValues.indexOf(11)
                        playerValues[aceIndex]=1;
                        playerPoints = playerValues.reduce(function(prev,curr){return prev+curr});
                    } else if (calcPoints(card)===11 && (playerPoints+11>21)){
                        playerPoints+=1;
                        playerValues.push(1);
                    } else if ((playerValues.indexOf(11) > -1)){
                        playerValues.push(calcPoints(card));
                        var aceIndex = playerValues.indexOf(11)
                        playerValues[aceIndex]=1;
                        playerPoints = playerValues.reduce(function(prev,curr){return prev+curr});
                    }  else {
                        playerPoints+=calcPoints(card);
                        playerValues.push(calcPoints(card));
                    }              
                } else {
                    playerPoints+=calcPoints(card);
                    playerValues.push(calcPoints(card));
                }

                //creates new player-card img of dealt card
                var playerCard = $('<img class="player-card">');
                $('.player-hand').append(playerCard);
                playerCard.attr('src', sortedImages[card]);

                playerHand.push(card);


        } else if (player === "dealer"){
                // //changes ace value to 1 if necessary and adds appropriate amount to dealerPoints
                if(dealerPoints + calcPoints(card) > 21){
                    if ((dealerValues.indexOf(11) > -1) && (calcPoints(card)===11) && (dealerPoints+11>21)){                        
                        dealerValues.push(1);
                        var aceIndex = dealerValues.indexOf(11)
                        dealerValues[aceIndex]=1;
                        dealerPoints = dealerValues.reduce(function(prev,curr){return prev+curr});
                    } else if (calcPoints(card)===11 && (dealerPoints+11>21)){
                        dealerPoints+=1;
                        dealerValues.push(1);
                    } else if ((dealerValues.indexOf(11) > -1)){
                        dealerValues.push(calcPoints(card));
                        var aceIndex = dealerValues.indexOf(11)
                        dealerValues[aceIndex]=1;
                        dealerPoints = dealerValues.reduce(function(prev,curr){return prev+curr});
                    }  else {
                        dealerPoints+=calcPoints(card);
                        dealerValues.push(calcPoints(card));
                    }              
                } else {
                    dealerPoints+=calcPoints(card);
                    dealerValues.push(calcPoints(card));
                }

                //creates new dealer-card img of dealt card
                dealerHand.push(card);
                var dealerCard = $('<img class="dealer-card" id="'+dealerHand.indexOf(card)+'">');
                $('.dealer-hand').append(dealerCard);
                dealerCard.attr('src', sortedImages[card]);             
                
        };

    }

    //displays player and dealer points
    var displayScore = function(){
        $('.player-score').text("Player score: " + playerPoints);
        $('.dealer-score').text("Dealer score: " + dealerPoints);
        $('.player-wins').text("Player wins: "+playerWins);
        $('.dealer-wins').text("Dealer wins: "+ dealerWins);
        $('.ties').text("Ties: "+ties);
    }

    //removes score display
    var removeScore = function(){
        $('.player-score').text('');
        $('.dealer-score').text('');
        $('.end-message').text('');
        $('.player-wins').text("");
        $('.dealer-wins').text("");
        $('.ties').text("");
    }

    //hides hit and stand buttons
    var hideButtons = function(){
        $('.hit').hide();
        $('.stand').hide();
    }

    //serves out first four cards of the game
    var initialDeal = function(){
        shuffleDeck(initialDeck);
        deal("dealer");
        $('#0').attr('src', 'images/suits_back.png'); 
        deal("player"); deal("dealer"); deal("player");        
        $('.decks').show();
        $('.hit').show();
        $('.stand').show();
        $('.play').hide();
        $('.play-again').hide();
        if (playerPoints===21){
            $('.hit').hide();
        };
     }

    //starts the game with the play button, but hides the hit and stand buttons initially
    hideButtons();
    $('.decks').hide();
    $('.play-again').hide();
    var playGame = function(){
        $('.play').show();
        $('.play-again').hide();
    }

    $('.play').click(initialDeal);

    //returns used cards to initial deck and resets hand and value arrays
    var resetHandsAndDeck = function(){
        playerHand.forEach(function(el){
            initialDeck.push(el);
        });
        dealerHand.forEach(function(el){
            initialDeck.push(el);
        });
        playerHand=[];
        dealerHand=[];
        playerValues=[];
        dealerValues=[];
    };

    //resets all points to 0, removes divs containing cards in each hand,
    //hides hit and stand buttons and removes score display
    var clearTable = function(){
        playerPoints = 0;
        dealerPoints = 0;
        hideButtons();
        $('.decks').hide();
        $('.player-card').remove();
        $('.dealer-card').remove();
        removeScore();
    }


    //hides buttons and displays score at end of the game - used in the click functions below
    var endOfGame = function(){
        hideButtons();
        displayScore();
        $('#0').attr('src', sortedImages[dealerHand[0]]); 
        $('.play-again').show().click(function(){
            clearTable();
            resetHandsAndDeck();
            initialDeal();
        });

    };

    //event listener for "hit" button
    $('.hit').click(function(){
            deal("player");
            if(playerPoints>21){
                $('.end-message').text("Player busts, dealer wins");
                dealerWins+=1;
                endOfGame();
            }
    });

    //event listener for "stand" button
    $('.stand').click(function(){
        while(dealerPoints<17){
            deal("dealer");
        };

        if(dealerPoints>21){
            $('.end-message').text("Dealer busts, you win!");
            playerWins+=1;
            endOfGame();
        } else if(dealerPoints<playerPoints){
            $('.end-message').text("You win!!");
            playerWins+=1;
            endOfGame();
        } else if (dealerPoints>playerPoints){
            $('.end-message').text("Dealer wins");
            dealerWins+=1;
            endOfGame();
        } else {
            $('.end-message').text("Tie!");
            ties+=1;
            endOfGame();
        };


    });
    
});
