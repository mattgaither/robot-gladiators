
// fight function
var fight = function(enemy) {
  console.log(enemy);
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name+ ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money)
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - playerInfo.attack);
    console.log(
      playerInfo.name+ ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;
      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);


    playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name+ '. ' + playerInfo.name+ ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name+ ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name+ ' still has ' + playerInfo.health + ' health left.');
    }
  } // end of while loop
}; // end of fight function

// fuction to start a new game
var startGame = function(){
  // reset player stats
  playerInfo.rest();

  for(var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! " + (i+1));

      // pick new enemy to fight based on the enemy.names array 
      var pickedEnemyObj = enemyInfo[i];

      pickedEnemyObj.health = randomNumber(40, 60);

      fight(pickedEnemyObj);
      if(playerInfo.health > 0 && i < enemyInfo.length -1) {
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
      if(playerInfo.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        playerInfo.health = playerInfo.health + 20;
        playerInfo.money = playerInfo.money - 7;
        break;
      } else{
        window.alert("You do not have enough money!")
      }
    
    case "UPGRADE": //new case
    case "upgrade":
      if(playerInfo.money >= 7) {
        window.alert("Upgarding player's attack by 6 for 7 dollars.");

        playerInfo.attack = playerInfo.attack + 6;
        playerInfo.money = playerInfo.money - 7;
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

// fuction to generate a random numeric value
var randomNumber = function(min,max) {
  var value =  Math.floor(Math.random() * (21)) + 40;

  return value;
}

var playerInfo = {
  name: window.prompt("what is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    this.health += 20;
    this.money -= 7;
  },
  upgradeAttack: function() {
    this.attack += 6;
    this.money -= 7;
  }
};

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }
];



//start the game when the page loads 
startGame();