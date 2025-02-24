let rock_button = document.getElementById("rock-button");
let paper_button = document.getElementById("paper-button");
let scissors_button = document.getElementById("scissors-button");
let result = document.getElementById("result");
let result_container = document.getElementById("result-container");
let game_container = document.getElementById("game-container");
let game_end_container = document.getElementById("game-end-container");
let play_again_button = document.getElementById("play-again");
let wins_label = document.getElementById("wins");
let computer_wins_label = document.getElementById("computer-wins");
let ties_label = document.getElementById("ties");
let wins = 0;
let computer_wins = 0;
let ties = 0;
let game_result = document.getElementById("game-result");
let reset_game_button = document.getElementById("reset-game");

// converts to string choice based on 0, 1, or 2
function int_to_choice(num) {
  let choice = null;
  if (num == 0) {
    choice = "rock";
  } else if (num == 1) {
    choice = "paper";
  } else if (num == 2) {
    choice = "scissors";
  }

  return choice;
}

// returns random string choice
function get_random_choice() {
  let rand_int = Math.floor(Math.random() * 3); // 0, 1, or 2
  return int_to_choice(rand_int);
}

function button_clicked(button) {
  let computer_choice = get_random_choice();

  result.innerText = "ERROR: NO RESULT";
  if (button == computer_choice) {
    result.innerText = `Tie! You both chose: ${computer_choice}`;
    ties += 1;
  } else if ((button == "rock" && computer_choice == "paper") || (button == "scissors" && computer_choice == "rock") || (button == "paper" && computer_choice == "scissors")) {
    result.innerText = `You lost! Computer chose: ${computer_choice}`;
    computer_wins += 1;
    if (computer_wins >= 5) {
      game_ended("Computer");
      return;
    }
  } else {
    result.innerText = `You won! Computer chose: ${computer_choice}`;
    wins += 1;
    if (wins >= 5) {
      game_ended("You");
      return;
    }
  }

  result_container.style.display = "flex";
  game_container.style.display = "none";
  update_scoreboard();
}

function play_again() {
  result_container.style.display = "none";
  game_container.style.display = "flex";
}

function update_scoreboard() {
  wins_label.innerText = `Wins: ${wins}`;
  computer_wins_label.innerText = `Computer Wins: ${computer_wins}`;
  ties_label.innerText = `Ties: ${ties}`;
}

function game_ended(winner) {
  update_scoreboard()
  game_container.style.display = "none";
  result_container.style.display = "none";
  game_end_container.style.display = "flex";

  game_result.innerText = `${winner} won the Game!`;
}

function reset_game() {
  game_container.style.display = "flex";
  result_container.style.display = "none";
  game_end_container.style.display = "none";
  wins = 0;
  computer_wins = 0;
  ties = 0;
  update_scoreboard();
}

rock_button.onclick = () => button_clicked("rock");
paper_button.onclick = () => button_clicked("paper");
scissors_button.onclick = () => button_clicked("scissors");
play_again_button.onclick = () => play_again();
reset_game_button.onclick = () => reset_game();
