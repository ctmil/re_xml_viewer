import { Component } from '@angular/core';
import * as d3 from 'd3';
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'XML-viewer';

  constructor() {}

  public loadXML(): void {
    let xhttp: any;

    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    }

    xhttp.overrideMimeType('text/xml');

    xhttp.open('GET', './assets/archivo.xml', false);
    xhttp.send(null);
    const xmlDoc = xhttp.responseXML;
    const items = xmlDoc.getElementsByTagName('IMPORTACAO')[0].getElementsByTagName('ITENS_PEDIDO')[0].getElementsByTagName('ITEM');

    for (const item of items) {
      if (item.getElementsByTagName('CONFIGURADO')[0]) {
        const caracs = item.getElementsByTagName('CONFIGURADO')[0].getElementsByTagName('CARACTERISTICA');
        console.log(item.getAttribute('ID'));
        for (const carac of caracs) {
          console.log('Caracteristica:');
          if (carac.getAttribute('CODIGO')) {
            console.log(carac.getAttribute('CODIGO'));
          }
          if (carac.getAttribute('RESPOSTA')) {
            console.log(carac.getAttribute('RESPOSTA'));
          }
        }
        console.log('- - - - - - - - - - - - -');
      }
    }

    console.log('- - - - End read - - - -');
  }
}
