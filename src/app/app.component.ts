import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  firstTurn: any = [];
  grupos: any;
  gerar() {
    let grupos = groups;
    this.roundRobin(grupos);
  }

  roundRobin(groups: Group[]) {
    for (const group of groups) {
      const teamsCount = group.teams.length;
      const matchesCount = teamsCount - 1;
      const matchesPerRound = teamsCount / 2;

      // Generate rounds for the first half of the season
      for (let i = 0; i < matchesCount; i++) {
        const round: { homeTeam: Team; awayTeam: Team }[] = [];

        for (let j = 0; j < matchesPerRound; j++) {
          let homeTeamIndex = (i + j) % (teamsCount - 1);
          let awayTeamIndex = (teamsCount - 1 - j + i) % (teamsCount - 1);

          if (j === 0) {
            awayTeamIndex += teamsCount - 1;
          }

          const homeTeam = group.teams[homeTeamIndex];
          const awayTeam = group.teams[awayTeamIndex];

          round.push({ homeTeam, awayTeam });
        }

        group.rounds.push(round);
        this.firstTurn = group;
        console.log('PRIMEIR TURNO', round);
      }

      // Generate rounds for the second half of the season
      for (let i = 0; i < matchesCount; i++) {
        const round: { homeTeam: Team; awayTeam: Team }[] = [];

        for (let j = 0; j < matchesPerRound; j++) {
          let homeTeamIndex = (teamsCount - 1 - j + i) % (teamsCount - 1);
          let awayTeamIndex = (i + j) % (teamsCount - 1);

          if (j === 0) {
            homeTeamIndex += teamsCount - 1;
          }

          const homeTeam = group.teams[homeTeamIndex];
          const awayTeam = group.teams[awayTeamIndex];

          round.push({ homeTeam, awayTeam });
        }

        group.rounds.push(round);
      }
      this.firstTurn = group;
      console.log(group);
    }
  }
}

interface Team {
  id: number;
  name: string;
  surname: string;
}

interface Group {
  id: number;
  name_group: string;
  rounds: { homeTeam: Team; awayTeam: Team }[][];
  teams: Team[];
}

const groups: Group[] = [
  {
    id: 1,
    name_group: 'GrupoA',
    rounds: [],
    teams: [
      {
        id: 5,
        name: 'Grêmio Football Portoalegrense',
        surname: 'Grêmio',
      },
      {
        id: 1,
        name: 'São Paulo Futebol Clube',
        surname: 'São Paulo',
      },
      {
        id: 2,
        name: 'Clube de Regatas Flamento',
        surname: 'Flamengo',
      },
      {
        id: 3,
        name: 'Cruzeiro Futebol Clube',
        surname: 'Cruzeiro',
      },
      {
        id: 4,
        name: 'Clube Atlético Mineiro',
        surname: 'Atlético Mineiro',
      },
      {
        id: 6,
        name: 'Sport Clube Internacional',
        surname: 'Inter',
      },
    ],
  },
  {
    id: 2,
    name_group: 'GrupoB',
    rounds: [],
    teams: [
      {
        id: 10,
        name: 'Fluminense Football Club',
        surname: 'Fluminense',
      },
      {
        id: 8,
        name: 'Goiás Esporte Clube',
        surname: 'Goiás',
      },
      {
        id: 9,
        name: 'Sport Club do Recife',
        surname: 'Sport',
      },
      {
        id: 7,
        name: 'Esporte Clube Bahia',
        surname: 'Bahia',
      },
      {
        id: 11,
        name: 'Associação Chapecoense de Futebol',
        surname: 'Chapecoense',
      },
      {
        id: 12,
        name: 'Associação Portuguesa de Desportos',
        surname: 'Portuguesa',
      },
    ],
  },
];
