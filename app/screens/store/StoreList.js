'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	ListView,
	RefreshControl,
	InteractionManager
} from 'react-native';

import * as utils from '../../utils';
import * as sqlite from '../../sqlite';

/**
 * 门店列表
 */
export default class StoreList extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			storeDataArr: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
			isRefreshing: false
		};
		this._storeDataArr = [];
		// 当前数据的页数
		this._page = 1;
		// 一页的数据量
		this._count = 10;
		// 搜索时的关键字
		this._keyWord = null;

		this._rednerStoreItem = this.rednerStoreItem.bind(this);
		this._onRefresh = this.onRefresh.bind(this);
		this._onListEndReached = this.onListEndReached.bind(this);
	}

	componentDidMount() {
		// InteractionManager.runAfterInteractions(() => {
			
		// });
		this.fetchData();
	}

	componentWillUnmount() {
		sqlite.close();
	}

	render() {
		const { storeDataArr, isRefreshing } = this.state;
		return (
			<ListView
				// ref={"scrollView"}
				pageSize={10}
				onEndReached={this._onListEndReached}
				onEndReachedThreshold={5}
				style={styles.container}
				removeClippedSubviews={true}
				dataSource={storeDataArr}
				renderRow={this._rednerStoreItem}
				refreshControl={
					<RefreshControl
						onRefresh={this._onRefresh}
						refreshing={isRefreshing}
						// colors={refreshableColors}
						// progressBackgroundColor={refreshableProgressBackgroundColor}
						// size={refreshableSize}
						// tintColor={refreshableTintColor}
						// title={refreshableTitle}
						// titleColor={refreshableTitleColor}
					/>
				}
				canCancelContentTouches={true}
				scrollEnabled={true}
				automaticallyAdjustContentInsets={false}
				// onScroll={this._onScroll}
				enableEmptySections={true}
				keyboardDismissMode={'on-drag'}
			/>
		);
	}

	rednerStoreItem(storeData) {
		if(!storeData) return null;
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					// 点击了门店
				}}
				style={styles.itemContainer}
			>
				{
					// 汽车的icon
				}
				<View style={styles.iconContainer}>
					<Image style={styles.iconCarImg} source={require('../../imgs/icon_car.png')}/>
				</View>
				{
					// 门店的信息
				}
				<View style={styles.storeContainer}>
					{
						// 店名
					}
					<Text style={styles.name}>
						{ storeData.name }
					</Text>
					<Text style={styles.text}>
						联系人：{ storeData.owner }
					</Text>
					<Text style={styles.text} numberOfLines={1}>
						地址：{ storeData.address }
					</Text>
				</View>
				{
					// 箭头
				}
				<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
			</TouchableOpacity>
		);
	}
	
	fetchData(resetPage) {
		if (resetPage) {
			this._page = 1;
			this._storeDataArr.length = 0;
		}
		this.setState({
			isRefreshing: true
		}, () => {
			sqlite.open().then(() => {
				sqlite.findStore(this._page, this._count, this._keyWord).then((result) => {
					this._page++;
					this._storeDataArr = this._storeDataArr.concat(result.raw())
					this.setState({
						isRefreshing: false,
						storeDataArr: this.state.storeDataArr.cloneWithRows(this._storeDataArr)
					});
				}).catch(err => {
					console.warn("获取数据时出错了" + utils.obj2Str(err));
					this.setState({
						isRefreshing: false
					});
				});
			});			
		});
	}

	/**
	 * 刷新
	 */
	onRefresh() {
		this.fetchData(true);
	}

	/**
	 * 加载更多
	 */
	onListEndReached() {
		this.fetchData();
	}

	set keyWord(val) {
		this._keyWord = val;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	itemContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(158),
		marginTop: utils.toDips(1),
		marginBottom: utils.toDips(1),
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	iconContainer: {
		width: utils.toDips(94),
		height: utils.toDips(94),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#04afc0',
		borderRadius: utils.toDips(94) / 2,
		marginLeft: utils.toDips(30)
	},
	iconCarImg: {
		width: utils.toDips(66),
		height: utils.toDips(52)
	},
	storeContainer: {
		marginLeft: utils.toDips(23),
		flex: 1
	},
	name: {
		color: '#1a1a1a',
		fontSize: utils.getFontSize(24)
	},
	text: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(20)
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginRight: utils.toDips(32),
		marginLeft: utils.toDips(26)
	}
});