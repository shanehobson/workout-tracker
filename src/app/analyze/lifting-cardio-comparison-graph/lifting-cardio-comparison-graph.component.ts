import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as d3 from 'd3';
import { ColorService } from '../../services/color.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-lifting-cardio-comparison-graph',
  templateUrl: './lifting-cardio-comparison-graph.component.html',
  styleUrls: ['./lifting-cardio-comparison-graph.component.scss']
})
export class LiftingCardioComparisonGraphComponent implements OnInit, OnChanges {

  @Input() data;

  constructor(
    private colorService: ColorService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.constructGraph();
  }

  ngOnChanges() {
    this.constructGraph();
  }

  constructGraph() {
    const data = this.data;
    const width = 300;
    const height = 150;

    const svg = d3.select("#lifting-cardio-comparison-graph"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal(this.colorService.getPieChartColorArray());

    // Generate the pie
    const pie = d3.pie();

    // Generate the arcs
    const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

    //Generate groups
    const arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

    // Text inside of slices
    arcs.append('svg:text')
        .attr('transform', function(d) {
          d['innerRadius'] = 0;
          d['outerRadius'] = radius;
          return 'translate(' + arc.centroid(d) + ')';
        })
        .attr('text-anchor', 'middle')
        .text((d, i) => `${this.helperService.getPercentage(d, this.data)}`)
        .attr('fill', '#fff');
  }

}
