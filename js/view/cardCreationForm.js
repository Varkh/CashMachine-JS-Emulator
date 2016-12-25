function CardCreationForm($nameInput,$dateInput,$balInput,$pinInput) {

    var newcard = new CardDataModel();
    newcard._holderName = $nameInput[0].value;
    newcard._cardNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    newcard._expirationDate = $dateInput[0].value.split('.');
    newcard.setBalance(parseInt($balInput[0].value));
    newcard.setPin($pinInput[0].value.split('').map(Number));
    insertToWallet(newcard,$nameInput);
}

function insertToWallet (newcard,$nameInput) {
    var holderName = $('<p>')
        .addClass("holder-name")
        .append(newcard._holderName);
    var cardNumber = $('<p>')
        .addClass("card-number")
        .append(newcard._cardNumber.join(""));
    var expDate = $('<p>')
        .addClass("exp-date")
        .append(newcard._expirationDate[0]
            + "/" + newcard._expirationDate[1]
            + "/" + newcard._expirationDate[2]);
    cards.push(newcard);
    return $('<div>')
        .addClass("new-card")
        .data(newcard)
        .append(holderName)
        .append(cardNumber)
        .append(expDate)
        .appendTo($nameInput.parent());
}


/*function visualCardNumber(n) {
 for (var i = 0; i < n.length; i++){
 var res = "";
 if (i = 4 || i = 8 || i = 12){
 res = res + " " + n[i];
 } else {
 res = res + n[i];
 }
 return res;
 }
 }*/