// Rules of Checkers:  https://www.itsyourturn.com/t_helptopic2030.html
// Using the chess board coord system:  https://en.wikipedia.org/wiki/Chessboard 
// Track tokens via coordinates, set up a JSON representing the initial board state.
// In memory, board is tracked by an array of tokens, write a debug routine that can output the current state of the board
// in human-readable format.
// Output and input is handled by the same array of tokens.
// Write a function that can analyze the entire board and return a set of all valid moves for one color.
// These will be classified as:  move, jump series, and crowning. Score each move based on number of jumps and / or crowning.
// Write a function that executes a move, and updates the board accordingly, removing any jumped pieces.
// Write a function that analyzes the current board state and determines if either player has won, or if there is a draw.
/*
    Token class: 
    {
        file: string // a, b, c, ... h left to right
        rank: number  // 8 .. 1, top to bottom
        color: string  // white or red
        king: boolean 
    }
    Board:  Token[]

    BasicMove class:
    {
        currentFile: string // a, b, c, ... h left to right
        currentRank: number  // 8 .. 1, top to bottom
        newFile: string
        newRank: number
        jump: boolean   // is this move a jump?
        color: string  // white or red
        currentKing: boolean
        newKing: boolean    // does token become a king on this move? 
        score: number   // move = 1, jump = 3, king = 10 
    }

    FullMove: 
    {
        moves: BasicMove[]
        score: number   // ranking of full move by assigned points to each basic move.
    }
    

    Pseudo Code:
        Find all regular tokens for the color.  Note which ones have a basic move:
        (if a token can reduce rank by one and increase file by one, without colliding with another token, it is a valid move.)
        (if a token can increase rank by one and increase file by one, without colliding with another token, it is a valid move.)
        Note which are not valid move because of a collision, to later see if they are actually jumps.
        Also note any moves which result in a crowning.
        
        Then note which ones have a jump by looking at all invalid moves from above:
        (if a token can reduce rank by two and increase file by two, without colliding with another token, it is a valid jump.)
        (if a token can increase rank by two and increase file by two, without colliding with another token, it is a valid jump.)
        Also note any jumps which result in a crowning.

        Now, find all kings for the color. Note those possible moves:
        (same moves and jumps as above, except that you can decrease the files as well as increase them.)


        

*/

class Token {
    file: string; // a, b, c, ... h left to right
    rank: number;  // 8 .. 1, top to bottom
    color: string;  // white or red
    king: boolean;
    constructor (file: string, rank: number, color: string, king: boolean) {
        this.file = file;
        this.rank = rank;
        this.color = color;
        this.king = king;
    }
}

let Board2: Token[];

class Board {
    board: Token[];
    constructor (board) {
        board = board;
    }

    show() {
        
    }
}

let startingBoard = [
    new Token('b', 1, 'w', false),
    new Token('d', 1, 'w', false),
    new Token('f', 1, 'w', false),
    new Token('h', 1, 'w', false),
    new Token('a', 2, 'w', false),
    new Token('c', 1, 'w', false),
    new Token('e', 1, 'w', false),
    new Token('g', 1, 'w', false)

]

// use ts-node to run from command line. 

class PentaDie {
    sides: string[] = [
        'Caramba mexican Grill',
        'Habaneros',
        'Ohso',
        'Z Tejas',
        'Covenant'
    ];
    constructor() {}
    
    roll() {
        return this.sides[Math.floor(Math.random() * 5)];
    }
}

let die = new PentaDie();
console.log('Roll: You really should eat at ' + die.roll());