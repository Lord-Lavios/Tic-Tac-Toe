var squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var winningCombos = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];
var xClass = "<h1 class = changeKid>X</h1>";
var oClass = "<h1 class = changeKid>O</h1>";
var details = "<div class = form><p>Enter Your Name</p><br<input type = text name = fullname><br><input id = namer type = submit value = Set Name></div>"
//Object for players
function player(theValue, theName, thePersonality,theFirstTurn) {
   this.value = theValue;

   this.getNotation = function() {
      for (var i = 0; i < this.value.length; i++) {
         if (this.value[i] === "X") {
            return "X"
         } else if (this.value[i] === "O") {
            return "O"
         }
      }
   }

   this.name = theName;
   this.personality = thePersonality;
   this.boxes = [];
   this.won = 0;
   this.lose = 0;
   this.firstTurn = theFirstTurn
};
var playerOne = new player(xClass, "Player One", "Human",1);
var playerTwo = new player(oClass, "Computer", "Computer",0);
var choosingCheck = 0;
var theme = 0;
var stop = 0;
var turn = 0;
var priority = null;
var turnCheck = 0;
//For the table to work
var noOfGames = 0;
var tied = 0;

function changeTurns() {
   $("#switchTurns").click(function() {
      if (turnCheck === 0) {
         if(playerOne.firstTurn === 1)  {
            playerOne.firstTurn = 0;
            playerTwo.firstTurn = 1;
            turnCheck = 1;
            nukeIt();
         }
      } else {
         playerOne.firstTurn = 1;
         playerTwo.firstTurn = 0;
         turnCheck = 0;
         nukeIt();
      }
   });
};

//Choose X or 0
function chooseUnit() {
   $("#oB").click(function() {
      if (playerTwo.personality != "Human") {
         //Work Only if player is with cpu and gives it option to switch between X and O
         if (choosingCheck % 2 === 0) {
            // Apply Reset, replace comment
            nukeIt();
            $("#oB").html("Switch to X");
            playerOne.value = oClass
            playerTwo.value = xClass;
            choosingCheck = 1;
         } else {
            // Apply Reset, replace comment
            nukeIt();
            $("#oB").html("Switch to Circle");
            playerOne.value = xClass;
            playerTwo.value = oClass;
            choosingCheck = 0;
         };
      } else {
         //Work Only if there are 2 players and gives it option to switch between X and O
         if (choosingCheck % 2 === 0 && playerTwo.Personality != "Computer") {
            nukeIt();
            $("#oB").html("Switch to X - Player 1");
            playerOne.value = oClass;
            playerTwo.value = xClass;
            choosingCheck = 1;
         } else {
            nukeIt();
            $("#oB").html("Switch to Circle - Player 1");
            playerOne.value = xClass;
            playerTwo.value = oClass;
            choosingCheck = 0;
         }
      }
   });
};

//Switch to Two Players and Resets the table
function twoPlayers() {
   $("#oneB").click(function() {
      if (playerTwo.personality === "Computer") {
         //Defaults Everything to X and switches to Two Players
         turnCheck = 0;
         playerOne.firstTurn = 1;
         playerTwo.firstTurn = 0;
         nukeIt();
         playerOne.value = xClass;
         playerTwo.value = oClass;
         playerTwo.personality = "Human";
         playerOne.won = 0;
         playerTwo.won = 0;
         playerOne.lose = 0;
         playerTwo.lose = 0;
         noOfGames = 0;
         tied = 0;
         turnCheck = 0;
         $("#oneB").html("Switch to Single Player");
         $("#oB").html("Switch to Circle - Player 1");
         $("td").eq(1).html("0");
         $("td").eq(5).html("0");
         $("td").eq(2).html("0");
         $("td").eq(6).html("0");
         $("td").eq(4).html("Player Two");
         $("#Tie").html("0");
         $("#games").html("0");
      } else {
         //Defaults Everything to X and switches to Single Player
         turnCheck = 0
         playerOne.firstTurn = 1;
         playerTwo.firstTurn = 0;
         nukeIt();
         playerOne.value = xClass;
         playerTwo.value = oClass;
         playerTwo.personality = "Computer";
         playerOne.won = 0;
         playerTwo.won = 0;
         playerOne.lose = 0;
         playerTwo.lose = 0;
         noOfGames = 0;
         tied = 0;
         $("td").eq(1).html("0");
         $("td").eq(5).html("0");
         $("td").eq(2).html("0");
         $("td").eq(6).html("0");
         $("td").eq(4).html("Computer")
         $("#Tie").html("0");
         $("#games").html("0");
         $("#oneB").html("Switch to 2 Players");
         $("td").eq(4).html("Computer");
         $("#oB").html("Switch to Circle");
      }
   });
};

//Check Click and apply O or X
function checkWhereClick() {
   if (stop === 0) {
      $("#main").children().click(function() {
         if (playerTwo.personality === "Computer") {
            if (turn % 2 === 0 && $(this).hasClass("change") === false) {
               $(this).removeClass('default').addClass('change');
               $(this).append(playerOne.value);
               turn++;
               playerOne.value === xClass ? (playerOne.boxes.push($(this).index()), squares[$(this).index()] = "X") : (playerTwo.boxes.push($(this).index()), squares[$(this).index()] = "O")
               setTimeout(function() {
                  logic()
               }, 180); //As if computer Clicked!
            } else if (turn % 2 != 0 && $(this).hasClass("change") === false && priority != null) {
               $(this).removeClass('default').addClass('change');
               console.log($(this));
               $(this).append(playerTwo.value);
               playerTwo.value === xClass ? (playerTwo.boxes.push($(this).index()), squares[$(this).index()] = "X") : (playerTwo.boxes.push($(this).index()), squares[$(this).index()] = "O")
               turn++;
            };
         } else {
            if (turn % 2 === 0 && $(this).hasClass("change") === false) {
               $(this).removeClass('default').addClass('change');
               $(this).append(playerOne.value);
               turn = 1;
               playerOne.boxes.push($(this).index())

            } else if (turn % 2 != 0 && $(this).hasClass("change") === false) {
               $(this).removeClass('default').addClass('change');
               $(this).append(playerTwo.value);
               turn = 0;
               //pushes the index of the square clicked, to the respective array
               playerTwo.boxes.push($(this).index())
            };
         };
         didSomebodyWin();
      });
   }
};

//Reset - Back to defaults!
function nukeIt() {
   choosingCheck = 0;
   $("#main").children().removeClass("change").addClass("default").children().remove();
   playerOne.boxes = [];
   playerTwo.boxes = [];
   turn = 0;
   squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
   stop = 0;
   if(playerTwo.firstTurn === 1 && playerTwo.personality === "Computer") {
      turn = 1;
      setTimeout(function() {logic()},150);
   } else if(playerTwo.personality === "Human" && playerTwo.firstTurn === 1) {
      turn = 1;
   }
};

//Changing Themes
function changeTheme() {
   $("#theme").click(function() {
      if (theme % 2 === 0) {
         $("html").removeClass('darkTheme').addClass('brightTheme');
         theme = 1;
      } else {
         $("html").removeClass('brightTheme').addClass('darkTheme');
         theme = 0;
      };
   });
};

//Check If somebody won! and Table
function didSomebodyWin() {
   for (var k = 0; k < winningCombos.length; k++) {
      var something = 0;
      for (var i = 0; i < winningCombos[k].length; i++) {
         if (playerOne.boxes.indexOf(winningCombos[k][i]) != -1) {
            something++;
            if (something === 3) {
               stop = 1;
               $("body").find("div").eq(winningCombos[k][0] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
               $("body").find("div").eq(winningCombos[k][1] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
               $("body").find("div").eq(winningCombos[k][2] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
                  $("td").eq(1).html(++playerOne.won);
                  $("td").eq(6).html(++playerTwo.lose);
               $("#games").html(++noOfGames);
               setTimeout(function() {
                  nukeIt()
               }, 800);
            }
         }
      };
   };
   something = 0;
   for (var q = 0; q < winningCombos.length; q++) {
      something = 0;
      for (var r = 0; r < winningCombos[q].length; r++) {
         if (playerTwo.boxes.indexOf(winningCombos[q][r]) != -1) {
            something++;
            if (something === 3) {
               stop = 1;
               $("body").find("div").eq(winningCombos[q][0] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
               $("body").find("div").eq(winningCombos[q][1] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
               $("body").find("div").eq(winningCombos[q][2] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
                  $("td").eq(5).html(++playerTwo.won);
                  $("td").eq(2).html(++playerOne.lose);
               $("#games").html(++noOfGames);
               setTimeout(function() {
                  nukeIt()
               }, 800);
            }
         }
      }
   }

   if (playerOne.boxes.length + playerTwo.boxes.length === 9) {
      $("div:eq(1),div:eq(2),div:eq(3),div:eq(4),div:eq(5),div:eq(6),div:eq(7),div:eq(8),div:eq(9)").children().css('-webkit-animation', 'changeColorRed 0.8s 1');
      $("#games").html(++noOfGames);
      $("#Tie").html(++tied);
      setTimeout(function() {
         nukeIt()
      }, 800);
   };
}

//Ai 
function logic() {
   //Data needed for computer to be perfect
   priority = null;
   var playerTwoDomain = [];
   var randomCorner = Math.floor(Math.random() * 4) + 1;
   for (var z = 0; z < squares.length; z++) {
      if(playerTwo.personality === "Human") {
         if(squares[z] === playerTwo.getNotation()) {
            playerTwoDomain.push(z);
         } 
      } else if(playerOne.personality === "Human") {
            if(squares[z] === playerOne.getNotation()) {
            playerTwoDomain.push(z);
         }
      }
   } 
   //winning
   function winning() {
      for (var a = 0; a < winningCombos.length; a++) {
         var something = 0;
         for (var b = 0; b < winningCombos[a].length; b++) {
            if (playerTwo.boxes.indexOf(winningCombos[a][b]) != -1) {
               something++;
               if (something === 2 && squares.indexOf(winningCombos[a][0]) != -1) {
                  priority = 1;
                  $("body").find("div").eq(winningCombos[a][0] + 1).click();
                  b = winningCombos[a].length;
                  a = winningCombos.length;
                  break;
               } else if (something === 2 && squares.indexOf(winningCombos[a][1]) != -1) {
                  priority = 1;
                  $("body").find("div").eq(winningCombos[a][1] + 1).click();
                  b = winningCombos[a].length;
                  a = winningCombos.length;
                  break;
               } else if (something === 2 && squares.indexOf(winningCombos[a][2]) != -1) {
                  priority = 1;
                  $("body").find("div").eq(winningCombos[a][2] + 1).click();
                  b = winningCombos[a].length;
                  a = winningCombos.length;
                  break;
               }
            }
         }
      }
   }

   //Blocking
   function blocking() {
      for (var c = 0; c < winningCombos.length; c++) {
         var something = 0;
         for (var d = 0; d < winningCombos[c].length; d++) {
            if (playerOne.boxes.indexOf(winningCombos[c][d]) != -1) {
               something++;
               if (something === 2 && squares.indexOf(winningCombos[c][0]) != -1) {
                  priority = 1;
                  $("body").find("div").eq(winningCombos[c][0] + 1).click();
                  d = winningCombos[c].length;
                  c = winningCombos.length;
                  break;
               } else if (something === 2 && squares.indexOf(winningCombos[c][1]) != -1) {
                  priority = 1;
                  $("body").find("div").eq(winningCombos[c][1] + 1).click();
                  d = winningCombos[c].length;
                  c = winningCombos.length;
                  break;
               } else if (something === 2 && squares.indexOf(winningCombos[c][2]) != -1) {
                  priority = 1;
                  $("body").find("div").eq(winningCombos[c][2] + 1).click();
                  d = winningCombos[c].length;
                  c = winningCombos.length;
                  break;
               }
            }
         }
      }
   }

   //Taking center
   function center() {
      if (playerOne.boxes.indexOf(0) != -1 && squares.indexOf(4) != -1 && turn === 1 ||
         playerOne.boxes.indexOf(2) != -1 && squares.indexOf(4) != -1 && turn === 1 ||
         playerOne.boxes.indexOf(6) != -1 && squares.indexOf(4) != -1 && turn === 1 ||
         playerOne.boxes.indexOf(8) != -1 && squares.indexOf(4) != -1 && turn === 1) {
         priority = 1;
         $("#fivth").click();
      } else if (playerOne.boxes.indexOf(1) != -1 && squares.indexOf(4) != -1 && turn > 2 ||
         playerOne.boxes.indexOf(3) != -1 && squares.indexOf(4) != -1 && turn > 2 ||
         playerOne.boxes.indexOf(5) != -1 && squares.indexOf(4) != -1 && turn > 2 ||
         playerOne.boxes.indexOf(7) != -1 && squares.indexOf(4) != -1 && turn > 2) {
         priority = 1;
         $("#fivth").click();
      };
   };
   //Taking Corner
   function corner() {
         if (turn === 1) {
            if (playerOne.boxes.indexOf(1) != -1) {
               priority = 1;
               randomCorner <= 2 ? $("#first").click() : $("#third").click();
            } else if (squares.indexOf("X") === -1 && squares.indexOf("O") === -1) {
               priority = 1;
               if (randomCorner === 1) {
                  $("#first").click();
               } else if (randomCorner === 2) {
                  $("#third").click();
               } else if (randomCorner === 3) {
                  $("#seventh").click();
               } else if (randomCorner === 4) {
                  $("#nine").click();
               }
            } else if (playerOne.boxes.indexOf(3) != -1) {
               priority = 1;
               randomCorner <= 2 ? $("#first").click() : $("#seventh").click();
            } else if (playerOne.boxes.indexOf(5) != -1) {
               priority = 1;
               randomCorner <= 2 ? $("#third").click() : $("#nine").click();
            } else if (playerOne.boxes.indexOf(7) != -1) {
               priority = 1;
               randomCorner <= 2 ? $("#seventh").click() : $("#nine").click();
            }
         }
      }
      //Blocking a Fork
   function blockFork() {
      if (playerOne.boxes.indexOf(0) != -1 && playerOne.boxes.indexOf(8) != -1 ||
         playerOne.boxes.indexOf(2) != -1 && playerOne.boxes.indexOf(6) != -1) {
         if (randomCorner === 1) {
            priority = 1;
            $("#second").click();
         } else if (randomCorner === 2) {
            priority = 1;
            $("#sixth").click();
         } else if (randomCorner === 3) {
            priority = 1;
            $("#eight").click();
         } else if (randomCorner === 4) {
            priority = 1;
            $("#fourth").click();
         };
      };
   };

   // Empty middle Edge
   function emptyEdge() {
      if (turn >= 4) {
         if (squares.indexOf(1) != -1) {
            priority = 1;
            $("#second").click();
         } else if (squares.indexOf(3) != -1) {
            priority = 1;
            $("#fourth").click();
         } else if (squares.indexOf(5) != -1) {
            priority = 1;
            $("#sixth").click();
         } else if (squares.indexOf(7) != -1) {
            priority = 1;
            $("#eight").click();
         }
      }
   };

   //Empty Corner
   function emptyCorner() {
      if (turn >= 3) {
         if (playerOne.boxes.indexOf(0) === -1 && squares.indexOf(0) != -1 || playerTwo.boxes.indexOf(0) === -1 && squares.indexOf(0) != -1) {
            priority = 1;
            $("#first").click();
         } else if (playerOne.boxes.indexOf(2) === -1 && squares.indexOf(2) != -1 || playerTwo.boxes.indexOf(2) === -1 && squares.indexOf(2) != -1) {
            priority = 1;
            $("#third").click();
         } else if (playerOne.boxes.indexOf(6) === -1 && squares.indexOf(6) != -1 || playerTwo.boxes.indexOf(6) === -1 && squares.indexOf(6) != -1) {
            priority = 1;
            $("#seventh").click();
         } else if (playerOne.boxes.indexOf(8) === -1 && squares.indexOf(8) != -1 || playerTwo.boxes.indexOf(8) === -1 && squares.indexOf(8) != -1) {
            priority = 1;
            $("#nine").click();
         }
      }
   };

   //Forking
   function fork() {
      if (turn === 5 || turn === 6) {
         //First thing is to get the empty positions on the board
         var ways = 0;
         var nextMove = undefined;
         for (var m = 0; m < squares.length; m++) {
            ways = 0;
            console.log(playerTwo.boxes + "Before anything added to boxes");
            var checkLength = playerTwo.boxes.length;
            if (squares.indexOf(m) != -1 && squares.indexOf(m) != -1) {
               playerTwo.boxes.push(m);
               dummyWinning();
            }

            function dummyWinning() {
               console.log("Moves - " + m);
               for (var e = 0; e < winningCombos.length; e++) {
                  var something = 0;
                  for (var f = 0; f < winningCombos[e].length; f++) {
                     if (playerTwoDomain.indexOf(winningCombos[e][f]) != -1) {
                        something = 0;
                        if (innerCheck === e) {
                           ways--;
                        }
                        break;
                     }
                     if (playerTwo.boxes.indexOf(winningCombos[e][f]) != -1) {
                        something++;
                        if (something === 2) {
                           ways++;
                           var innerCheck = e
                        }
                        if (ways === 2) {
                           playerTwo.boxes.pop()
                           nextMove = m;
                           e = winningCombos.length 
                           f = 3;
                           break;
                        }
                     }
                  }
               }
            }
            if (checkLength + 1 === playerTwo.boxes.length) {
               playerTwo.boxes.pop();
            }
         }
         if (nextMove != undefined) {
            priority = 1
            $("body").find("div").eq(nextMove + 1).click();
         };
      }
   };

   if (priority != 1) {
      winning();
   }

   if (priority != 1) {
      blocking();
   }

   if (priority != 1) {
      fork();
   }

   if (priority != 1) {
      blockFork();
   }

   if (priority != 1) {
      center();
   }

   if (priority != 1) {
      corner();
   }

   if (priority != 1) {
      emptyCorner();
   };

   if (priority != 1) {
      emptyEdge();
   }
}

$(document).ready(function() {
   twoPlayers();
   checkWhereClick();
   changeTurns();
   changeTheme();
   chooseUnit();
});
