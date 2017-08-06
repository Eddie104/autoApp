'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Animated
} from 'react-native';

import * as utils from '../../utils';
import CategoryList from './CategoryList';

/**
 * 类别选择器
 */
export default class CategorySelector extends PureComponent {

	static propTypes = {
		// 选择器距离屏幕上方的距离
		top: PropTypes.number,
		left: PropTypes.number,
		// 当前三个选择器所选择的值
		categorySelectorValue: PropTypes.array,
		// 三列的类别数据集合
		categoryDataArr: PropTypes.array,
		onSelected: PropTypes.func
	};

	static defaultProps = {
		top: utils.toDips(320),
		left: utils.screenWidth(),
		categorySelectorValue: [null, null, null],
		categoryDataArr: [[], [], []],
		onSelected: () => {}
	};
	
	constructor(props) {
		super(props);

		this.state = {
			opacity: new Animated.Value(0)
		};
		// 记录当前状态是否是展开状态
		this._isUnfold = false;
		// 当前展示的list的索引值
		this._curCategoryListIndex = -1;

		this._onPress0 = this.onPress0.bind(this);
		this._onPress1 = this.onPress1.bind(this);
		this._onPress2 = this.onPress2.bind(this);
	}

	render() {
		const { top, left, categoryDataArr, categorySelectorValue } = this.props;
		const { opacity } = this.state;
		return (
			<View style={[styles.container, { top, left }]}>
				{
					// 有透明度的背景
				}
				<Animated.View style={[styles.container, { backgroundColor: 'black', opacity }]} />				
				<CategoryList ref={c => {this._categoryList0 = c;}} dataArr={categoryDataArr[0]} selectedData={categorySelectorValue[0]} onPress={this._onPress0} />
				<CategoryList ref={c => {this._categoryList1 = c;}} dataArr={categoryDataArr[1]} selectedData={categorySelectorValue[1]} onPress={this._onPress1} />
				<CategoryList ref={c => {this._categoryList2 = c;}} dataArr={categoryDataArr[2]} selectedData={categorySelectorValue[2]} onPress={this._onPress2} />
			</View>
		);
	}

	// 展开
	unfold(showCategoryListIndex) {
		if (!this._isUnfold) {
			this._isUnfold = true;
			Animated.timing(this.state.opacity, { toValue: .5, duration: 200 }).start();
		}
		for (let i = 0; i < 3; i++) {
			if (i === showCategoryListIndex) {
				this[`_categoryList${i}`].unfold();
			} else {
				this[`_categoryList${i}`].fold();
			}
		}
	}

	// 收起来
	fold() {
		if (this._isUnfold) {
			this._isUnfold = false;
			Animated.timing(this.state.opacity, { toValue: 0, duration: 200 }).start();
			for (let i = 0; i < 3; i++) {
				this[`_categoryList${i}`].fold();
			}
		}
	}

	onPress0(data) {
		const { onSelected } = this.props;
		onSelected && onSelected(0, data);
	}

	onPress1(data) {
		const { onSelected } = this.props;
		onSelected && onSelected(1, data);	
	}

	onPress2(data) {
		const { onSelected } = this.props;
		onSelected && onSelected(2, data);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,		
		backgroundColor: 'transparent',
		flexDirection: 'row',
		overflow: 'hidden'
	}
});
