import * as React from "react";

import * as d3 from 'd3'

import getColour from './utils'

import lengthdata from '../json/length_summary.json'
import color_ref from '../json/color_ref.json'

import styles from './BarChart.module.css'

interface BCProps {
  width: number,
  height: number,
  domainlang: string
}

export default class BarChart extends React.Component<BCProps, {}> {

  private ref = React.createRef<SVGSVGElement>()

  componentDidMount() {

    //@ts-ignore
    var containerelement: HTMLElement = d3.select('.' + styles.barchartcontainer).node()
    var containerdims: DOMRect = containerelement.getBoundingClientRect()

    var margin = {top: 20, right: 20, bottom: 40, left: 90},
        width = containerdims.width - margin.left - margin.right,
        height = containerdims.height - margin.top - margin.bottom;

    var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

    var x = d3.scaleLinear()
          .range([0, width]);

    var svg = d3.select(this.ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //@ts-ignore
    x.domain([0, d3.max(lengthdata, function(d){ return d.length; })])
    y.domain(lengthdata.map(function(d) { return d.id; }));

    svg.selectAll(".bar")
      .data(lengthdata)
      .enter()
      .append("rect")
      .attr("class", "bar")
      //@ts-ignore
      .attr("y", function(d) { return y(d.id); })
      //@ts-ignore
      .attr("id", function(d) { return y(d.id); })
      .attr("width", function(d) {return 0; } )
      .transition()
      .duration(750)
      .delay(function (d, i) {
                    return i * 12;
                })
      .attr("width", function(d) {return x(d.length); } )
      .attr("height", y.bandwidth())
      //@ts-ignore
      .attr("fill", function(d) { return getColour(d.id, color_ref); })

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))

    svg.append("text")
      .attr('class', 'charttitle')
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left - 5))
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tortoise");

    svg.append("text")
      .attr('class', 'charttitle')
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Distance (km)");
  }

  render() {

    return(
      <div className = { styles.barchartcontainer }>
        <svg ref={this.ref}/>
      </div>
    );
  }
}
