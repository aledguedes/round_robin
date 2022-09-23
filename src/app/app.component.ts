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
  ];
  listRodadas: any = [];
  classificacao = {};

  gerar() {
    // const time: any[] = this.times;
    const time: any = ['sp', 'rj', 'mg', 'ba', 'ms', 'mt'];
    const lengthArray = time.length;
    const second = time.splice(lengthArray / 2, Number.MAX_VALUE);
    const round: any = [];
    console.log('ORIGINAL', time, second);
    let mandator: any;
    let visitor: any;
    let i = 0;
    let k = 1;

    for (i = 0; i < lengthArray - 1; i++) {
      let rodada = k,
        dt_partida = new Date();
      round[i] = {
        rodada,
        dt_partida,
        jogos: [],
      };
      for (let j = 0; j < lengthArray / 2; j++) {
        mandator = time[j];
        visitor = second[j];

        round[i].jogos.push({
          mandator,
          visitor,
        });
      }
      k++;
      const back1 = second.splice(0, 1); // BA
      const back2 = time.splice(2, 1); //MG
      time.splice(1, 0, back1[0]);
      second.splice(2, 0, back2[0]);
      this.listRodadas = round;
    }

    console.log('his.listRodadas', this.listRodadas);
  }
}
