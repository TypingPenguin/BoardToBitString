# BoardToBitString

This website allows you to create Strings from Board positions and Board positions from strings.
This website looks better on Firefox browser.

# How does it work

## Board Size
First you can choose the size of the board on which you want to work, any size should work fine. Only the colors that help get a sense of positioning have been hardcoded for the boards of size 4x4, 6x6 and 8x8.

## Board to String & ASCII
Once the size of the board has been chosen, every position can either be empty, a position of player1 or a position for player2. Automated strings of the size of the board are generated (0 is in the Top Left, 63 in Bottom Right (for a 8x8 board)). This means that the Top Left position is the rightmost bit of the string. ASCII art is also automatically generated to be copied

## String to Board
It is also possible to go from a string to board positions. First, make sure the size of the board is equal to the lenght of the bitstring you are providing. Thorough error checks are not included in the software!
One player and two player strings are supported. Once you input them into the text fields, you can click on "Generate from String" in order to generate the ASCII, the board String and the visualization on the board.

# Clear
The clear button clears all fields except the BoardSize.

# WARNING

This tool has not been thoroughly tested and might have errors. Please check results carefully before using the tool.
