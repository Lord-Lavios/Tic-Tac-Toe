var squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var players = 1;
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
var circle = [];
var x = [];
var playerOne = xClass;
var playerTwo = oClass;
var choosingCheck = 0;
var theme = 0;
var stop = 0;
var turn = 0;
var priority = null;
var PlayerOneScoreWin = 0;
var PlayerOneScoreLose = 0;
var PlayerTwoScoreWin = 0;
var PlayerTwoScoreLose = 0;
var noOfGames = 0;
var tied = 0;

//Choose X or 0
function chooseUnit() {
   $("#oB").click(function() {
      if (players === 1) {
         //Work Only if player is with cpu and gives it option to switch between X and O
         if (choosingCheck % 2 === 0) {
            // Apply Reset, replace comment
            nukeIt();
            $("#oB").html("Switch to X");
            playerOne = oClass;
            playerTwo = xClass;
            choosingCheck = 1;
         } else {
            // Apply Reset, replace comment
            nukeIt();
            $("#oB").html("Switch to Circle");
            playerOne = xClass;
            playerTwo = oClass;
            choosingCheck = 0;
         };
      } else {
         //Work Only if there are 2 players and gives it option to switch between X and O
         if (choosingCheck % 2 === 0 && players === 2) {
            nukeIt();
            $("#oB").html("Switch to X - Player 1");
            playerOne = oClass;
            playerTwo = xClass;
            choosingCheck = 1;
         } else {
            nukeIt();
            $("#oB").html("Switch to Circle - Player 1");
            playerOne = xClass;
            playerTwo = oClass;
            choosingCheck = 0;
         }
      }
   });
};

//Switch to Two Players
function twoPlayers() {
   $("#oneB").click(function() {
      if (players === 1) {
         //Defaults Everything to X and switches to Two Players
         nukeIt();
         players = 2;
         $(this).html("Switch to Single Player");
         $("th:nth-child(3)").html("Player Two");
         $("#oB").html("Switch to Circle - Player 1");
      } else {
         //Defaults Everything to X and switches to Single Player
         nukeIt();
         players = 1;
         $(this).html("Switch to 2 Players");
         $("th:nth-child(3)").html("Computer");
         $("#oB").html("Switch to Circle");
      }
   });
};

//Check Click and apply O or X
function checkWhereClick() {
  if(stop === 0) {
   $("#main").children().click(function clicker() {
      if (players === 1) {
         //Work with player 1 assigning player to cpu
         if (turn % 2 === 0 && $(this).hasClass("change") === false) {
            $(this).removeClass('default').addClass('change');
            $(this).append(playerOne);
            turn++;
            //pushes the index of the square clicked, to the respective array
            playerOne === xClass ? (x.push($(this).index()), squares[$(this).index()] = "x") : (circle.push($(this).index()), squares[$(this).index()] = "circle")
            setTimeout(function() {
               logic()
            }, 180); //As if computer Clicked!
         } else if (turn % 2 != 0 && $(this).hasClass("change") === false && priority != null) {
            $(this).removeClass('default').addClass('change');
            $(this).append(playerTwo);
            playerTwo === xClass ? (x.push($(this).index()), squares[$(this).index()] = "x") : (circle.push($(this).index()), squares[$(this).index()] = "circle")
            turn++;
         };
      } else {
         if (turn % 2 === 0 && $(this).hasClass("change") === false) {
            //Works only where there are 2 players assigning player 2 to the cpu
            $(this).removeClass('default').addClass('change');
            $(this).append(playerOne);
            turn = 1;
            //pushes the index of the square clicked, to the respective array
            playerOne === xClass ? x.push($(this).index()) : circle.push($(this).index());
         } else if (turn % 2 != 0 && $(this).hasClass("change") === false) {
            $(this).removeClass('default').addClass('change');
            $(this).append(playerTwo);
            turn = 0;
            //pushes the index of the square clicked, to the respective array
            playerTwo === xClass ? x.push($(this).index()) : circle.push($(this).index());
         };
      };
      console.log(x);
      console.log(circle);
      console.log(squares);
      didSomebodyWin();
    });
  }
};

//Reset - Back to defaults!
function nukeIt() {
   choosingCheck = 0;
   turn = 0;
   $("#main").children().removeClass("change").addClass("default").children().remove();
   playerOne = xClass;
   playerTwo = oClass;
   x = [];
   stop = 0;
   circle = [];
   squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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

//Check If somebody won!
function didSomebodyWin() {
   for (var k = 0; k < winningCombos.length; k++) {
      var something = 0;
      for (var i = 0; i < winningCombos[k].length; i++) {
         if (circle.indexOf(winningCombos[k][i]) != -1) {
            something++;
            if (something === 3) {
              stop = 1;
              $("body").find("div").eq(winningCombos[k][0] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
              $("body").find("div").eq(winningCombos[k][1] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
              $("body").find("div").eq(winningCombos[k][2] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
              if (playerOne === oClass) {
              $("td").eq(1).html(++PlayerOneScoreWin);
              $("td").eq(5).html(++PlayerTwoScoreLose);
            } else if (playerTwo === oClass) {
              $("td").eq(2).html(++PlayerTwoScoreWin);
              $("td").eq(4).html(++PlayerOneScoreLose);
            }
              $("p").html(++noOfGames);
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
         if (x.indexOf(winningCombos[q][r]) != -1) {
            something++;
            if (something === 3) {
              stop = 1;
              $("body").find("div").eq(winningCombos[r][0] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
              $("body").find("div").eq(winningCombos[r][1] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
              $("body").find("div").eq(winningCombos[r][2] + 1).children().css('-webkit-animation', 'changeColor 0.8s 1');
              if (playerOne === xClass) {
              $("td").eq(1).html(++PlayerOneScoreWin);
              $("td").eq(5).html(++PlayerTwoScoreLose);
            } else if (playerTwo === xClass) {
              $("td").eq(2).html(++PlayerTwoScoreWin);
              $("td").eq(4).html(++PlayerOneScoreLose);
            }
              $("p").html(++noOfGames); 
               setTimeout(function() {
                  nukeIt()
               }, 800);
            }
         }
      }
   }

   if (circle.length + x.length === 9) {
    $("div:eq(1),div:eq(2),div:eq(3),div:eq(4),div:eq(5),div:eq(6),div:eq(7),div:eq(8),div:eq(9)").children().css('-webkit-animation', 'changeColorRed 0.8s 1');
    $("p").html(++noOfGames);
    $("#Tie").html(++tied);
      setTimeout(function() {
         nukeIt()
      }, 800);
   };
}

//Ai
function logic() {
   var whoIsPlayerOne = playerOne === xClass ? x : circle;
   var whoIsPlayerTwo = playerTwo === xClass ? x : circle;
   priority = null;
   var randomCorner = Math.floor(Math.random() * 4) + 1;

   //winning
   function winning() {
      for (var a = 0; a < winningCombos.length; a++) {
         var something = 0;
         for (var b = 0; b < winningCombos[a].length; b++) {
            if (whoIsPlayerTwo.indexOf(winningCombos[a][b]) != -1) {
               something++;
               if (something === 2 && squares.indexOf(winningCombos[a][0]) != -1) {
                  priority = 1;
                  console.log("Winning Worked 1");
                  $("body").find("div").eq(winningCombos[a][0] + 1).click();
               } else if (something === 2 && squares.indexOf(winningCombos[a][1]) != -1) {
                  priority = 1;
                  console.log("Winning Worked 2");
                  $("body").find("div").eq(winningCombos[a][1] + 1).click();
               } else if (something === 2 && squares.indexOf(winningCombos[a][2]) != -1) {
                  priority = 1;
                  console.log("Winning Worked 3");
                  $("body").find("div").eq(winningCombos[a][2] + 1).click();
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
            if (whoIsPlayerOne.indexOf(winningCombos[c][d]) != -1) {
               something++;
               if (something === 2 && squares.indexOf(winningCombos[c][0]) != -1) {
                  priority = 1;
                  console.log("Blocking Worked 1");
                  $("body").find("div").eq(winningCombos[c][0] + 1).click();
               } else if (something === 2 && squares.indexOf(winningCombos[c][1]) != -1) {
                  priority = 1;
                  console.log("Blocking Worked 2");
                  $("body").find("div").eq(winningCombos[c][1] + 1).click();
               } else if (something === 2 && squares.indexOf(winningCombos[c][2]) != -1) {
                  priority = 1;
                  console.log("Blocking Worked 3");
                  $("body").find("div").eq(winningCombos[c][2] + 1).click();
               }
            }
         }
      }
   }

   //Taking center
   function center() {
      if (whoIsPlayerOne.indexOf(0) != -1 && squares.indexOf(4) != -1 && turn === 1 ||
         whoIsPlayerOne.indexOf(2) != -1 && squares.indexOf(4) != -1 && turn === 1 ||
         whoIsPlayerOne.indexOf(6) != -1 && squares.indexOf(4) != -1 && turn === 1 ||
         whoIsPlayerOne.indexOf(8) != -1 && squares.indexOf(4) != -1 && turn === 1) {
         console.log("Center Worked " + priority);
         priority = 1;
         $("#fivth").click();
      } else if (whoIsPlayerOne.indexOf(1) != -1 && squares.indexOf(4) != -1 && turn > 2 ||
         whoIsPlayerOne.indexOf(3) != -1 && squares.indexOf(4) != -1 && turn > 2 ||
         whoIsPlayerOne.indexOf(5) != -1 && squares.indexOf(4) != -1 && turn > 2 ||
         whoIsPlayerOne.indexOf(7) != -1 && squares.indexOf(4) != -1 && turn > 2) {
         console.log("Center Worked turn > 1");
         priority = 1;
         $("#fivth").click();
      };
   };
   //Taking Corner
   function corner() {
      if (turn === 1) {
         if (whoIsPlayerOne.indexOf(1) != -1) {
            priority = 1;
            console.log("Corner 1");
            randomCorner <= 2 ? $("#first").click() : $("#third").click();
         } else if (whoIsPlayerOne.indexOf(3) != -1) {
            priority = 1;
            console.log("Corner 2");
            randomCorner <= 2 ? $("#first").click() : $("#seventh").click();
         } else if (whoIsPlayerOne.indexOf(5) != -1) {
            priority = 1;
            console.log("Corner 3");
            randomCorner <= 2 ? $("#third").click() : $("#nine").click();
         } else if (whoIsPlayerOne.indexOf(7) != -1) {
            priority = 1;
            console.log("Corner 4");
            randomCorner <= 2 ? $("#seventh").click() : $("#nine").click();
         } else if (whoIsPlayerOne.indexOf(4) != -1) {
            priority = 1;
            console.log("Corner 5, aka Reply center");
            if (randomCorner === 1) {
               $("#first").click();
            } else if (randomCorner === 2) {
               $("#third").click();
            } else if (randomCorner === 3) {
               $("#seventh").click();
            } else if (randomCorner === 4) {
               $("#nine").click();
            }
         }
      }
      /* else if (turn <= 4) {
            console.log("Corner turn > 5");
            if (whoIsPlayerOne.indexOf(0) != -1 && squares.indexOf(8) != -1) {
              priority = 1;
              $("#nine").click();
            } else if (whoIsPlayerOne.indexOf(2) != -1 && squares.indexOf(6) != -1) {
              priority = 1;
              $("#seventh").click();
            } else if (whoIsPlayerOne.indexOf(6) != -1 && squares.indexOf(2) != -1) {
              priority = 1;
              $("#third").click();
            } else if (whoIsPlayerOne.indexOf(8) != -1 && squares.indexOf(0) != -1) {
              priority = 1; 
              $("#first").click();
            } else if(squares.indexOf(2) != -1) {
              priority = 1;
              $("#third").click();
            } else if(squares.indexOf(0) != -1) {
              priority = 1;
              $("#first").click();
            } else if(squares.indexOf(6) != -1) {
              priority = 1;
              $("#seventh").click();
            } else if(squares.indexOf(8) != -1) {
              priority = 1;
              $("#nine").click();
            }    
          }; */
   }

   //Blocking a Fork
   function blockFork() {
      if (whoIsPlayerOne.indexOf(0) != -1 && whoIsPlayerOne.indexOf(8) != -1 ||
         whoIsPlayerOne.indexOf(2) != -1 && whoIsPlayerOne.indexOf(6) != -1) {
         if (randomCorner === 1) {
            priority = 1;
            console.log("Block Fork Worked Second" + priority);
            $("#second").click();
         } else if (randomCorner === 2) {
            priority = 1;
            console.log("Block Fork Worked Third" + priority);
            $("#sixth").click();
         } else if (randomCorner === 3) {
            priority = 1;
            console.log("Block Fork Worked eight" + priority);
            $("#eight").click();
         } else if (randomCorner === 4) {
            priority = 1;
            console.log(randomCorner + " Block Fork Worked third" + priority);
            $("#fourth").click();
         };
      };
   };

   // Empty middle Edge
   function emptyEdge() {
      if (turn >= 4) {
         if (squares.indexOf(1) != -1) {
            priority = 1;
            console.log("emptyEdge Worked! 1");
            $("#second").click();
         } else if (squares.indexOf(3) != -1) {
            priority = 1;
            console.log("emptyEdge Worked! 2");
            $("#fourth").click();
         } else if (squares.indexOf(5) != -1) {
            priority = 1;
            console.log("emptyEdge Worked! 3");
            $("#sixth").click();
         } else if (squares.indexOf(7) != -1) {
            priority = 1;
            console.log("emptyEdge Worked! 4");
            $("#eight").click();
         }
      }
   };

   //Empty Corner
   function emptyCorner() {
      if (turn >= 3) {
         if (whoIsPlayerOne.indexOf(0) === -1 && squares.indexOf(0) != -1 || whoIsPlayerTwo.indexOf(0) === -1 && squares.indexOf(0) != -1) {
            priority = 1;
            console.log("emprtCorner worked 1");
            $("#first").click();
         } else if (whoIsPlayerOne.indexOf(2) === -1 && squares.indexOf(2) != -1 || whoIsPlayerTwo.indexOf(2) === -1 && squares.indexOf(2) != -1) {
            priority = 1;
            console.log("emprtCorner worked 2");
            $("#third").click();
         } else if (whoIsPlayerOne.indexOf(6) === -1 && squares.indexOf(6) != -1 || whoIsPlayerTwo.indexOf(6) === -1 && squares.indexOf(6) != -1) {
            priority = 1;
            console.log("emprtCorner worked 3");
            $("#seventh").click();
         } else if (whoIsPlayerOne.indexOf(8) === -1 && squares.indexOf(8) != -1 || whoIsPlayerTwo.indexOf(8) === -1 && squares.indexOf(8) != -1) {
            priority = 1;
            console.log("emprtCorner worked 4");
            $("#nine").click();
         }
      }
   };

   //Forking
   function fork() {
      if (turn === 6) {

      };
   };

   if (priority != 1) {
      winning();
   }

   if (priority != 1) {
      fork();
   }

   if (priority != 1) {
      blocking();
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
   changeTheme();
   chooseUnit();
});