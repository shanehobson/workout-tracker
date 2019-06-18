import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as d3 from 'd3';
import { ColorService } from '../../services/color.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-upper-lower-body-comparison-graph',
  templateUrl: './upper-lower-body-comparison-graph.component.html',
  styleUrls: ['./upper-lower-body-comparison-graph.component.scss']
})
export class UpperLowerBodyComparisonGraphComponent implements OnInit, OnChanges {

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

    const svg2 = d3.select("#upper-lower-body-comparison-graph"),
        radius = Math.min(width, height) / 2,
        g2 = svg2.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal(this.colorService.getPieChartColorArray2());

    // Generate the pie
    const pie2 = d3.pie();

    // Generate the arcs
    const arc2 = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

    //Generate groups
    const arcs2 = g2.selectAll("arc")
                .data(pie2(data))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths
    arcs2.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc2);

    // Text inside of slices
    arcs2.append('svg:text')
        .attr('transform', function(d) {
          d['innerRadius'] = 0;
          d['outerRadius'] = radius;
          return 'translate(' + arc2.centroid(d) + ')';
        })
        .attr('text-anchor', 'middle')
        .text((d, i) => `${this.helperService.getPercentage(d, this.data)}`)
        .attr('fill', '#fff');
  }

}
