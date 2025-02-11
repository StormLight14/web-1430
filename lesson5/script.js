let missionList = ["Assassinate the president", "Assassinate the president", "Assassinate the president"];

function initalizeDashboard() {
  let container = document.getElementById("mission-container");
  let missions = document.createElement("ul")
  for (let i = 0; i < missionList.length; i++) {
    let mission = createElement("li");
    mission.innerText = missionList[i];
    missions.appendChild(mission);
  }

  container.appendChild(missions);
}

function addMission(text) {
  let missions = document.getElementById("missions");
  let newMission = document.createElement("li");
  newMission.innerText = text;
  missionList.push(text);
  missions.appendChild(newMission);
}

function updateMission(index, newText) {
  let missions = document.getElementById("missions");
  for (let i = 0; i < missions.children.length; i++) {
    let mission = missions.children[i];
    if (i == newText) {
      mission.innerText = newText;
      missionList[i] = newText;
    }
  }
}

function deleteMission(index) {
  let missions = document.getElementById("missions");
  missionList.remove()
}

