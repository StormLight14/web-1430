let adventure_data = {
  "locations": ["Mega Mountain", "Sloppy Slopes", "Very Hot Volcano", "Carnivorous Cave", "Heinous Hideout"],
  "actions": ["climb", "search", "explore", "hide", "run", "loot"],
  "characters": ["very wacky wizard", "talking cat", "rich dude", "rock"]
};

function generateAdventure(data) {
  let location = data["locations"][Math.floor(Math.random() * data["locations"].length)];
  let action = data["actions"][Math.floor(Math.random() * data["actions"].length)];
  let character = data["characters"][Math.floor(Math.random() * data["characters"].length)];

  console.log(`You will ${action} at the ${location} with a ${character}!`);
}

function addAdventureOption(arr, newOption) {
  arr.push(newOption);
  console.log(arr);
}

addAdventureOption(adventure_data["locations"], prompt("Enter a new location: "));
addAdventureOption(adventure_data["actions"], prompt("Enter a new action: "));
addAdventureOption(adventure_data["characters"], prompt("Enter a new characters: "));

generateAdventure(adventure_data);
generateAdventure(adventure_data);
generateAdventure(adventure_data);