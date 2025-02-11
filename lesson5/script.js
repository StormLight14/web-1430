let defaultMissions = ["find the secret weapon", "hide the secret weapon", "sell the secret weapon"];

function initalizeDashboard() {
  let container = document.getElementById("mission-container");
  let missions = document.createElement("ul")
  missions.id = "missions";
  for (let i = 0; i < defaultMissions.length; i++) {
    let mission = document.createElement("li");
    mission.innerText = defaultMissions[i];
    missions.appendChild(mission);
  }

  container.appendChild(missions);
}

function addMission(text) {
  let missions = document.getElementById("missions");
  let newMission = document.createElement("li");
  newMission.innerText = text;
  missions.appendChild(newMission);
  console.log("Added mission " + text);
}

function updateMission(index, newText) {
  let missions = document.getElementById("missions");
  for (let i = 0; i < missions.children.length; i++) {
    let mission = missions.children[i];
    if (i == index) {
      mission.innerText = newText;
    }
  }
  console.log(`Updated mission of ID ${index} to '${newText}'`);
}

function deleteMission(index) {
  let missions = document.getElementById("missions");
  for (let i = 0; i < missions.children.length; i++) {
    if (i == index) {
      missions.removeChild(missions.children[i]);
    }
  }
  console.log(`Deleted mission of ID ${index}`);
}

function insertAfter(newText, referenceIndex) {
  let missions = document.getElementById("missions");
  for (let i = 0; i < missions.children.length; i++) {
    if (i == referenceIndex) {
      let newMission = document.createElement("li");
      newMission.innerText = newText;
      missions.insertBefore(newMission, missions.children[i + 1]);
      break;
    }
  }
  console.log(`Inserted mission '${newText}' after ID ${referenceIndex}`);
}

initalizeDashboard();
addMission("steal back the secret weapon");
updateMission(4, "replaced mission text");
deleteMission(4);
insertAfter("new mission inserted after 2", 2);