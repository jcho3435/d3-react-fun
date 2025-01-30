import React, { Component } from "react";
import * as d3 from "d3";

class Board extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.handleSvg();
  }

  handleSvg = () => {
    var boardSize = 400;
    var svg = d3.select(".my_svg").attr("height", boardSize).attr("width", boardSize);

    var baseRadius = boardSize/4;

    var surface = svg.select(".animation_surface");
    var data = [];
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 2; j++) data.push({r: baseRadius, x: i*baseRadius*2 + baseRadius, y: j*baseRadius*2 + baseRadius, layer: 0});
    }

    surface.selectAll("circle").data(data).join("circle").attr("cx", d => d.x).attr("cy", d => d.y)
      .attr("r", d => d.r).attr("stroke", "gray").attr("fill", "lightgray");
  }

  render() {
    return(
      <div className="board" style={{margin: "12px"}}>
        <svg className="my_svg">
          <g className="animation_surface"></g>
        </svg>
      </div>
    )
  }
}

export default Board;