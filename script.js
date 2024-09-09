
const rapidapiKey = "d5af99a1966c5e1b3189b23a93628993";

const obtenerEquipoInput = () => {
    let idTeam = document.getElementById("teamId").value;
    let season = document.getElementById("season").value;
    peticionApi(idTeam, season);
}

const peticionApi = (equipo, temporada) => {
    const baseUrl = 'https://v3.football.api-sports.io/';
    const endpoint = `teams/statistics?season=${temporada}&team=${equipo}&league=39`;
    const url = `${baseUrl}${endpoint}`;

    obtenerNombreLogoEquipo(equipo)

    axios.get(url, {
        headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": rapidapiKey
        }
    })
        .then(res => printData(res.data.response))
        .catch(err => console.log(err));
}


const obtenerNombreLogoEquipo = (equipo) => {
    axios.get(`https://v3.football.api-sports.io/teams?id=${equipo}`, {
        headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": rapidapiKey
        }
    })
        .then(teamRes => {
            const team = teamRes.data.response[0]
            const teamName = team.team.name;
            const teamLogo = team.team.logo;

            const teamInfo = document.getElementById('teamInfo');
            teamInfo.innerHTML = `
            <img src="${teamLogo}" alt="${teamName}" class="team-logo">
            <h2 class="team-name">${teamName}</h2>        
        `;
        })
        .catch(err => console.log(err));
}


const printData = (data) => {
    let respuesta = document.getElementById('statsTable');
    respuesta.innerHTML = `
    <thead>
        <tr>
            <th class="tableHead"></th>
            <th class="tableHead">Local</th>
            <th class="tableHead">Visitante</th>
            <th class="tableHead">Total</th>
        </tr>
    </thead>
    <tr class="header">
        <td>Juegos Disputados</td>
        <td>${data.fixtures.played.home}</td>
        <td>${data.fixtures.played.away}</td>
        <td>${data.fixtures.played.total}</td>
    </tr>
    <tr>
        <td>Victorias</td>
        <td>${data.fixtures.wins.home}</td>
        <td>${data.fixtures.wins.away}</td>
        <td>${data.fixtures.wins.total}</td>
    </tr>
    <tr>
        <td>Empates</td>
        <td>${data.fixtures.draws.home}</td>
        <td>${data.fixtures.draws.away}</td>
        <td>${data.fixtures.draws.total}</td>
    </tr>
    <tr>
        <td>Derrotas</td>
        <td>${data.fixtures.loses.home}</td>
        <td>${data.fixtures.loses.away}</td>
        <td>${data.fixtures.loses.total}</td>
    </tr>
    <tr class="header">
        <td>Goles a Favor</td>
        <td>${data.goals.for.total.home}</td>
        <td>${data.goals.for.total.away}</td>
        <td>${data.goals.for.total.total}</td>
    </tr>
    <tr>
        <td>Goles en Contra</td>
        <td>${data.goals.for.total.home}</td>
        <td>${data.goals.for.total.home}</td>
        <td>${data.goals.for.total.home}</td>
    </tr>
    `;
}


// fetch("https://v3.football.api-sports.io/teams?id=33", {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "v3.football.api-sports.io",
//         "x-rapidapi-key": "d5af99a1966c5e1b3189b23a93628993"
//     }
// })
//     .then(response => response.json())
//     .then(data => {
//         let equipos = data.response;
//         console.log("Equipos de la premier", equipos)
//     })
//     .catch(error => console.log(error))