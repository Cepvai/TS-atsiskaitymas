"use strict";
const ENDPOINT = '../NBA.json';
async function fetchTeams() {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data.teams;
}
function createPlayerCard(player) {
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    playerCard.innerHTML = `
    <p>${player.firstName} ${player.lastName}</p>
    <a href="${player.googleSearch}" target="_blank">More Info</a>
  `;
    return playerCard;
}
function createTeamCard(team) {
    const teamCard = document.createElement('div');
    teamCard.className = 'team-card';
    teamCard.innerHTML = `<h2>${team.name}</h2>`;
    team.players.forEach(player => {
        const playerCard = createPlayerCard(player);
        teamCard.appendChild(playerCard);
    });
    return teamCard;
}
async function displayTeams() {
    const output = document.querySelector('#output');
    if (!output)
        return;
    const teams = await fetchTeams();
    teams.forEach(team => {
        const teamCard = createTeamCard(team);
        output.appendChild(teamCard);
    });
}
displayTeams().catch(console.error);
