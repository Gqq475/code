import React from 'react'
import classes from './DefectMapZone.scss'
import * as d3 from 'd3'

type Props = {
  byLot: Boolean,
  sideBySide: Boolean,
  data: Object
}

export class DefectMapZone extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.loadGraph = this.loadGraph.bind(this)
  }

  drawUnit (title, data) {
    // Size parameters.
    const WIDTH = 800
    const HEIGHT = 450
    let size = 150
    let padding = 10
    let traits = ['x', 'y']

    // Position scales.
    let x = {}
    let y = {}
    traits.forEach((trait) => {
      // Coerce values to numbers.
      data.forEach((d) => { d[trait] = +d[trait] })

      let value = (d) => d[trait]
      let domain = [d3.min(data, value), d3.max(data, value)]
      let range = [padding / 2, size * 3 - padding / 2]
      x[trait] = d3.scaleLinear().domain(domain).range(range)
      y[trait] = d3.scaleLinear().domain(domain).range(range.reverse())
    })

    // Root panel.
    let svg = d3.select('#graph')
      .append('svg:svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
      .append('svg:g')
      .attr('transform', 'translate(0, 0)')

    // Legend.
    let text = []
    for (let i = 0; i < 18; i++) {
      text.push(i + 1)
    }
    svg.selectAll('g.legend')
      .data(text)
      .enter().append('svg:text')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${i % 3 * size + padding}, ${Math.ceil(d / 3) * size / 2 - padding})`)
      .text((d) => d)

    // Cell and plot.
    svg.selectAll('g.cell')
      .data(cross(traits, traits))
      .enter().append('svg:g')
      .attr('class', 'cell')
      .attr('transform', (d) => `translate(${d.i * size}, ${d.j * size / 2})`)
      .each(plotRect)
      // .each(plotDot)

    function plotRect () {
      let cell = d3.select(this)

      // Plot frame.
      cell.append('svg:rect')
        .attr('class', 'frame')
        .attr('x', padding / 2)
        .attr('y', padding / 2)
        .attr('width', size - padding)
        .attr('height', size / 2 - padding)
    }

    svg.selectAll('g.cicle')
      .data(data)
      .enter().append('svg:circle')
      .attr('class', (d) => d.species)
      .attr('cx', (d) => x['x'](d['x']))
      .attr('cy', (d) => y['y'](d['y']))
      .attr('r', 3)

    // Title.
    let heightGap = padding * 2
    let xTimes = 0
    let yPos = 0
    title.map((t, i) => {
      let heightBase = (heightGap * (i + 1))
      let curXTimes = Math.floor(heightBase / HEIGHT)
      if (xTimes !== curXTimes) {
        yPos = 0
        xTimes = curXTimes
      }

      yPos += heightGap

      svg.append('svg:text')
        .attr('x', (WIDTH - 300) + 50 * xTimes)
        .attr('y', yPos)
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .text(t)
    })

    function cross (a, b) {
      let c = []
      let n = 3
      let m = 6
      let i
      let j
      for (i = -1; ++i < n;) {
        for (j = -1; ++j < m;) {
          c.push({
            x: a[i],
            i: i,
            y: b[j],
            j: j
          })
        }
      }
      return c
    }
  }

  loadGraph () {
    let data = []
    let label = []
    let keys = Object.keys(this.props.data)
    d3.selectAll('svg').remove()
    if (this.props.byLot === true) {
      for (let i = 0; i < keys.length; i++) {
        this.props.data[keys[i]].result.lots.map((g) => {
          g.adjDefectList.map((d) => {
            data.push({
              x: d.coordinateX1,
              y: d.coordinateY1,
              species: 'color'
            })
          })
        })

        label.push(keys[i])
        if (this.props.sideBySide) {
          this.drawUnit(label, data)
          data.length = 0
          label.length = 0
        }
      }

      !this.props.sideBySide && this.drawUnit(label, data)
    } else {
      for (let i = 0; i < keys.length; i++) {
        this.props.data[keys[i]].result.lots.map((d) => {
          data.push({
            x: d.coordinateX1,
            y: d.coordinateY1,
            species: 'color'
          })
        })

        label.push(keys[i])
        if (this.props.sideBySide) {
          this.drawUnit(label, data)
          data.length = 0
          label.length = 0
        }
      }

      !this.props.sideBySide && this.drawUnit(label, data)
    }
  }

  componentDidUpdate () {
    this.loadGraph()
  }

  componentDidMount () {
    this.loadGraph()
  }

  render () {
    return (
      <div className={classes['DefectMapZone-container']}>
        <div className={classes.graph} id='graph' />
      </div>
    )
  }
}

export default DefectMapZone
