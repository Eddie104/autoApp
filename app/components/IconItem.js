'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image
} from 'react-native';

import ColorPropType from 'ColorPropType';

/**
 * 背景是圆形纯色的，带了一张图片的icon
 */
export default class IconItem extends PureComponent {

	static propTypes = {
		source: PropTypes.oneOfType([
			PropTypes.shape({
				uri: PropTypes.string,
				headers: PropTypes.objectOf(PropTypes.string),
			}),
			PropTypes.number,
			// Multiple sources
			PropTypes.arrayOf(
				PropTypes.shape({
				uri: PropTypes.string,
				width: PropTypes.number,
				height: PropTypes.number,
			}))
		]),
		sourceWidth: PropTypes.number,
		sourceHeight: PropTypes.number,
		color: ColorPropType,
		// 圆形的直径
		size: PropTypes.number
	};
	
	constructor(props) {
		super(props);
	}

	render() {
		const { source, sourceWidth, sourceHeight, color, size } = this.props;
		return (
			<View
				style={{
					width: size,
					height: size,
					borderRadius: size / 2,
					backgroundColor: color,
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<Image
					style={{width: sourceWidth, height: sourceHeight}}
					source={source}
				/>
			</View>
		);
	}
}