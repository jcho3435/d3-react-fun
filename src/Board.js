import React, { Component } from "react";
import * as d3 from "d3";

class Board extends Component {
  componentDidMount() {
    this.handleSvg();
  }

  handleSvg = () => {
    const boardSize = 524;
    const margin = 2;
    const svg = d3.select(".my_svg").attr("height", boardSize + margin*2).attr("width", boardSize + margin*2);

    const baseRadius = boardSize / 4;
    const surface = svg.select(".animation_surface").attr("transform", `translate(${margin}, ${margin})`);
    
    let data = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        data.push({
          r: baseRadius,
          x: i * baseRadius * 2 + baseRadius,
          y: j * baseRadius * 2 + baseRadius,
          layer: 0,
          ri: baseRadius,
          xi: i * baseRadius * 2 + baseRadius,
          yi: j * baseRadius * 2 + baseRadius
        });
      }
    }

    var color = d3.scaleOrdinal().domain([0, 1, 2, 3, 4, 5]).range([ "#EA5455", "#FFA5AB", "#FEB692", "#FCF6A8", "#A8E063", "#AEC6CF"])
    
    const updateCircles = () => {
      surface.selectAll("circle")
        .data(data, d => `${d.x}-${d.y}-${d.layer}`)
        .join(
          enter => enter
            .append("circle")
            .attr("cx", d => d.xi)
            .attr("cy", d => d.yi)
            .attr("r", d => d.ri)
            .attr("stroke", "gray")
            .attr("fill", d => color(d.layer))
            .call(enter => 
              enter.transition()
                .duration(200)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("r", d => d.r)
                .on("end", function (_, d) {
                  d3.select(this).on("mouseenter", (e, d) => {
                    if (d.layer < 5) handleMouseEnter(d);
                  });
                })
            ),
          update => update,
          exit => exit.remove()
        );
    };

    const handleMouseEnter = (d) => {
      data = data.filter(el => !(el.r === d.r && el.x === d.x && el.y === d.y));

      const newRadius = d.r / 2;
      const newLayer = d.layer + 1;
      const baseX = d.x - newRadius;
      const baseY = d.y - newRadius;

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          data.push({
            r: newRadius,
            layer: newLayer,
            x: baseX + 2 * newRadius * i,
            y: baseY + 2 * newRadius * j,
            ri: d.r,
            xi: d.x,
            yi: d.y
          });
        }
      }

      updateCircles();
    };

    updateCircles();
  };

  render() {
    return (
      <div className="board" style={{ margin: "12px" }}>
        <svg className="my_svg">
          <g className="animation_surface"></g>
        </svg>
      </div>
    );
  }
}

export default Board;
