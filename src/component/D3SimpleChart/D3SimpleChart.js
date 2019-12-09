import React from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

import "./Charts.css"

class D3SimpleForceChart extends React.Component {

	static propTypes = {
		types: PropTypes.array.isRequired,
		dataTree: PropTypes.shape({
			name: PropTypes.string,
			id: PropTypes.number,
			color: PropTypes.number,
			group: PropTypes.number,
			type: PropTypes.number,
			children: PropTypes.array
		}),
		nameHandler: PropTypes.func.isRequired
	}

	componentDidMount() {
		const {types, dataTree} = this.props

		this.darwTreeGraph(dataTree, types)
	}

	componentDidUpdate() {
		const {types, dataTree} = this.props

		let chart = d3.select(this.chartRef)
		chart.selectAll("*").remove()

		this.darwTreeGraph(dataTree, types)
	}


	//force-directed-tree
	darwTreeGraph = (dataTree, types) => {
		let root = d3.hierarchy(dataTree)
		let links = root.links()
		let nodes = root.descendants()

		const containerWidth = this.chartRef.parentElement.offsetWidth
		const containerHeight = this.chartRef.parentElement.offsetHeight

		const zoom = d3.zoom()
			.scaleExtent([1 / 10, 10])
			.on("start", onZoomStart)
			.on("zoom", onZoom)
			.on("end", onZoomEnd)

		const chart = d3.select(this.chartRef)//chart就是svg
			.attr("width", containerWidth)
			.attr("height", containerHeight)
			.call(zoom)

		const g = chart.append("g")
		const g2 = chart.append("g")

		const color = d3.scaleOrdinal(d3.schemeCategory10)
		const peiColor = d3.scaleOrdinal(d3.schemeCategory10)
		const childColor = d3.scaleOrdinal(d3.schemeCategory10)

		//饼状图参数设置
		const pie = d3.pie()
			.value(function (d) {
				return d[1]
			})
		const piedata = pie(types);
		const arc = d3.arc()
			.innerRadius(0)
			.outerRadius(60)
		const arc2 = d3.arc()
			.innerRadius(0)
			.outerRadius(80)

		//构建饼状图
		const arcs = g2.selectAll("g")
			.data(piedata)
			.enter()
			.append("g")
			.attr("transform", "translate(80,80)")

		arcs.append("path")
			.attr("fill", function (d, i) {
				return peiColor(i)
			})
			.attr("d", function (d) {
				return arc(d)
			})

		let ifClick = false
		let tag = -1

		arcs.on("click", function (d) {
			if (ifClick === false) {
				d3.select(this).select("path").transition().attr("d", function () {
					return arc2(d)
				})
				arcs.append("text")
					.attr("transform", "translate(100,-20)")
					.attr("font-size", 20)
					.attr("text-anchor", "middle")
					.text(function () {
						let percent = Number(d.value) / d3.sum(types, function (d) {
							return d[1]
						}) * 100
						return d.data[0] + "(" + d.data[2] + ") : " + percent.toFixed(1) + "%"
					})
				link.style("opacity", function (link) {
					if (link.target.data.group !== d.data[2]) {
						return 0.1
					}
				})

				node.style("opacity", function (node) {
					if (node.data.group === d.data[2] || node.data.group === 0) {
						return 1
					} else {
						return 0.1
					}
				})
				node.selectAll("text")
					.attr("opacity", function (node) {
						if (node.data.group === d.data[2] || node.data.group === 0) {
							return 1
						}
					})
				node.selectAll(".relation")
					.selectAll("circle")
					.attr("stroke", function (node) {
						return color(node.data.color)
					})
				node.selectAll(".kinship")
					.selectAll("circle")
					.attr("stroke", function (node) {
						return color(node.data.color)
					})

				ifClick = true
				tag = d.data[2]
			} else if (ifClick === true && tag === d.data[2]) {
				d3.select(this).select("path").transition().attr("d", function (d) {
					return arc(d);
				})
				arcs.select("text").remove()
				link.style("opacity", 1)
					.style("stroke", "#999")

				node.style("opacity", 1)
				node.selectAll("text")
					.attr("opacity", function (d) {
						if (d.depth === 3) {
							return 0
						} else {
							return 1
						}
					})
				node.selectAll(".relation")
					.selectAll("circle")
					.attr("stroke", "#666")
				node.selectAll(".kinship")
					.selectAll("circle")
					.attr("stroke", "#666")
				ifClick = false
				tag = -1
			}
		})


		//构建力导引树图
		// nodes[0].fx = containerWidth / 2
		// nodes[0].fy = containerHeight / 2

		let simulation = d3.forceSimulation(nodes)
			.force("link", d3.forceLink().id(function (d) {
				return d.index
			}).distance(function (d) {
				if (d.source.depth === 0) {
					return 60
				} else if (d.source.depth === 1) {
					return 30
				} else {
					return 15
				}
			}).strength(1))
			.force("charge", d3.forceManyBody().strength(-150).distanceMin(20))
			.force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
			.force("collision", d3.forceCollide(d => d.radius * 1.5).strength(1))
			.force("x", d3.forceX())
			.force("y", d3.forceY())

		simulation.nodes(nodes)
			.on("tick", ticked)

		simulation.force("link")
			.links(links)

		let link = g.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(links)
			.enter().append("line")

		let node = g.append("g")
			.attr("class", "nodes")
			.selectAll("g")
			.data(nodes)
			.enter().append("g")
			.on("mouseover", function (d) {
				link.style("stroke", function (link) {
					if (d.depth === 0) {
						if (link.source === d || link.source.parent === d || link.source.parent.parent === d) {
							if (link.target.depth === 1) {
								return color(link.target.data.color)
							} else if (link.target.depth === 2) {
								return childColor(link.target.data.color)
							} else if (link.target.depth === 3) {
								return childColor(link.source.data.color)
							}

						}
					} else {
						if (link.source === d || link.source.parent === d) {
							if (link.target.depth === 1) {
								return color(link.target.data.color)
							} else if (link.target.depth === 2) {
								return childColor(link.target.data.color)
							} else if (link.target.depth === 3) {
								return childColor(link.source.data.color)
							}

						}
					}

				})
			})
			.on("mouseout", function () {
				link.style("stroke", "#999")
			})
			.on("click", (d, i) => {
				//return 返回点击的名字到SimpleForceChart.js再去发送请求
				if (d.depth === 3 || d.depth === 0) {
					console.log("click", nodes[i].data.name)
					this.props.nameHandler(nodes[i].data.name)
				}

			})
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended)
			)

		node.append("g")
			.attr("class", (d) => {
				switch (d.depth) {
					case 0:
						return "self"
					case 1:
						return "relationship"
					case 2:
						return "childRelationship"
					case 3:
						if (d.data.type === 1) {
							return "relation"
						} else if (d.data.type === 2) {
							return "kinship"
						}
						break
					default :
						break
				}
			})

		node.selectAll(".self")
			.append("circle")
			.attr("r", 8)
			.attr("fill", function (d) {
				return color(d.data.color)
			})
			.attr("stroke", "#000")
			.attr("stroke-width", 2)

		node.selectAll(".relationship")
			.append("ellipse")
			.attr("rx", 10)
			.attr("ry", 6)
			.attr("fill", function (d) {
				return color(d.data.color)
			})

		node.selectAll(".childRelationship")
			.append("circle")
			.attr("r", 5)
			.attr("fill", function (d) {
				return childColor(d.data.color)
			})

		node.selectAll(".relation")
			.append("circle")
			.attr("r", 3)
			.attr("stroke", "#666")
			.attr("stroke-width", 2)

		node.selectAll(".kinship")
			.append("circle")
			.attr("r", 3)
			.attr("fill", "#000")
			.attr("stroke", "#666")
			.attr("stroke-width", 2)

		node.append("text")
			.attr("fill", function (d) {
				if (d.depth === 2) {
					return childColor(d.data.color)
				} else {
					return color(d.data.color)
				}

			})
			.attr("font-size", function (d) {
				if (d.depth === 1 || d.depth === 2) {
					return "12px"
				} else if (d.depth === 0) {
					return "16px"
				} else {
					return "10px"
				}

			})
			.attr("y", function (d) {
				if (d.depth === 1 || d.depth === 2) {
					return -11
				} else if (d.depth === 0) {
					return -15
				} else {
					return -9
				}
			})
			.attr("opacity", function (d) {
				if (d.depth === 3) {
					return 0
				} else {
					return 1
				}
			})
			// .attr("dy", ".71em")
			.text(function (d) {
				return d.data.name
			})

		/*node.append("title")
			.text(d => d.data.name)*/


		// 输出标题
		chart.append("g")
			.attr("class", "bar--title")
			.append("text")
			.attr("fill", "#000")
			.attr("font-size", "16px")
			.attr("font-weight", "700")
			.attr("text-anchor", "middle")
			.attr("x", containerWidth / 2)
			.attr("y", 20)
			.text("CBDB人物关系力导向图")

		function ticked() {
			/*data.nodes.forEach(function (d) {
				d.x = d.x - 3 < 0 ? 0 : d.x
				d.x = d.x + 3 > width ? width - 40 : d.x
				d.y = d.y - 3 < 0 ? 13 : d.y
				d.y = d.y + 3 > height ? height - 20 : d.y
			})*/

			/*linkText
				.attr("x", function (d) {
					return (d.source.x + d.target.x) / 2
				})
				.attr("y", function (d) {
					return (d.source.y + d.target.y) / 2
				})*/

			link
				.attr("x1", function (d) {
					return d.source.x
				})
				.attr("y1", function (d) {
					return d.source.y
				})
				.attr("x2", function (d) {
					return d.target.x
				})
				.attr("y2", function (d) {
					return d.target.y
				})

			node
				.attr("transform", function (d) {
					return "translate(" + d.x + "," + d.y + ")"
				})
		}

		function dragstarted(d) {
			if (!d3.event.active) {
				simulation.alphaTarget(0.3).restart()
			}
			d.fx = d.x
			d.fy = d.y
		}

		function dragged(d) {
			d.fx = d3.event.x
			d.fy = d3.event.y
		}

		function dragended(d) {
			if (!d3.event.active) {
				simulation.alphaTarget(0)
			}
			d.fx = null
			d.fy = null
		}

		function onZoomStart() {

		}

		function onZoom() {
			g.attr("transform", d3.event.transform)
		}

		function onZoomEnd() {

		}
	}


	render() {
		return (
			<div>
				<div>
					<div className="force-chart--simple">
						<svg ref={(r) => this.chartRef = r}/>
					</div>
				</div>
			</div>
		)
	}
}


export default D3SimpleForceChart