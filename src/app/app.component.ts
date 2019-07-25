import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as d3 from 'd3';
declare var window: any;

export interface DialogData {
  name: string;
  resposta: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'XML-viewer';
  treeData: any;
  children: any = [];
  contCar = 0;

  constructor(public dialog: MatDialog) {}

  public startReading(): void {
    document.getElementById('file').click();
  }

  public readXML(fileInput: any): void {
    const file = fileInput.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt: any) => {
        this.loadXML(evt.target.result);
      };
    }
  }

  public recursive(s: any, c: any): void {
    console.log('New Structure');
    for (const item of s.getElementsByTagName('ITEM')) {
      let resposta = '';

      if (item.getElementsByTagName('CONFIGURADO')[0]) {
        const caracs = item.getElementsByTagName('CONFIGURADO')[0].getElementsByTagName('CARACTERISTICA');

        for (const carac of caracs) {
          if (carac.getAttribute('CODIGO') === 'CODIGOAMBIENTEDEFAULT') {
            resposta += '<b>CODIGOAMBIENTEDEFAULT:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOARTICULO') {
            resposta += '<b>CODIGOARTICULO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOCOLOR') {
            resposta += '<b>CODIGOCOLOR:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGODISTRIBUCION') {
            resposta += '<b>CODIGODISTRIBUCION:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOFAMILIA') {
            resposta += '<b>CODIGOFAMILIA:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOHERRAJEPRECIO') {
            resposta += '<b>CODIGOHERRAJEPRECIO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOLINEA') {
            resposta += '<b>CODIGOLINEA:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOMATERIAL') {
            resposta += '<b>CODIGOMATERIAL:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOMODELO') {
            resposta += '<b>CODIGOMODELO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOMODOCONSTRUCTIVO') {
            resposta += '<b>CODIGOMODOCONSTRUCTIVO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOMODOSUSTENTACION') {
            resposta += '<b>CODIGOMODOSUSTENTACION:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOPRECIO') {
            resposta += '<b>CODIGOPRECIO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOTIPOENTIDAD') {
            resposta += '<b>CODIGOTIPOENTIDAD:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOTIPOMUEBLE') {
            resposta += '<b>CODIGOTIPOMUEBLE:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOUBICACIONVERTICALDEFAULT') {
            resposta += '<b>CODIGOUBICACIONVERTICALDEFAULT:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'DESCRIPCIONCOMPLETA') {
            resposta += '<b>DESCRIPCIONCOMPLETA:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          }
        }
      }
      this.contCar++;

      const nc = {
        name: item.getAttribute('ID'),
        parent: s.parentNode.getAttribute('ID'),
        children: [],
        resposta
      };

      c.children.push(nc);

      if (item.getElementsByTagName('ESTRUTURA')) {
        this.recursive(item.getElementsByTagName('ESTRUTURA')[0], nc);
      }
    }
  }

  public loadXML(file: any): void {
    const parser: any = new DOMParser();

    const xmlDoc = parser.parseFromString(file, 'text/xml');

    if (xmlDoc.getElementsByTagName('XML_BUILDER')) {
      const items = xmlDoc.getElementsByTagName('IMPORTACAO')[0].getElementsByTagName('ITENS_PEDIDO')[0].getElementsByTagName('ITEM');
      let print = false;

      for (const item of items) {
        if (item.getElementsByTagName('CONFIGURADO')[0]) {
          const caracs = item.getElementsByTagName('CONFIGURADO')[0].getElementsByTagName('CARACTERISTICA');
          console.log(item.getAttribute('ID'));

          let resposta = '';
          for (const carac of caracs) {
            if (carac.getAttribute('CODIGO') === 'CODIGOAMBIENTEDEFAULT') {
              resposta += '<b>CODIGOAMBIENTEDEFAULT:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOARTICULO') {
              resposta += '<b>CODIGOARTICULO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOCOLOR') {
              resposta += '<b>CODIGOCOLOR:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGODISTRIBUCION') {
              resposta += '<b>CODIGODISTRIBUCION:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOFAMILIA') {
              resposta += '<b>CODIGOFAMILIA:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOHERRAJEPRECIO') {
              resposta += '<b>CODIGOHERRAJEPRECIO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOLINEA') {
              resposta += '<b>CODIGOLINEA:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOMATERIAL') {
              resposta += '<b>CODIGOMATERIAL:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOMODELO') {
              resposta += '<b>CODIGOMODELO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOMODOCONSTRUCTIVO') {
              resposta += '<b>CODIGOMODOCONSTRUCTIVO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOMODOSUSTENTACION') {
              resposta += '<b>CODIGOMODOSUSTENTACION:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOPRECIO') {
              resposta += '<b>CODIGOPRECIO:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOTIPOENTIDAD') {
              resposta += '<b>CODIGOTIPOENTIDAD:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOTIPOMUEBLE') {
              resposta += '<b>CODIGOTIPOMUEBLE:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOUBICACIONVERTICALDEFAULT') {
              resposta += '<b>CODIGOUBICACIONVERTICALDEFAULT:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'DESCRIPCIONCOMPLETA') {
              resposta += '<b>DESCRIPCIONCOMPLETA:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            }
          }

          const childs = {
            name: item.getAttribute('ID'),
            parent: 'ROOT',
            children: [],
            resposta
          };

          this.children.push(childs);

          if (item.getElementsByTagName('ESTRUTURA')) {
            this.recursive(item.getElementsByTagName('ESTRUTURA')[0], childs);
          }
          console.log('- - - - - - - - - - - - -');
          this.contCar++;
        }
      }
      console.log('- - - - End Read - - - -');

      setTimeout(() => {
        this.treeData = [
          {
            name: 'ROOT',
            parent: 'null',
            children: this.children
          }
        ];
        console.log(this.treeData);
        this.drawGraph(this.contCar * 34);
      }, 1000);
    } else {
      alert('XML Inválido - Consulte al Administrador');
    }
  }

  public drawGraph(h: number): void {
    // ************** Generate the tree diagram	 *****************
    const margin = {top: 40, right: 120, bottom: 20, left: 120};
    const width = (window.innerWidth - 20) - margin.right - margin.left;
    console.log(width);
    const height = h - margin.top - margin.bottom;

    let i = 0;
    const duration = 750;

    const tree = d3.layout.tree().size([height, width]);

    const diagonal = d3.svg.diagonal().projection((d: any) => [d.y, d.x]);

    d3.select('#d3graph').html('');

    const svg = d3.select('#d3graph').append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const root = this.treeData[0];
    root.x0 = 0;
    root.y0 = 0;

    update(root);

    d3.select(self.frameElement).style('height', String(h) + 'px');

    function update(source: any) {
      // Compute the new tree layout.
      const nodes = tree.nodes(root).reverse();
      const links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach((d: any) => { d.y = d.depth * 200; });

      // Update the nodes…
      const node = svg.selectAll('g.node')
      .data(nodes, (d: any) => d.id || (d.id = ++i));

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => 'translate(' + source.y0 + ',' + source.x0 + ')')
      .on('contextmenu', oclick)
      .on('click', click);

      nodeEnter.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .style('fill', (d: any) => d._children ? 'salmon' : '#fff');

      nodeEnter.append('text')
      .attr('x', (d: any) => d.children || d._children ? -13 : 13)
      .attr('dy', '.35em')
      .attr('text-anchor', (d: any) => d.children || d._children ? 'end' : 'start')
      .text((d: any) => d.name)
      .style('fill-opacity', 1e-6);

      // Transition nodes to their new position.
      const nodeUpdate = node.transition()
      .duration(duration)
      .attr('transform', (d: any) => 'translate(' + d.y + ',' + d.x + ')');

      nodeUpdate.select('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', -10)
      .attr('y', -10)
      .style('fill', (d: any) => d._children ? 'salmon' : '#fff');

      nodeUpdate.select('text')
      .style('font', '12px sans-serif')
      .style('fill-opacity', 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition()
      .duration(duration)
      .attr('transform', (d: any) => 'translate(' + source.y + ',' + source.x + ')')
      .remove();

      nodeExit.select('rect')
      .attr('width', 20)
      .attr('height', 20);

      nodeExit.select('text')
      .style('fill-opacity', 1e-6);

      // Update the links…
      const link = svg.selectAll('path.link')
      .data(links, (d: any) => d.target.id);

      // Enter any new links at the parent's previous position.
      link.enter().insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '2px')
      .attr('d', (d: any) => {
        const o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

      // Transition links to their new position.
      link.transition()
      .duration(duration)
      .attr('d', diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
      .duration(duration)
      .attr('d', (d: any) => {
        const o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

      // Stash the old positions for transition.
      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children on click.
    function click(d: any) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    // tslint:disable-next-line: variable-name
    const this_ = this;
    // Toggle children on oclick.
    function oclick(d: any) {
      d3.event.preventDefault();
      if (d.resposta) {
        this_.openDialog(d.name, d.resposta);
      }
    }
  }

  openDialog(n: string, r: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {name: n, resposta: r.replace(/\n/g, '<br />')}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

/* MatDialog */

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
