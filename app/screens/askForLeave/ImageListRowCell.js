'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';

/**
 * 角标
 */
class Bagde extends PureComponent {

	static propTypes = {
		number: PropTypes.number.isRequired,
		style: PropTypes.object.isRequired
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.number !== this.props.number) {
			this.setState({
				number: nextProps.number
			});
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			number: props.number
		};
	}

	render() {
		const { style } = this.props;
		const { number } = this.state;
		if (number > 0) {
			return (
				<View
					style={{
						width: utils.toDips(44),
						height: utils.toDips(44),
						borderRadius: utils.toDips(22),
						backgroundColor: '#00ddb3',
						alignItems: 'center',
						justifyContent: 'center',
						...style
					}}
				>
					<Text
						style={{
							color: 'white',
							fontSize: utils.getFontSize(24)
						}}
					>
						{ number }
					</Text>
				</View>
			);
		}
		return null;
	}
}

export default class ImageListRowCell extends PureComponent {

	static propTypes = {
		image: PropTypes.object.isRequired,
		updateImageCellBadge: PropTypes.func.isRequired,
		style: PropTypes.object
	};

	static defaultProps = {
		style: {}
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.selectedIndex !== this.state.selectedIndex || nextProps.image.uri !== this.props.image.uri;
	}

	constructor(props) {
		super(props);

		this.state = {
			selectedIndex: -1
		};
	}

	render() {
		const { style } = this.props;
		const { uri } = this.props.image;
		const { selectedIndex } = this.state;
		// 图片宽度是屏幕宽度-4 * 8，再除以3
		const screenWidth = utils.screenWidth();
		const w = (screenWidth - 4 * utils.toDips(8)) / 3
		return (
			<TouchableOpacity activeOpacity={0.8} onPress={() => this.onPress()} style={{width: w, height: w, ...style}}>
				<Image style={{width: w, height: w}} source={{uri}}/>
				<Bagde style={{position: 'absolute', top: utils.toDips(8), right: utils.toDips(8)}} number={selectedIndex} />
			</TouchableOpacity>
		);
	}

	onPress() {
		const { uri } = this.props.image;
		let b = false;
		for (let i = 0; i < global.imagesSelected.length; i++) {
			if (global.imagesSelected[i].uri === uri) {
				global.imagesSelected.splice(i, 1);
				b = true;
				break;
			}
		}
		if (!b) {
			if (global.imagesSelected.length < 9) {
				global.imagesSelected.push(this.props.image);
			} else{
				return;
			}
		}
		const { updateImageCellBadge } = this.props;
		updateImageCellBadge();
	}

	updateBadge() {
		const { uri } = this.props.image;
		let b = false;
		for (let i = 0; i < global.imagesSelected.length; i++) {
			if (global.imagesSelected[i].uri === uri) {
				b = true;
				this.setState({
					selectedIndex: i + 1
				});
				break;
			}
		}
		if (!b) {
			this.setState({
				selectedIndex: -1
			});
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
