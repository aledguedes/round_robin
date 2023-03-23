import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  times = [
    { id: 1, name: 'São Paulo' },
    { id: 2, name: 'Flamengo' },
    { id: 3, name: 'Internacional' },
    { id: 4, name: 'Cruzeiro' },
    { id: 5, name: 'Bahia' },
    { id: 6, name: 'Ceará' },
    { id: 7, name: 'Goiás' },
  ];
  firstTurn: any = [];
  secondTurn: any = [];
  tm_folga: any;
  classificacao = {};

  groups = [
    { id: 1, name: 'Grupo A', teams: [] },
    { id: 2, name: 'Grupo B', teams: [] },
  ];

  sortear(teams: any) {
    console.log('teams', teams);
    let qtdGroups = this.groups.length,
      qtdTeams = teams.length;

    console.log('teqtdTeamsams', qtdGroups, qtdTeams);

    let restByGroup = qtdTeams % qtdGroups,
      numByGroup =
        restByGroup != 0 ? (qtdTeams - 1) / qtdGroups : qtdTeams / qtdGroups;

    console.log('teams', restByGroup, numByGroup);
    let timeA = teams.splice(numByGroup, Number.MAX_VALUE);
    let timeB = teams;

    this.groups.forEach((gp: any, i: number) => {
      console.log(gp, i);
      for (let i = 0; i < numByGroup; i++) {
        gp.teams.push(timeA[i]);
      }
    });
    console.log(this.groups);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  gerar() {
    // const time: any[] = this.times;
    const time: any = [
      'São Paulo',
      'Santos',
      'Corinthians',
      'Palmeiras',
      'Flamengo',
      'Fluminense',
      'Vasco',
      'Botafogo',
      // 'Batatais',
    ];
    this.sortear(time);
    const lengthArray = time.length - 1;
    console.log('lengthArray', lengthArray);
    // this.turnA(time, lengthArray);
  }

  turnA(times, lengthArray) {
    console.log('PRIMEIRO TURNO', times, lengthArray);
    let timeA,
      timeB,
      timeF,
      bkpT = [],
      tam = lengthArray / 2 - 1;
    const round: any = [];
    let mandator: any;
    let visitor: any;
    let i = 0;
    let k = 1;
    timeA = times.splice(lengthArray / 2, Number.MAX_VALUE);
    timeF = timeA.splice(timeA.length - 1, 1);
    timeB = times;

    for (i = 0; i < lengthArray - 1; i++) {
      let rodada = k,
        folga = timeF[0],
        dt_partida = new Date();
      round[i] = {
        rodada,
        dt_partida,
        folga,
        jogos: [],
      };
      for (let j = 0; j < lengthArray / 2; j++) {
        mandator = timeA[j];
        visitor = timeB[j];

        round[i].jogos.push({
          mandator,
          visitor,
          folga,
        });
      }
      k++;
      bkpT = timeF;
      timeF = timeA.splice(timeA.length - 1, 1);
      timeB.splice(Number.MAX_VALUE, 0, bkpT[0]);
      bkpT = timeB.splice(0, 1);
      timeA.splice(0, 0, bkpT[0]);
    }
    this.firstTurn = round;
  }
}
