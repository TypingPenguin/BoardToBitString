const MARK1 = "X";
const MARK2 = "O"
const EMPTY = "~";
const DEFAULT_SIZE = 8;
const array8Cube = [9,10,11,12,13,14,17,18,19,20,21,22,25,26,29,30,33,34,37,38,41,42,43,44,45,46,49,50,51,52,53,54];
const array6Cube = [7,8,9,10,13,16,19,22,25,26,27,28];
const array4Cube = [0,1,2,3,4,7,8,11,12,13,14,15];


let width = DEFAULT_SIZE;
let height = DEFAULT_SIZE;





function createSeperator(){
    var seperator = "";
    for (let i = 0; i < width; i++) {
        seperator += "---";
        if (i%width != width-1) {
            seperator += "+";
        }
            
    }
    return seperator
}

window.onload = function(){
    console.log("Clearing page on load.")
    clearBoxes();
    resetSizes();
    createBoxes();
};

function resetSizes(){
    document.getElementById('boardWidth').value = DEFAULT_SIZE;
    document.getElementById('boardHeight').value = DEFAULT_SIZE;
}

function createBoxes(){
    if (document.getElementById("checkboxGrid") != null){
        document.getElementById("checkboxGrid").remove();
    }

    var myDiv = document.getElementById("checkboxBoardGrid");
    var myForm = document.createElement('form')
    myForm.class = 'checkboxGrid';
    myForm.id = 'checkboxGrid';
    myDiv.appendChild(myForm);

    var line = 0;
    var column = 0;
    // creating checkbox element
    for (let i = 0; i < width*height; i++) {
    
        var checkbox = document.createElement('input');

        // Assigning the attributes
        // to created checkbox
        checkbox.type = "checkbox";
        checkbox.value = i;
        checkbox.id = i;
        checkbox.setAttribute("onclick", "ts(this); generate();");

        // creating label for checkbox
        var label = document.createElement('label');

    
        if (width == 8 && height == 8){
            //hardcoded red values
            if (array8Cube.includes(i)){
                checkbox.setAttribute("class", "redBox")
            }
        }
        if (width == 6 && height == 6){
            //hardcoded red values
            if (array6Cube.includes(i)){
                checkbox.setAttribute("class", "redBox")
            }
        }

        if (width == 4 && height == 4){
            //hardcoded red values
            if (array4Cube.includes(i)){
                checkbox.setAttribute("class", "redBox")
            }
        }


        // assigning attributes for
        // the created label tag
        //label.htmlFor = "id";

        // appending the created text to
        // the created label tag
        //label.appendChild(document.createTextNode('This is the label for checkbox.'));

        // appending the checkbox
        // and label to div
        myForm.appendChild(label).appendChild(checkbox);

        if(i%width == width-1){
            line ++;
        }
        column++
        if(column == width){
            column = 0;
        }


    }
    boardWidthTemplating();
    
}

function setHeight(){
    var value = document.getElementById("boardHeight").value
    var valueInt = parseInt(value);
    height = valueInt;
    createBoxes();
}

function setSize(){
    setWidth();
    setHeight();
    clearBoxes();
}

function setWidth(){
    var value = document.getElementById("boardWidth").value
    var valueInt = parseInt(value);
    width = valueInt;
    boardWidthTemplating();
}

function boardWidthTemplating(){
    var columns = "";
    for (let i = 0; i < width; i++) {
        columns += "1fr ";
    }
    document.getElementById("checkboxGrid").style.gridTemplateColumns = columns;
    //grid.backgroundColor = "black";
    //grid.gridTemplateColumns = "1fr";
    //location.reload();
    console.log("Changing rows")
}

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
    for(let i = 0 ; i<width*height ; i++){
        if(checked[x] == i){
            stringPlayer1 = pos.concat(stringPlayer1);
            x++;

            if (i%width == 0 && i!=0){
                stringPlayer1Ascii += "\n";
                stringPlayer1Ascii += createSeperator() + "\n";
            }
            if (i%width == width-1 && i!=0){
                stringPlayer1Ascii += " " + MARK1;

            } else{
                stringPlayer1Ascii += " " + MARK1 +" |";
            }

        } else{
            stringPlayer1 = neg.concat(stringPlayer1);

            if (i%width == 0 && i!=0){
                stringPlayer1Ascii += "\n";
                stringPlayer1Ascii += createSeperator() + "\n";
            }
            if (i%width == width-1 && i!=0){
                stringPlayer1Ascii += " " + EMPTY;
            } else{
                stringPlayer1Ascii += " " + EMPTY + " |";
            }
        }
    }

    x = 0;
    for(let i = 0 ; i<width*height ; i++){
        if(undeterminate[x] == i){
            stringPlayer2 = pos.concat(stringPlayer2);
            x++;

            if (i%width == 0 && i!=0){
                stringPlayer2Ascii += "\n";
                stringPlayer2Ascii += createSeperator() + "\n";
            }
            if (i%width == width-1 && i!=0){
                stringPlayer2Ascii += " " + MARK2;

            } else{
                stringPlayer2Ascii += " " + MARK2 +" |";
            }
        } else{
            stringPlayer2 = neg.concat(stringPlayer2);

            if (i%width == 0 && i!=0){
                stringPlayer2Ascii += "\n";
                stringPlayer2Ascii += createSeperator() + "\n";
            }
            if (i%width == width-1 && i!=0){
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
    for(let i = 0 ; i<width*height ; i++){
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
        if (player1.length == height*width){
            for (let i = player1.length-1; i >=0; i--){
                if (player1[i] === "1"){
                    player1Array.push(Math.abs(i-((width*height)-1)));
                }
            }
        } else {
            alert("Wrong number of bits for player1.")
            return
        }
    }

    //Create array of bit pos for player2
    if (player2 !== ""){
        if (player2.length == width*height){
            for (let i = player2.length-1; i >=0; i--){
                if (player2[i] === "1"){
                    player2Array.push(Math.abs(i-((width*height)-1)));
                }
            }
        } else {
            alert("Wrong number of bits for player2.")
            return
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

