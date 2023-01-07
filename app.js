function clearBoxes(){
    console.log("beginning clearing");
    let checkboxes= document.querySelectorAll('input');
    checkboxes.forEach((cb) => {
        cb.checked = false;
        cb.readOnly = false;
        cb.indeterminate = false;
    });
    document.getElementById('player1').value = "";
    document.getElementById('player2').value = "";
    document.getElementById('board').value = "";
    console.log("cleared");
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
    console.log("Checked boxes: ");
    console.log(checked);
    console.log("Indertemined boxes: ");
    console.log(undeterminate);

    var stringPlayer1 = "";
    var stringPlayer2 = "";
    var boardString = "";
    let x = 0;
    let pos = "1";
    let neg = "0";
    for(let i = 0 ; i<64 ; i++){
        if(checked[x] == i){
            stringPlayer1 = pos.concat(stringPlayer1);
            x++;
        } else{
            stringPlayer1 = neg.concat(stringPlayer1);
        }
    }

    x = 0;
    for(let i = 0 ; i<64 ; i++){
        if(undeterminate[x] == i){
            stringPlayer2 = pos.concat(stringPlayer2);
            x++;
        } else{
            stringPlayer2 = neg.concat(stringPlayer2);
        }
    }

    x=0
    var board = checked.concat(undeterminate);
    board.sort();
    console.log("This is the board: ", board);
    for(let i = 0 ; i<64 ; i++){
        if(board[x] == i){
            boardString = pos.concat(boardString);
            x++;
        } else{
            boardString = neg.concat(boardString);
        }
    }

    console.log("These are the strings in following order: Player1, Player2, Board:");
    console.log(stringPlayer1);
    console.log(stringPlayer2);
    console.log(boardString);

    document.getElementById('player1').value = stringPlayer1;
    document.getElementById('player2').value = stringPlayer2;
    document.getElementById('board').value = boardString;

}

function copy(id){
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText.value;
}

