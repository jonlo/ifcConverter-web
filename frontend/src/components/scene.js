import React from 'react';
import './scene.css';

import ViewGL from './viewGL';

export class Scene extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	// ******************* COMPONENT LIFECYCLE ******************* //
	componentDidMount() {
		// Get canvas, pass to custom class

		const canvas = this.canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.viewGL = new ViewGL(canvas);

		// Init any event listeners
		window.addEventListener('mousemove', this.mouseMove);
		window.addEventListener('resize', this.handleResize);
	}

	componentDidUpdate(prevProps, prevState) {
		// Pass updated props to 
		const file = this.props.file;
		this.viewGL.updateFile(file);
	}

	componentWillUnmount() {
		// Remove any event listeners
		window.removeEventListener('mousemove', this.mouseMove);
		window.removeEventListener('resize', this.handleResize);
	}

	// ******************* EVENT LISTENERS ******************* //
	mouseMove = (event) => {
		this.viewGL.onMouseMove();
	}

	handleResize = () => {
		this.viewGL.onWindowResize(window.innerWidth, window.innerHeight);
	};

	render() {
		return (
			<div className="canvasContainer">
				<canvas ref={this.canvasRef} />
			</div>
		);
	}
}
