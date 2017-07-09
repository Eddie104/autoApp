'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import ColorPropType from 'ColorPropType';
import * as utils from '../utils';

/**
 * 小标题，左边是一个小竖条，右边是文字
 */
export default class SubTitle extends PureComponent {

	static propTypes = {
		color: ColorPropType,
		title: PropTypes.string
	};

	static defaultProps = {
		color: 'red',
		title: '我是标题'
	};
	
	constructor(props) {
		super(props);
	}

	render() {
		const { color, title } = this.props;
		return (
			<View style={styles.container}>
				{
					// 小竖条
				}
				<View style={{
					backgroundColor: color,
					width: utils.toDips(6),
					height: utils.toDips(30),
					borderTopLeftRadius: utils.toDips(3),
					borderTopRightRadius: utils.toDips(3),
					borderBottomLeftRadius: utils.toDips(3),
					borderBottomRightRadius: utils.toDips(3)
				}} />
				<Text
					style={{
						color: '#364153',
						fontSize: utils.getFontSize(21),
						marginLeft: utils.toDips(20),
						backgroundColor: 'transparent'
					}}
				>
					{ title }
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: utils.toDips(30),
		marginLeft: utils.toDips(10)
	}
});
