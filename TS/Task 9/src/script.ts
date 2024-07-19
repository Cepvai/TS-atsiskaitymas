/* ------------------------------ TASK 9 -----------------------------------
Parašykite TS kodą, vartotojui atėjus į tinklapį kreipsis į NBA.json failą ir iš jo atvaizduos visas NBA komandas. 
Kiekviena komanda turės savo atvaizdavimo "kortelę", kurioje bus 
nurodomas komandos: pilnas pavadinimas, paprastas pavadinimas, trumpinys, lokacija ir mygtukas "Players", kurį paspaudus bus kreipiamasi į players.json ir atidaromas modalas su visais TOS komandos žaidėjais.

Pastaba: Informacija apie komandas bei žaidėjus turi turėti bent minimalų stilių;
-------------------------------------------------------------------------- */

const TEAMS_ENDPOINT = 'teams.json';
const PLAYERS_ENDPOINT = 'players.json';

interface Player {
  firstName: string;
  lastName: string;
  id: number;
  teamId: number;
}

interface Team {
  id: number;
  abbreviation: string;
  teamName: string;
  simpleName: string;
  location: string;
}

async function fetchTeams(): Promise<Team[]> {
  const response = await fetch(TEAMS_ENDPOINT);
  if (!response.ok) throw new Error('Teams fetch failed');
  const data = await response.json();
  return data.teams;
}

async function fetchPlayers(): Promise<Player[]> {
  const response = await fetch(PLAYERS_ENDPOINT);
  if (!response.ok) throw new Error('Players fetch failed');
  const data = await response.json();
  return data.players;
}

function createPlayerCard(player: Player): HTMLElement {
  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';
  playerCard.innerHTML = `
    <p>${player.firstName} ${player.lastName}</p>
    <a href="https://www.google.com/search?q=${player.firstName}+${player.lastName}" target="_blank">More Info</a>
  `;
  return playerCard;
}

function createTeamCard(team: Team, players: Player[], modal: HTMLElement, playerList: HTMLElement): HTMLElement {
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
  button?.addEventListener('click', () => {
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

async function displayTeamsAndPlayers(): Promise<void> {
  const output = document.querySelector('#output') as HTMLElement;
  const modal = document.querySelector('.modal') as HTMLElement;
  const playerList = document.querySelector('#player-list') as HTMLElement;
  const closeModal = document.querySelector('.close') as HTMLElement;

  if (!output || !modal || !playerList || !closeModal) return;

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
  } catch (error) {
    console.error(error);
  }
}

displayTeamsAndPlayers().catch(console.error);
