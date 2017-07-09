'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';

import ColorPropType from 'ColorPropType';
import * as utils from '../utils';

/**
 * 背景是圆形纯色的，带了一张图片，下面还有一排文字的item,
 */
export default class ImageItem extends PureComponent {

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
		size: PropTypes.number,
		itemName: PropTypes.string,
		onPress: PropTypes.func,
		// 整个item的宽度
		width: PropTypes.number
	};

	static defaultProps = {
		source: require('../imgs/item_cheLiang.png'),
		sourceWidth: utils.toDips(54),
		sourceHeight: utils.toDips(39),
		color: '#feb02a',
		size: utils.toDips(84),
		itemName: '啦啦啦啦啦',
		onPress: () => {},
		width: utils.screenWidth() / 4
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { source, sourceWidth, sourceHeight, color, size, itemName, onPress, width } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				style={[styles.container, {width}]}
			>
				{
					// 纯色圆形
				}
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
				<Text
					style={styles.itemName}
				>
					{ itemName }
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: utils.toDips(35),
		paddingBottom: utils.toDips(30),
		alignItems: 'center'
	},
	itemName: {
		color: '#364153',
		fontSize: utils.getFontSize(22),
		marginTop: utils.toDips(15),
		backgroundColor: 'transparent'
	}
});
