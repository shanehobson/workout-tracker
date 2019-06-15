import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ColorService } from '../../services/color.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-exercises-graph',
  templateUrl: './exercises-graph.component.html',
  styleUrls: ['./exercises-graph.component.scss']
})
export class ExercisesGraphComponent implements OnInit, OnChanges {

  @Input() exercises: Array<string> = [];
  @Input() sets: Array<number> = [];
  colorArray = this.colorService.getGraphColorArray();

  json;

  indexes = {
    barsIndex: 0,
    numbersInsideBarsIndex: 0,
    boxIndex: 0,
    upperTextIndex: 0,
    lowerTextIndex: 0
  };

  layoutIndexes = {
    barsIndex: 0,
    numbersInsideBarsIndex: 0,
    boxIndex: 0,
    upperTextIndex: 0,
    lowerTextIndex: 0
  };

  barsToggled = false;

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    this.initGraph();
  }

  ngOnChanges() {
    this.initGraph();
  }

  initGraph(): void {
    if (this.exercises && this.exercises.length > 0) {
      const exercises = this.shortenExercises(this.exercises);
      this.constructJSON(exercises, this.sets);
      this.resetLayoutIndexes();
      this.resetChart();
      this.constructChart();
    }
  }

  shortenExercises(exercises) {
    return exercises.map(exercise => exercise.slice(0, 20));
  }

  constructJSON(keys: Array<string>, units: Array<number>): void {
    const json = [];
    for (let i = 0; i < keys.length; i++) {
      json.push({
        'Type': keys[i],
        'Units': units[i]
      });
    }
    this.json = json;
  }

  resetChart(): void {
    for (const item in this.indexes) {
      if (this.indexes.hasOwnProperty(item)) {
        this.indexes[item] = 0;
      }
    }
    d3.select('#exercises-graph').selectAll('*').remove();
  }

  resetLayoutIndexes(): void {
    for (const item in this.layoutIndexes) {
      if (this.layoutIndexes.hasOwnProperty(item)) {
        this.layoutIndexes[item] = 0;
      }
    }
  }

  hasValue(array): boolean {
    let hasValue = false;
    array.forEach(el => {
      if (el !== 0) {
        hasValue = true;
        return;
      }
    });
    return hasValue;
  }

  constructChart() {
    const data = this.json;
    const groupKey = 'Type';
    const keys = ['Units'];

    // Config
    const margin = ({top: 40, right: 10, bottom: 80, left: 60});
    const height = 320;
    const width = 580;
    const innerHeight = height - margin.bottom;

    // Color Scales
    const color1 = d3.scaleOrdinal()
      .range(this.colorArray);

    // Horizontal Scales
    const x0 = d3.scaleBand()
      .domain(data.map(d => d[groupKey]))
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.1);

    const x1 = d3.scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    // Vertical Scale
    const maxUnits = d3.max(data, d => d3.max(keys, key => d[key]));

    const y = d3.scaleLinear()
      .domain([0, maxUnits]).nice()
      .rangeRound([height - margin.bottom, margin.top]);

    // X-Axis
    const xAxis = g => g
      .attr('class', 'g17')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x0)
        .tickSizeOuter(0))
        .attr('class', 'axis17');

    // Y-Axis
    const yAxis = g => g
      .attr('class', 'g17')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, 's'))
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(data.y));

    // Y Axis Label
    const yAxisLabel = svg => {
      const g17 = svg
        .attr('class', 'g17')
        .attr("transform", "rotate(270)")

      g17.append('text')
        .attr('class', 'text17')
        .attr('font-family', 'visbyLight, sans-serif')
        .attr('font-size', 14)
        .attr('font-weight', 500)
        .attr('x', -190)
        .attr('y', 20)
        .attr('dy', '0.35em')
        .text('Number of Sets');
    };

    // Title
    const title = svg => {
      const g17 = svg
        .attr('class', 'g17')
        .attr('transform', 'translate(-110,0)');

      g17.append('text')
        .attr('class', 'text17')
        .attr('font-family', 'visbyLight, sans-serif')
        .attr('font-size', 18)
        .attr('font-weight', 500)
        .attr('x', (width / 2) + 30)
        .attr('y', 9.5)
        .attr('dy', '0.35em')
        .text('Your Top 10 Exercises');
    };

    // Construct Chart
    const exercisesGraph = d3.select('#exercises-graph');
    exercisesGraph.append('svg')
      .attr('class', 'svg17')
      .attr('height', height)
      .attr('width', width)
      .attr('id', 'exercisesSVG');

    const svg17 = d3.select('#exercisesSVG');

    // Bars
    svg17.append('g')
      .attr('class', 'g17')
      .selectAll('.g17')
      .data(data)
      .join('g')
      .attr('class', 'g17')
      .attr('transform', d => `translate(${x0(d[groupKey])},0)`)
      .selectAll('.rect17')
      .data((d) => {
        return keys.map(key => ({key, value: d[key], index: this.indexes.barsIndex++}));
      })
      .join('rect')
      .attr('class', 'rect17 bar')
      .attr('x', d => x1(d.key))
      .attr('width', x1.bandwidth())
      .attr('y', innerHeight) // setting y at the bottom for the transition effect
      .attr('height', 0)      // setting height 0 for the transition effect

      // Transitions
      .transition()
      .duration(700)
      .ease(d3.easePolyOut)
      .attr('y', d => {
        if (!d.value) {
          return 0;
        }
        return y(d.value);
      })
      .attr('height', d => {
        if (!d.value) {
          return 0;
        }
        return y(0) - y(d.value);
      })
      .attr('fill', (d) => this.colorArray[d['index']])
      .attr('display', 'block');

    // Numbers inside of bars
    svg17.append('g')
      .attr('class', 'g17')
      .selectAll('.g17')
      .data(data)
      .join('g')
      .attr('class', 'g17')
      .attr('transform', d => `translate(${x0(d[groupKey])},0)`)
      .selectAll('.text17')
      .data(d => {
        return keys.map(key => ({key, value: d[key], index: this.indexes.numbersInsideBarsIndex++}));
      })
      .join('text')
      .attr('class', 'text17')
      .attr('x', d => (x1(d.key)) + (x1.bandwidth() / 2))
      .attr('y', innerHeight) // setting y at the bottom for the transition effect
      .attr('text-anchor', 'middle')
      .attr('width', 20)
      .attr('height', 20)
      .attr('font-family', 'visbyLight, sans-serif')
      .attr('font-size', 14)
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .text(d => {
        if (parseInt(d.value, 10) > 1 || parseInt(d.value, 10) >= maxUnits / 6) {
          return d.value;
        } else {
          return '';
        }
      })
    
      // Transitions
      .transition()
      .duration(700)
      .ease(d3.easePolyOut)
      .attr('y', d => {
        if (!d.value) {
          return 0;
        }
        return (y(d.value)) + ((y(0) - y(d.value)) / 2) + 6;
      });

    // Calls to legend, axes, and title
    svg17.append('g')
      .attr('class', 'g17 axis17')
      .call(xAxis)
      .selectAll("text")
        .attr("y", 10)
        .attr("x", -15)
        .attr("dy", ".35em")
        .attr("transform", "rotate(305)")
        .style("text-anchor", "end");

    svg17.append('g')
      .attr('class', 'g17')
      .call(yAxis);

    svg17.append('g')
      .attr('class', 'g17')
      .call(title);

    svg17.append('g')
      .attr('class', 'g17')
      .call(yAxisLabel);
    return svg17.node();
  }
}
