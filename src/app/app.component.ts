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
    for (const item of s.children) {
      let resposta = '';
      let entidad = '';
      let nameF = '';
      let hasCode = false;

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
            entidad = carac.getAttribute('RESPOSTA');
          } else if (carac.getAttribute('CODIGO') === 'CODIGOTIPOMUEBLE') {
            resposta += '<b>CODIGOTIPOMUEBLE:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'CODIGOUBICACIONVERTICALDEFAULT') {
            resposta += '<b>CODIGOUBICACIONVERTICALDEFAULT:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          } else if (carac.getAttribute('CODIGO') === 'DESCRIPCIONCOMPLETA') {
            resposta += '<b>DESCRIPCIONCOMPLETA:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
          }

          if (carac.getAttribute('CODIGO') === 'CODIGOTIPOENTIDAD') {
            if (carac.getAttribute('RESPOSTA') === 'PT' || carac.getAttribute('RESPOSTA') === 'INS'
             || carac.getAttribute('RESPOSTA') === 'SE') {
               if (item.getAttribute('DESENHO')) {
                nameF = item.getAttribute('DESENHO');
               } else {
                nameF = item.getAttribute('ITEM_BASE');
               }
               hasCode = true;
            } else {
              nameF = item.getAttribute('ID');
            }
          }

        }
      }
      this.contCar++;

      if (hasCode === false) {
        nameF = item.getAttribute('ID');
      }

      const nc = {
        name: nameF,
        parent: s.parentNode.getAttribute('ID'),
        _children: [],
        resposta,
        entidad
      };

      c._children.push(nc);

      if (item.getElementsByTagName('ESTRUTURA')) {
        this.recursive(item.getElementsByTagName('ESTRUTURA')[0], nc);
      }
    }
  }

  public loadXML(file: any): void {
    const parser: any = new DOMParser();

    const xmlDoc = parser.parseFromString(file, 'text/xml');

    if (xmlDoc.getElementsByTagName('XML_BUILDER')) {
      console.log('---------------------------------------------/////////////////////////////////////////////////////');
      const items = xmlDoc.getElementsByTagName('IMPORTACAO')[0].getElementsByTagName('ITENS_PEDIDO')[0].children;

      for (const item of items) {
        if (item.getElementsByTagName('CONFIGURADO')[0]) {
          const caracs = item.getElementsByTagName('CONFIGURADO')[0].getElementsByTagName('CARACTERISTICA');
          console.log(item.getAttribute('ID'));

          let resposta = '';
          let entidad = '';
          let nameF = '';
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
              entidad = carac.getAttribute('RESPOSTA');
            } else if (carac.getAttribute('CODIGO') === 'CODIGOTIPOMUEBLE') {
              resposta += '<b>CODIGOTIPOMUEBLE:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'CODIGOUBICACIONVERTICALDEFAULT') {
              resposta += '<b>CODIGOUBICACIONVERTICALDEFAULT:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            } else if (carac.getAttribute('CODIGO') === 'DESCRIPCIONCOMPLETA') {
              resposta += '<b>DESCRIPCIONCOMPLETA:</b> ' + carac.getAttribute('RESPOSTA') + '\n';
            }

            if (carac.getAttribute('CODIGO') === 'CODIGOTIPOENTIDAD') {
              if (carac.getAttribute('RESPOSTA') === 'PT' || carac.getAttribute('RESPOSTA') === 'INS'
               || carac.getAttribute('RESPOSTA') === 'SE') {
                 if (item.getAttribute('DESENHO')) {
                  nameF = item.getAttribute('DESENHO');
                 } else {
                  nameF = item.getAttribute('ITEM_BASE');
                 }
              } else {
                nameF = item.getAttribute('ID');
              }
            }
          }

          const childs = {
              name: nameF,
              parent: 'ROOT',
              _children: [],
              resposta,
              entidad
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
            children: this.children,
	    entidad: 'PT'
          }
        ];
        this.drawGraph(this.contCar * 18);
      }, 1000);
    } else {
      alert('XML Inválido - Consulte al Administrador');
    }
  }

  public drawGraph(h: number): void {
    // ************** Generate the tree diagram	 *****************
    const margin = {top: 40, right: 0, bottom: 20, left: 0};
    const width = (window.innerWidth - 20) - margin.right - margin.left;
    const height = h - margin.top - margin.bottom;

    let i = 0;
    const duration = 1;

    const tree = d3.layout.tree().size([height, width]);

    const diagonal = d3.svg.diagonal().projection((d: any) => [d.x, d.y]);

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

    d3.select(self.frameElement).style();

    function update(source: any) {
      // Compute the new tree layout.
      const nodes = tree.nodes(root);
      const links = tree.links(nodes);

      console.log(nodes);

      // Normalize for fixed-depth.

      nodes.forEach((d: any, i) => {
        d.y = d.depth * 100;
      });

      // Update the nodes…
      const node = svg.selectAll('g.node')
      .data(nodes, (d: any) => d.id || (d.id = ++i));

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => 'translate(' + source.x0 + ',' + source.y0 + ')')
      .on('contextmenu', oclick)
      .on('click', click);


      // Transition nodes to their new position.
      const nodeUpdate = node.transition()
      .duration(duration)
      .attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')');

      nodeEnter.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .style('fill', (d: any) => d._children ? 'salmon' : '#fff');

      nodeEnter.append('text')
      .attr('x', (d: any) => d.children || d._children ? 10 : 10)
      .attr('dy', '.35em')
      .attr('text-anchor', (d: any) => d.children || d._children ? 'start' : 'start')
      .text((d: any) => d.name)
      .style('fill-opacity', 1e-6);

      nodeUpdate.select('rect')
      .attr('width', 14)
      .attr('height', 14)
      .attr('x', -7)
      .attr('y', -7)
      .style('stroke', (d: any) => {
        if (d.entidad) {
          if (d.entidad === 'PT' || d.entidad === 'SE' || d.entidad === 'INS') {
            return 'firebrick';
          } else {
            return 'rgba(0, 0, 255, 0.5)';
          }
        } else {
          return 'rgba(0, 0, 255, 0.5)';
        }
      })
      .style('fill', (d: any) => {
	if (d._children) {
		if (d.entidad === 'PT' || d.entidad === 'SE' || d.entidad === 'INS') {
			return 'salmon';
                } else {
                        return 'rgba(0, 0, 255, 0.5)';
                }
	} else {
		return '#fff';
	}
      });

      nodeUpdate.select('text')
      .style('font', '11px sans-serif')
      .style('fill-opacity', (d: any) => {
        if (d.entidad) {
          if (d.entidad === 'PT' || d.entidad === 'SE' || d.entidad === 'INS') {
            return 1;
          } else {
            return 0.7;
          }
        } else {
          return 0.7;
        }
      });

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition()
      .duration(duration)
      .attr('transform', (d: any) => 'translate(' + source.x + ',' + source.y + ')')
      .remove();

      nodeExit.select('rect')
      .attr('width', 14)
      .attr('height', 14);

      nodeExit.select('text')
      .style('fill-opacity', 1e-6);

	// Update the links…
      const link = svg.selectAll('.link')
      .data(links, (d: any) => d.target.id);

      // Enter any new links at the parent's previous position.
      link.enter().insert('line')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '2px')
      .attr("x1", function (d){
          return d.source.x;
       })
       .attr("y1", function (d){
          return d.source.y + 7;
       })
       .attr("x2", function (d){
          return d.target.x;
       })
       .attr("y2", function (d){
          return d.target.y - 7;
       });

      // Transition links to their new position.
      link.transition()
      .duration(duration)
      .attr("x1", function (d){
          return d.source.x;
       })
       .attr("y1", function (d){
          return d.source.y + 7;
       })
       .attr("x2", function (d){
          return d.target.x;
       })
       .attr("y2", function (d){
          return d.target.y - 7;
       });

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
      .duration(duration)
      .attr("x1", function (d){
          return d.source.x;
       })
       .attr("y1", function (d){
          return d.source.y + 7;
       })
       .attr("x2", function (d){
          return d.target.x;
       })
       .attr("y2", function (d){
          return d.target.y - 7;
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
    // tslint:disable-next-line: no-use-before-declare
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
  // tslint:disable-next-line: component-selector
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
