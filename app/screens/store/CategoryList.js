'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	Animated,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';

// 一个item的高度
const ITEM_HEIGHT = 95;

// 同屏展示多少个item
const ITEM_COUNT = 5;

const VIEW_HEIGHT = ITEM_COUNT * ITEM_HEIGHT;

/**
 * 类别列表
 */
export default class CategoryList extends PureComponent {

	static propTypes = {
		// 数据集合
		dataArr: PropTypes.array,
		// 已选择的数据
		selectedData: PropTypes.string,
		onPress: PropTypes.func
	};

	static defaultProps = {
		dataArr: [],
		selectedData: '',
		onPress:() => {}
	};
	
	constructor(props) {
		super(props);

		this.state = {
			top: new Animated.Value(utils.toDips(-VIEW_HEIGHT))
		};
		this._isUnfold = false;
		this._onPress = this.onPress.bind(this);
	}

	render() {
		const { top } = this.state;
		const { dataArr, selectedData } = this.props;
		const numData = dataArr.length;
		return (
			<Animated.View style={[styles.container, { top }]}>
				<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
					{
						dataArr.map((data, index) => this.renderItem(data, index, selectedData, numData))
					}	
				</ScrollView>
			</Animated.View>
		);
	}

	renderItem(data, index, selectedData, numData) {
		const item = (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => this._onPress(data)}
				style={styles.itemContainer}
				key={index}
			>
				<Text style={selectedData === data ? styles.selectedText : styles.unselectedText}>
					{ data }
				</Text>
				{
					data === selectedData && (
						<Image style={styles.gou} source={require('../../imgs/selected_gou.png')} />
					)
				}
			</TouchableOpacity>
		);
		if (index === numData - 1) {
			return item;
		}
		return (
			<View style={styles.itemContainerWithLine} key={index}>
				{ item }
				{
					// 分割线
				}
				<Image style={styles.line} source={require('../../imgs/categoryListLine.png')} />
			</View>
		);
	}

	// 展开
	unfold() {
		if (!this._isUnfold) {
			this._isUnfold = true;
			Animated.timing(this.state.top, { toValue: 0, duration: 200 }).start();
		}
	}

	// 缩起来
	fold() {
		if (this._isUnfold) {
			this._isUnfold = false;
			Animated.timing(this.state.top, { toValue: utils.toDips(-VIEW_HEIGHT), duration: 200 }).start();
		}
	}

	onPress(data) {
		const { onPress } = this.props;
		onPress && onPress(data);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: utils.toDips(VIEW_HEIGHT)
	},
	scrollView: {
		backgroundColor: 'white'
	},
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: utils.screenWidth() / 3,
		height: utils.toDips(ITEM_HEIGHT),
		alignItems: 'center',
		paddingLeft: utils.toDips(36),
		paddingRight: utils.toDips(36)
	},
	itemContainerWithLine: {
		alignItems: 'center',
		flex: 1
	},
	unselectedText: {
		fontSize: utils.getFontSize(22),
		color: 'black'
	},
	selectedText: {
		fontSize: utils.getFontSize(22),
		color: '#04afc0'
	},
	gou: {
		width: utils.toDips(28),
		height: utils.toDips(20)
	},
	line: {
		width: utils.toDips(200),
		height: utils.toDips(1),
		flex: 0
	}
});
