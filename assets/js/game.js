// var playerName = 'Clank McKrank';
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
//console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[1]);
console.log(enemyNames[2]);

// fight function
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney)
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;
      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  } // end of while loop
}; // end of fight function

// fuction to start a new game
var startGame = function(){
  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for(var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! " + (i+1));

      // pick new enemy to fight based on the enemyNames array 
      var pickedEnemyName = enemyNames[i];
      
      fight(pickedEnemyName);
      if(playerHealth > 0 && i < enemyNames.length -1) {
        //ask if player wants to use the store before the next round
        var storeConfirm =  window.confirm ("The fight is over, vist the store before the next round?");
        
        //if yes take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player is not alive, break out of the loop and let endGame() run
    else { 
      window.alert("You have lost the battle! Game Over!" ); 
    }
  }
  // After loop ends, either out of player health order enemies to fight, run endGame()
  endGame();
};

var shop = function(){
  //ask the player if what they would like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  // use swith statement to carry out action 
  switch (shopOptionPrompt) {
    case "REFILL": //new case
    case "refill":
      if(playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
        break;
      } else{
        window.alert("You do not have enough money!")
      }
    
    case "UPGRADE": //new case
    case "upgrade":
      if(playerMoney >= 7) {
        window.alert("Upgarding player's attack by 6 for 7 dollars.");

        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
        break;
      } else{
        window.alert("You do not have enough money!")
      }
    
    case "LEAVE": //new case
    case "leave":
      window.alert("Leaving the store.");

      break;

    default:
      window.alert("You did not pick a valid option. Try again.");

      // call the shop() to make player pick a option
      shop();
      break;

  }
};

//start the game when the page loads 
startGame();