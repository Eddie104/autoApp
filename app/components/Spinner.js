'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	Text
} from 'react-native';

const ColorPropType = require('ColorPropType');

import * as utils from '../utils';

/**
 * 转圈的小菊花
 */
export default class Spinner extends PureComponent {

	static propTypes = {
		color: ColorPropType,
		size: PropTypes.oneOfType([
			PropTypes.oneOf([ 'small', 'large' ]),
			PropTypes.number
		]),
		text: PropTypes.string,
		textBackgroundColor: ColorPropType,
		backgroundColor: ColorPropType
	};

	static defaultProps = {
		color: '#97e7e8',
		size: 'large',
		text: '',
		backgroundColor: 'transparent',
		textBackgroundColor: 'transparent'
	};

	constructor(props) {
		super(props);
	}

	render() {
		let { color, size, text, backgroundColor, textBackgroundColor } = this.props;
		return (
			<View style={[styles.container, {backgroundColor}]}>
				<View
					style={{
						padding: utils.toDips(25),
						borderRadius: utils.toDips(10),
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: textBackgroundColor
					}}
				>
					<ActivityIndicator
						animating={true}
						color={color}
						size={size}
					/>
					{
						text ? (
							<Text style={{backgroundColor: 'transparent', color: 'white', marginLeft: utils.toDips(20)}}>
								{ text }
							</Text>
						) : null
					}
				</View>
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
		justifyContent: 'center'
	}
});