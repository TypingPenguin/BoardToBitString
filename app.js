const MARK1 = "X";
const MARK2 = "O"
const EMPTY = "~";
const SEPERATOR = "---+---+---+---+---+---+---+---"



window.onload = function(){
    console.log("Clearing page on load.")
    clearBoxes();
};




function clearBoxes(){
    console.log("Beginning clearing.");
    let checkboxes= document.querySelectorAll('input');
    checkboxes.forEach((cb) => {
        cb.checked = false;
        cb.readOnly = false;
        cb.indeterminate = false;
    });
    document.getElementById('player1').value = "";
    document.getElementById('player2').value = "";
    document.getElementById('board').value = "";
    document.getElementById('player1ascii').value = "";
    document.getElementById('boardascii').value = "";
    console.log("Succesfully cleared.");
}


function ts(cb) {
    if (cb.readOnly) cb.checked=cb.readOnly=false;
    else if (!cb.checked) cb.readOnly=cb.indeterminate=true;
}


function generate(){
    let checkboxes= document.querySelectorAll('input');
    let checked= [];
    let undeterminate = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked){
            checked.push(checkbox.value);
        }
        if (checkbox.readOnly){
            undeterminate.push(checkbox.value);
        }
    });
    //document.write("You have checked: ", checked, "\n" ,  "You have undertimate: ", undeterminate);
    checked.sort(function(a, b){return a - b});
    undeterminate.sort(function(a, b){return a - b});

    console.log("Checked boxes: ");
    console.log(checked);
    console.log("Indertemined boxes: ");
    console.log(undeterminate);

    var stringPlayer1 = "";
    var stringPlayer1Ascii = ""
    var stringPlayer2 = "";
    var stringPlayer2Ascii = "";
    var boardString = "";
    var boardStringAscii = "";
    let x = 0;
    let pos = "1";
    let neg = "0";
    for(let i = 0 ; i<64 ; i++){
        if(checked[x] == i){
            stringPlayer1 = pos.concat(stringPlayer1);
            x++;

            if (i%8 == 0 && i!=0){
                stringPlayer1Ascii += "\n";
                stringPlayer1Ascii += SEPERATOR + "\n";
            }
            if (i%8 == 7 && i!=0){
                stringPlayer1Ascii += " " + MARK1;

            } else{
                stringPlayer1Ascii += " " + MARK1 +" |";
            }

        } else{
            stringPlayer1 = neg.concat(stringPlayer1);

            if (i%8 == 0 && i!=0){
                stringPlayer1Ascii += "\n";
                stringPlayer1Ascii += SEPERATOR + "\n";
            }
            if (i%8 == 7 && i!=0){
                stringPlayer1Ascii += " " + EMPTY;
            } else{
                stringPlayer1Ascii += " " + EMPTY + " |";
            }
        }
    }

    x = 0;
    for(let i = 0 ; i<64 ; i++){
        if(undeterminate[x] == i){
            stringPlayer2 = pos.concat(stringPlayer2);
            x++;

            if (i%8 == 0 && i!=0){
                stringPlayer2Ascii += "\n";
                stringPlayer2Ascii += SEPERATOR + "\n";
            }
            if (i%8 == 7 && i!=0){
                stringPlayer2Ascii += " " + MARK2;

            } else{
                stringPlayer2Ascii += " " + MARK2 +" |";
            }
        } else{
            stringPlayer2 = neg.concat(stringPlayer2);

            if (i%8 == 0 && i!=0){
                stringPlayer2Ascii += "\n";
                stringPlayer2Ascii += SEPERATOR + "\n";
            }
            if (i%8 == 7 && i!=0){
                stringPlayer2Ascii += " " + EMPTY;
            } else{
                stringPlayer2Ascii += " " + EMPTY + " |";
            }
        }
    }

    x=0
    var board = checked.concat(undeterminate);
    board.sort(function(a, b){return a - b});
    console.log("This is the board: ", board);
    for(let i = 0 ; i<64 ; i++){
        if(board[x] == i){
            boardString = pos.concat(boardString);
            x++;
        } else{
            boardString = neg.concat(boardString);
        }
    }

    for(var i = 0; i < stringPlayer1Ascii.length ; i++){
        if (stringPlayer1Ascii[i] === MARK1){
            boardStringAscii += stringPlayer1Ascii[i];
        } else if (stringPlayer2Ascii[i] == MARK2){
            boardStringAscii += stringPlayer2Ascii[i];
        } else {
            boardStringAscii += stringPlayer1Ascii[i];
        }
    }

    

    console.log("These are the strings in following order: Player1, Player2, Board:");
    console.log(stringPlayer1);
    console.log(stringPlayer2);
    console.log(boardString);

    document.getElementById('player1').value = stringPlayer1;
    document.getElementById('player2').value = stringPlayer2;
    document.getElementById('board').value = boardString;

    document.getElementById('player1ascii').value = stringPlayer1Ascii;
    document.getElementById('boardascii').value = boardStringAscii;

}

function copy(id){
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    //var tooltip = document.getElementById("myTooltip");
    //tooltip.innerHTML = "Copied: " + copyText.value;
}

function generateFromString(){
    var player1 = document.getElementById('player1').value
    var player2 = document.getElementById('player2').value
    var board = document.getElementById('board').value

    var player1Array = []
    var player2Array = []

    //Create array of bit pos for player1
    if (player1 !== ""){
        for (let i = player1.length-1; i >=0; i--){
            if (player1[i] === "1"){
                player1Array.push(Math.abs(i-63));
            }
        }
    }

    //Create array of bit pos for player2
    if (player2 !== ""){
        for (let i = player2.length-1; i >=0; i--){
            if (player2[i] === "1"){
                player2Array.push(Math.abs(i-63));
            }
        }
    }


    let checkboxes= document.querySelectorAll('input');

    player1Array.forEach(element => {
        checkboxes.forEach(cb => {
            if (cb.value == element){
                cb.readOnly = false;
                cb.checked = true;
            }
        });
    });

    player2Array.forEach(element => {
        checkboxes.forEach(cb => {
            if (cb.value == element){
                ts(cb);
            }
        });
    });

    generate();
    console.log(player2);

}

