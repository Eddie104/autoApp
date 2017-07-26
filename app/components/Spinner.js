'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	Text
} from 'react-native';

const ColorPropType = require('ColorPropType');

export default class Spinner extends PureComponent {

	static propTypes = {
		color: ColorPropType,
		size: PropTypes.oneOfType([
			PropTypes.oneOf([ 'small', 'large' ]),
			PropTypes.number
		]),
		text: PropTypes.string
	};

	static defaultProps = {
		color: '#97e7e8',
		size: 'large',
		text: ''
	};

	constructor(props) {
		super(props);
	}

	render() {
		let { color, size, text } = this.props;
		return (
			<View style={styles.container}>
				<ActivityIndicator
					animating={true}
					color={color}
					size={size}
				/>
				{
					text ? (
						<Text style={{backgroundColor: 'white', color: 'black'}}>
							{ text }
						</Text>
					) : null
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	}
});


// 'use strict';

// import React, { Component } from 'react';
// import {
// 	StyleSheet,
// 	View,
// 	Image
// } from 'react-native';

// import * as config from '../config';
// import * as utils from '../utils';

// import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

// // const SPINNER_ARR = [Bubbles, Bars, Pulse, DoubleBounce];

// export default class Spinner extends Component {

// 	componentDidMount() {
// 		if (!this._time) {
// 			this._time = setInterval(() => {
// 				this.playNext();
// 			}, 50);
// 		}
// 		utils.toast('play');
// 	}

// 	componentWillUnmount() {
// 		if (this._time) {
// 			clearInterval(this._time);
// 			this._time = null;
// 			utils.toast('play stop');
// 		}
// 	}

// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			curIndex: 0
// 		};
// 		this._total = config.LOADING_IMG.length;
// 	}

// 	// render() {
// 	// 	// const SpinnerComponent = SPINNER_ARR[Math.floor(Math.random() * 4)]
// 	// 	return (
// 	// 		<View style={styles.container}>
// 	// 			<Bubbles size={24} color="#f00" />
// 	// 		</View>
// 	// 	);
// 	// }
	
// 	render() {
// 		const { curIndex } = this.state;
// 		return (
// 			<View style={styles.container}>
// 				<Image source={config.LOADING_IMG[curIndex]}/>
// 			</View>
// 		);
// 	}

// 	playNext() {
// 		let { curIndex } = this.state;
// 		if (++curIndex >= this._total) {
// 			curIndex = 0;
// 		}
// 		this.setState({
// 			curIndex
// 		});
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		position: 'absolute',
// 		top: 0,
// 		bottom: 0,
// 		left: 0,
// 		right: 0,
// 		backgroundColor: 'transparent',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	img: {
// 		width: utils.toDips(280),
// 		height: utils.toDips(120)
// 	}
// });
