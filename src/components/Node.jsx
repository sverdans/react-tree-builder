import React from "react";
import Xarrow from "react-xarrows";

const isDisable = (node) =>
{
	return (node?.nodes?.length !== 0 ? true : false)
}

const Node = ({ node, order, reset }) =>
{
    const [nodeIn, setNode] = React.useState(node)

	const updateValue = (event, node) =>
	{
		const newValue = node.value;
		newValue.weight = event.target.value;
        setNode({ id: node.id, value: newValue, nodes: node.nodes })
	}


	const onAddButtonClick = (node) =>
	{
		const id = node.id + "." + node.nodes.length
		const newNodes = node.nodes

		newNodes.push({
			id: id,
			value: { weight: 0 },
			nodes: []
		})
        setNode({ id: node.id, value: node.value, nodes: newNodes })
        reset();
	}
	
	const onDeleteButtonClick = (node) =>
	{
		const newNodes = node.nodes
		newNodes.pop()
        setNode({ id: node.id, value: node.value, nodes: newNodes, })
        reset();
	}

	return (
		<div className={"node-wrapper" + (node.id == "0" ? " relative" : "")}>

			<div className="node-input-group">
				<button className="node-button remove" onClick={() => { onDeleteButtonClick(nodeIn) }}>-</button>
				
				<input id={nodeIn.id} type="number" disabled={isDisable(nodeIn)} value={nodeIn.value.weight}
					className={"node" + (isDisable(nodeIn) ? " disabled" : "")} max={999} min={0}
					onChange={(e) => { updateValue(e, nodeIn) }}
				/>
				
				<button className="node-button add" onClick={() => { onAddButtonClick(nodeIn) }}>+</button>
			</div>

			<div className="children-nodes-container">
				{
					nodeIn?.nodes?.map((value) =>
                        (<Node node={value} key={value.id} order={(order == 'min' ? 'max' : 'min')} reset={reset} />))
				}
			</div>

			<>
				{
					nodeIn?.nodes?.map((value, index) => {
						return (<Xarrow start={nodeIn.id} end={value.id}
							startAnchor={'bottom'} endAnchor={'top'}
							showHead={false} path={'grid'} key={index}/>)
					})
				}
			</>

            <div className="player-info" id={'player-info' + nodeIn.id.split('.').length}>
                {order}
            </div>
            <hr className="player-info-line"></hr>

		</div>
	);
}

export default Node;