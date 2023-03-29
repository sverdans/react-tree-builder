import React from "react";
import Node from "./components/Node";

let depth = 0;

const calculateDepth = (node, result) =>
{
	node.nodes.forEach((elem) => { calculateDepth(elem, result + 1) })

	if (node.nodes.length == 0 && depth < result)
		depth = result;
}

const checkNode = (node, order) => 
{
	if (node.nodes.length == 0)
		return;
	
	node.nodes.forEach(n => { checkNode(n, (order === 'max' ? 'min' : 'max')) })
	
	let item;

	if (order == 'max')
		item = node.nodes.reduce((prev, current) =>
			(+prev.value.weight > +current.value.weight) ? prev : current) // max
	else
		item = node.nodes.reduce((prev, current) =>
			(+prev.value.weight < +current.value.weight) ? prev : current) // min

	node.value = item.value;
}

const checkNodeAlphaBeta = (node, order, ab) => 
{
	if (node.nodes.length == 0)
		return node.value.weight;
	

	node.nodes.forEach((n, index, arr) => {
		if (ab.a >= ab.b)
			arr.splice(index, 1)

		const tempAB = { a: ab.a, b: ab.b }
		
		if (order === 'max')
		{
			ab.a = Math.max(ab.a, checkNodeAlphaBeta(n, 'min', tempAB))
		}
		else
		{
			ab.b = Math.min(ab.b, checkNodeAlphaBeta(n, 'max', tempAB))
		}
	});
	
	console.log('alpha/beta:', ab, 'for node:', node)

	if (order === 'max')
	{
		node.value.weight = ab.a
		return ab.a
	}
	else
	{
		node.value.weight = ab.b
		return ab.b
	}
}

function App()
{
	const [order, setOrder] = React.useState('min');
	const [seed, setSeed] = React.useState(1);

	const [rootNode, setRootNode] = React.useState({
		id: "0",
		value: { weight: 0 },
		nodes: [],
	});

	const [depthDivs, setDepthDivs] = React.useState([]);

	const reset = () => {
		depth = 0;
		calculateDepth(rootNode, 1)

		const arr = [];
		for (let i = 0; i < depth; ++i)
			arr.push(i % 2 == 0);
		setDepthDivs(arr);

		setSeed(Math.random())
	}

	const findSolution = (node, order) =>
	{
		checkNode(node, order)
		reset()
	}
	
	const findSolutionAlphaBeta = (node, order) => 
	{
		const ab = { a: Number.MIN_SAFE_INTEGER, b: Number.MAX_SAFE_INTEGER }
		checkNodeAlphaBeta(node, order, ab); 
		reset()
	}

	return (
		<div className="app">

			<div className="tree-container" key={seed}>
				<div className="player-info">
					{
						depthDivs.map((value, index) => (
							<>
								<hr className="player-info-line" style={{ top: index * 62 }}></hr>
								<div className="player-info-text">
									{(value
									? (order == "max" ? "max" : "min")
									: (order == "max" ? "min" : "max"))}
								</div>
							</>
							
						))
					}
				</div>
				<Node node={rootNode} order={order} reset={reset} /> 
			</div>
			
			<div className="button-group">

				<div className="button-pair">
					<button className="button" onClick={() => { findSolution(rootNode, order) }}>
						minmax
					</button>
					
					<button className="button" onClick={() => { findSolutionAlphaBeta(rootNode, order) }}>
						alpha-beta
					</button>
				</div>

				<div className="button-pair">
					{
						order == 'min'
						? <button className="button" onClick={() => {setOrder('max')}}>min-{">"}max</button>
						: <button className="button" onClick={() => {setOrder('min')}}>max-{">"}min</button>
					}

					<button className="button" onClick={() => { window.location.reload() }}>
						clear
					</button>
				</div>

			</div>
		</div>
	);
}

export default App;
