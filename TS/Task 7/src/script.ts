/* ------------------------------ TASK 7 -----------------------------------
Parašykite TS kodą, vartotojui atėjus į tinklapį kreipsis į NBA.json failą ir iš jo atvaizduos visas NBA komandas ir jų žaidėjus. 
Kiekviena komanda turės savo atvaizdavimo "kortelę", kurioje bus 
nurodomas komandos pavadinimas ir papildomose "mini kortelėse" išvardinti žaidėjai su vardais, pavardėmis ir nuoroda į daugiau informacijos apie juos.

Pastaba: Informacija apie komandas bei žaidėjus turi turėti bent minimalų stilių;
-------------------------------------------------------------------------- */

const ENDPOINT = '../NBA.json';

interface Player {
  firstName: string;
  lastName: string;
  googleSearch: string;
}

interface Team {
  id: number;
  name: string;
  players: Player[];
}

async function fetchTeams(): Promise<Team[]> {
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data.teams;
}

function createPlayerCard(player: Player): HTMLElement {
  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';
  playerCard.innerHTML = `
    <p>${player.firstName} ${player.lastName}</p>
    <a href="${player.googleSearch}" target="_blank">More Info</a>
  `;
  return playerCard;
}

function createTeamCard(team: Team): HTMLElement {
  const teamCard = document.createElement('div');
  teamCard.className = 'team-card';
  teamCard.innerHTML = `<h2>${team.name}</h2>`;

  team.players.forEach(player => {
    const playerCard = createPlayerCard(player);
    teamCard.appendChild(playerCard);
  });

  return teamCard;
}

async function displayTeams(): Promise<void> {
  const output = document.querySelector('#output');
  if (!output) return;

  const teams = await fetchTeams();
  teams.forEach(team => {
    const teamCard = createTeamCard(team);
    output.appendChild(teamCard);
  });
}

displayTeams().catch(console.error);
