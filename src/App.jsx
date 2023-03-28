import React from "react";
import Node from "./components/Node";

const checkNode = (node, order) => 
{
	if (node.nodes.length == 0)
		return;
	
	node.nodes.forEach(n => {
		if (n.nodes.length != 0)
			checkNode(n, (order == 'max' ? 'min' : 'max'))	
	});
	
	let item;

	if (order == 'max')
		item = node.nodes.reduce((prev, current) =>
			(+prev.value.weight > +current.value.weight) ? prev : current) // max
	else
		item = node.nodes.reduce((prev, current) =>
			(+prev.value.weight < +current.value.weight) ? prev : current) // min

	console.log(item.value);
	

	node.value = item.value;
}

function App()
{
	const [order, setOrder] = React.useState('min');
	const [seed, setSeed] = React.useState(1);
	const reset = () => { setSeed(Math.random()); }

	const [rootNode, setRootNode] = React.useState({
		id: "0",
		value: { weight: 0 },
		nodes: [],
	});

	const findSolution = (node, order) =>
	{
		checkNode(node, order)
		reset();
	}

	return (
		<div className="app">

			<Node node={rootNode} order={order} key={seed} reset={reset} /> 
			
			<div className="button-group">
				{
					order == 'min'
					? <button className="button" onClick={() => {setOrder('max')}}>min-{">"}max</button>
					: <button className="button" onClick={() => {setOrder('min')}}>max-{">"}min</button>
				}
				<button className="button" onClick={() => { findSolution(rootNode, order) }}>
					minmax
				</button>
				
				<button className="button" onClick={() => { window.location.reload() }}>
					clear
				</button>


			</div>

		</div>
	);
}

export default App;
