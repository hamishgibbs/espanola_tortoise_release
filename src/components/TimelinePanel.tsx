import * as React from "react";
import * as d3 from 'd3'

import styles from './TimelinePanel.module.css'

import events from '../json/events.json'

interface TPProps {
  focus: string
  domainlang: string
}

export default class Timeline extends React.Component<TPProps, {}> {
  private ref = React.createRef<SVGSVGElement>()

  defineEventData(focus: string){
    var events_filter: any = events.filter(function (i: any,n: any){
        return(i.id===focus);
    });

    return(events_filter)

  }

  //define prelim plot here and move to componentWillReceiveProps/componentWillUpdate
  componentDidMount() {
    var svg = this.ref.current

    //@ts-ignore
    var containerelement: HTMLElement = d3.select(svg).node()
    var containerdims: DOMRect = containerelement.getBoundingClientRect()

    var eventdata = this.defineEventData(this.props.focus)

    this.constructPlot(this.props.domainlang, svg, containerdims, eventdata, this.constructLine, this.constructPoints, this.constructTraceLine, this.getTraceLineData, this.placeTextAnnotation, this.placeTextTitle)

  }

  componentDidUpdate() {

    var svg = this.ref.current

    d3.select(this.ref.current).selectAll('g').remove()

    //@ts-ignore
    var containerelement: HTMLElement = d3.select(svg).node()
    var containerdims: DOMRect = containerelement.getBoundingClientRect()

    var eventdata = this.defineEventData(this.props.focus)

    this.constructPlot(this.props.domainlang, svg, containerdims, eventdata, this.constructLine, this.constructPoints, this.constructTraceLine, this.getTraceLineData, this.placeTextAnnotation, this.placeTextTitle)

  }

  constructPlot(domainlang: string, svg: any, containerdims:any, eventdata: any, constructLine: object, constructPoints: object, constructTraceLine: object, getTraceLineData: object, placeTextAnnotation: object, placeTextTitle: object){

    var totaldistance = Math.max.apply(Math, eventdata.map(function(x: any){return(x.distance);}))

    var relative_distance = eventdata.map(function(x: any){return(x.distance / totaldistance);})

    var plot_extent = {
      min_x: containerdims.width * 0.05,
      max_x: containerdims.width * 0.95
    }

    //need non-cumulative distance also
    var animation_duration = 3000

    var timings = relative_distance.map(function(x: any){return(x * animation_duration);})

    relative_distance = relative_distance.map(function(x: any){return((containerdims.width * 0.05) + (x * (containerdims.width * 0.9)));})

    //@ts-ignore
    constructLine(svg, containerdims, plot_extent, eventdata, animation_duration)

    //@ts-ignore
    constructPoints(svg, containerdims, relative_distance)

    //@ts-ignore
    placeTextTitle(svg, plot_extent, eventdata)

    //for loop here to time all in relation to top line
    //add text anotation - transition opacity]
    //add dotted line
    //add timeout with the correct timings
    var i;
    for (let i = 0; i < relative_distance.length; i++) {
      setTimeout(() => {
        //@ts-ignore
        var linedata = getTraceLineData(relative_distance[i], i, plot_extent)

        //@ts-ignore
        constructTraceLine(svg, containerdims, relative_distance, linedata)

        //@ts-ignore
        placeTextAnnotation(svg, plot_extent, eventdata, i, 2000, domainlang)
      }, timings[i]);

    }

    //@ts-ignore
    //constructTraceLine(svg, containerdims, relative_distance, linedata)

  }

  placeTextTitle(svg: any, plot_extent: any, eventdata: any){
    d3.select(svg)
      .append('g')
      .append('text')
      .attr('y', 60)
      .attr('x', plot_extent['max_x'] / 2)
      .text(eventdata[0].id)
      .attr('opacity', 0)
      .attr('font-size', '25px')
      .attr('font-weight', 'bold')
      .transition()
      .duration(500)
      .attr('opacity', 1);
  }

  placeTextAnnotation(svg: any, plot_extent: any, eventdata: any, n: number, delay: number, domainlang: string){
    function timeConverter(UNIX_timestamp: number){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ', ' + year + ' ' + hour.toString().padStart(2, '0') + ':' + min.toString().padStart(2, '0');
      return time;
    }

    if (domainlang === 'SP'){
        var text_annotation = timeConverter(eventdata[n].dt_unix) + ' – viajó ' + eventdata[n].distance_text + '.'
    }else{
        var text_annotation = timeConverter(eventdata[n].dt_unix) + ' – travelled ' + eventdata[n].distance_text + '.'
    }

    d3.select(svg)
      .append('g')
      .append('text')
      .attr('y', 255 + (n + 1) * 40)
      .attr('x', plot_extent['min_x'] + 30)
      .attr('font-size', '12px')
      .text(text_annotation)
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay(delay)
      .attr('opacity', 1);

  }

  constructPoints(svg: any, containerdims: any, relative_distance: any){
    var circles: any = d3.select(svg).append('g').selectAll("circle")
                          .data(relative_distance)
                          .enter()
                          .append("circle");

    //time creation to line up with line animation
    circles
       .attr("cx", function(d: number){return(d);})
       .attr("cy", 150)
       .attr("r", 0)
       .style("fill", "white")
       .attr("stroke", "black")
       .attr("stroke-width", 1)
      .transition()
      .duration(750)
      .attr('r', 5);
  }

  constructLine(svg: any, containerdims: any, plot_extent: any, eventdata: any, animation_duration: number){

    d3.select(svg)
      .append('g')
       .append("line")
       .attr("y1", 150)
       .attr("x1", plot_extent['min_x'])
       .attr("x2", plot_extent['min_x'])
       .attr("y2", 150)
       .attr("fill", "none")
       .attr("stroke", "black")
       .attr("stroke-width", 2)
       .transition()
       .duration(animation_duration)
       .ease(d3.easeLinear)
       .attr("x2", plot_extent['max_x']);

  }

  getTraceLineData(relative_point: any, n: number, plot_extent: any){

    var text_space = 40

    var linedata = [[relative_point, 160], [relative_point, 250], [plot_extent['min_x'], 250], [plot_extent['min_x'], 250 + (n + 1) * text_space], [plot_extent['min_x'] + 15, 250 + (n + 1) * text_space]]
    return(linedata);

  }

  constructTraceLine(svg: any, containerdims: any, plot_extent: any, linedata: any){

    var path = d3.select(svg).append('g')
      .append("path")
      .datum(linedata)
      .attr("fill", "none")
      .attr("stroke", "lightgrey")
      .attr("stroke-width", 1)
      //@ts-ignore
      .attr("d", d3.line()
        .x(function(d) { return d[0] })
        .y(function(d) { return d[1] })
        )


    //@ts-ignore
    var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

  }

  render(){

    var focus = this.props.focus

    var eventdata = this.defineEventData(this.props.focus)

    var n: number = eventdata.length

    return(
      <div className={ styles.panelcontainer } style={{ height: 250 + (n * 50) }}>
        <svg className={ styles.svgelement } ref={this.ref}/>
      </div>
    )
  }
}
