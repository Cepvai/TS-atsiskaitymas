"use strict";
const TEAMS_ENDPOINT = 'teams.json';
const PLAYERS_ENDPOINT = 'players.json';
async function fetchTeams() {
    const response = await fetch(TEAMS_ENDPOINT);
    if (!response.ok)
        throw new Error('Teams fetch failed');
    const data = await response.json();
    return data.teams;
}
async function fetchPlayers() {
    const response = await fetch(PLAYERS_ENDPOINT);
    if (!response.ok)
        throw new Error('Players fetch failed');
    const data = await response.json();
    return data.players;
}
function createPlayerCard(player) {
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    playerCard.innerHTML = `
    <p>${player.firstName} ${player.lastName}</p>
    <a href="https://www.google.com/search?q=${player.firstName}+${player.lastName}" target="_blank">More Info</a>
  `;
    return playerCard;
}
function createTeamCard(team, players, modal, playerList) {
    const teamCard = document.createElement('div');
    teamCard.className = 'team-card';
    teamCard.innerHTML = `
    <h2>${team.teamName}</h2>
    <p>Simple Name: ${team.simpleName}</p>
    <p>Abbreviation: ${team.abbreviation}</p>
    <p>Location: ${team.location}</p>
    <button class="players-button">Players</button>
  `;
    const button = teamCard.querySelector('.players-button');
    button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
        const teamPlayers = players.filter(player => player.teamId === team.id);
        playerList.innerHTML = '';
        teamPlayers.forEach(player => {
            const playerCard = createPlayerCard(player);
            playerList.appendChild(playerCard);
        });
        modal.style.display = 'block';
    });
    return teamCard;
}
async function displayTeamsAndPlayers() {
    const output = document.querySelector('#output');
    const modal = document.querySelector('.modal');
    const playerList = document.querySelector('#player-list');
    const closeModal = document.querySelector('.close');
    if (!output || !modal || !playerList || !closeModal)
        return;
    try {
        const teams = await fetchTeams();
        const players = await fetchPlayers();
        teams.forEach(team => {
            const teamCard = createTeamCard(team, players, modal, playerList);
            output.appendChild(teamCard);
        });
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
displayTeamsAndPlayers().catch(console.error);
