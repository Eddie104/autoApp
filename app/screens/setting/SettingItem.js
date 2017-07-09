'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';

import ColorPropType from 'ColorPropType';
import * as utils from '../../utils';
import IconItem from '../../components/IconItem';

export default class SettingItem extends PureComponent {

	static propTypes = {
		style: View.propTypes.style,
		iconSource: PropTypes.oneOfType([
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
		iconSourceWidth: PropTypes.number,
		iconSourceHeight: PropTypes.number,
		iconSize: PropTypes.number,
		iconColor: ColorPropType,
		itemName: PropTypes.string,
		itemVal: PropTypes.string,
		onPress: PropTypes.func
	};

	static defaultProps = {
		style: {
			marginTop: utils.toDips(1.5)
		},
		itemVal: '',
		onPress: () => {}
	};
	
	constructor(props) {
		super(props);
	}

	render() {
		const { style, iconSource, iconSourceWidth, iconSourceHeight, iconSize, iconColor, itemName, itemVal, onPress } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				style={[styles.container, style]}
			>
				<IconItem source={iconSource} sourceWidth={iconSourceWidth} sourceHeight={iconSourceHeight} color={iconColor} size={iconSize} />
				<Text style={styles.name}>
					{ itemName }
				</Text>
				<Text style={styles.val}>
					{ itemVal }
				</Text>
				<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: utils.screenWidth(),
		height: utils.toDips(115),
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: utils.toDips(32)
	},
	name: {
		color: '#364153',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent',
		flex: 1,
		marginLeft: utils.toDips(39)
	},
	val: {
		color: '#de3c48',
		fontSize: utils.getFontSize(19),
		backgroundColor: 'transparent'
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginRight: utils.toDips(32),
		marginLeft: utils.toDips(27)
	}
});
