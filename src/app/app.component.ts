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
  treeData: any;

  constructor() {}

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

  public loadXML(file: any): void {
    const parser: any = new DOMParser();
    const childs: any = [];

    const xmlDoc = parser.parseFromString(file, 'text/xml');
    const items = xmlDoc.getElementsByTagName('IMPORTACAO')[0].getElementsByTagName('ITENS_PEDIDO')[0].getElementsByTagName('ITEM');

    for (const item of items) {
      if (item.getElementsByTagName('CONFIGURADO')[0]) {
        const caracs = item.getElementsByTagName('CONFIGURADO')[0].getElementsByTagName('CARACTERISTICA');
        console.log(item.getAttribute('ID'));
        let c_carac: any = [];
        for (const carac of caracs) {
          console.log('Caracteristica:');
          console.log(carac.getAttribute('CODIGO'));
          console.log(carac.getAttribute('RESPOSTA'));
          c_carac.push(
            {
              name: 'CARAC.',
              parent: item.getAttribute('ID'),
              codigo: carac.getAttribute('CODIGO'),
              resposta: carac.getAttribute('RESPOSTA')
            }
          );
        }
        childs.push({
          name: item.getAttribute('ID'),
          parent: 'Archivo Padre',
          children: c_carac
        });
        console.log('- - - - - - - - - - - - -');
      }
    }

    console.log('- - - - End Read - - - -');

    this.treeData = [
      {
        name: 'Archivo Padre',
        parent: 'null',
        children: childs
      }
    ];

    this.drawGraph();
  }

  public drawGraph(): void {
    // ************** Generate the tree diagram	 *****************
    const margin = {top: 40, right: 120, bottom: 20, left: 120};
    const width = 1200 - margin.right - margin.left;
    const height = 6000 - margin.top - margin.bottom;

    let i = 0;
    const duration = 750;

    const tree = d3.layout.tree().size([height, width]);

    const diagonal = d3.svg.diagonal()
      .projection((d: any) => [d.y, d.x]);

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

    d3.select(self.frameElement).style('height', '6000px');

    function update(source: any) {
      // Compute the new tree layout.
      const nodes = tree.nodes(root).reverse();
      const links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach((d: any) => { d.y = d.depth * 100; });

      // Update the nodes…
      const node = svg.selectAll('g.node')
      .data(nodes, (d: any) => d.id || (d.id = ++i));

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => 'translate(' + source.y0 + ',' + source.x0 + ')')
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
      .style('stroke', 'firebrick')
      .style('stroke-width', '2px')
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
        if (d.codigo || d.resposta) {
          alert('Codigo: ' + d.codigo + '\nResposta: ' + d.resposta);
        }
      }
      update(d);
    }
  }
}
