'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Animated
} from 'react-native';

import * as utils from '../../utils';

/**
 * 类别选择器
 */
export default class CategorySelector extends PureComponent {

	static propTypes = {
		// 选择器距离屏幕上方的距离
		top: PropTypes.number,
		left: PropTypes.number
	};

	static defaultProps = {
		top: utils.toDips(320),
		left: utils.screenWidth()
	};
	
	constructor(props) {
		super(props);

		this.state = {
			opacity: new Animated.Value(0)
		};
		// 记录当前状态是否是展开状态
		this._isUnfold = false;
	}

	render() {
		const { top, left } = this.props;
		const { opacity } = this.state;
		return (
			<Animated.View style={[styles.container, { top, left, opacity }]}>
					
			</Animated.View>
		);
	}

	// 展开
	unfold() {
		if (!this._isUnfold) {
			this._isUnfold = true;
			Animated.timing(this.state.opacity, { toValue: .5 }).start();
		}
	}

	// 收起来
	fold() {
		if (this._isUnfold) {
			this._isUnfold = false;
			Animated.timing(this.state.opacity, { toValue: 0 }).start();
		}
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'black'
	}
});
