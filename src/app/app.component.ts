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

  constructor() {console.log(d3); }

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

    this.treeData = [
      {
        name: 'Archivo Padre',
        parent: 'null',
        children: []
      }
    ];

    // this.drawGraph();
  }

  public drawGraph(): void {
    // ************** Generate the tree diagram	 *****************
    const margin = {top: 40, right: 120, bottom: 20, left: 120};
    const width = 960 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;

    let i = 0;
    const duration = 750;

    const tree = d3.layout.tree().size([height, width]);

    const diagonal = d3.svg.diagonal()
      .projection((d: any) => [d.y, d.x]);

    const svg = d3.select('body').append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const root = this.treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    d3.select(self.frameElement).style('height', '500px');

    function update(source: any) {
      // Compute the new tree layout.
      const nodes = tree.nodes(root).reverse();
      const links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach((d: any) => { d.y = d.depth * 180; });

      // Update the nodes…
      const node = svg.selectAll('g.node')
      .data(nodes, (d: any) => d.id || (d.id = ++i));

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => 'translate(' + source.y0 + ',' + source.x0 + ')')
      .on('click', click);

      nodeEnter.append('circle')
      .attr('r', 1e-6)
      .style('fill', (d: any) => d._children ? 'lightsteelblue' : '#fff');

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

      nodeUpdate.select('circle')
      .attr('r', 10)
      .style('stroke', 'steelblue')
      .style('stroke-width', '3px')
      .style('fill', (d: any) => d._children ? 'lightsteelblue' : '#fff');

      nodeUpdate.select('text')
      .style('font', '12px sans-serif')
      .style('fill-opacity', 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition()
      .duration(duration)
      .attr('transform', (d: any) => 'translate(' + source.y + ',' + source.x + ')')
      .remove();

      nodeExit.select('circle')
      .attr('r', 1e-6);

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
  }
}
