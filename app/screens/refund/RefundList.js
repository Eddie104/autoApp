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
import RefundDetailScreen from './RefundDetailScreen';

/**
 * 所有的退款审核数据
 */
export default class RefundList extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			refundDataArr: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
			isRefreshing: false
		};
		this._refundDataArr = [];

		this._renderRefundItem = this.renderRefundItem.bind(this);
		this._onRefresh = this.onRefresh.bind(this);
		this._onListEndReached = this.onListEndReached.bind(this);
	}

	componentDidMount() {
		// InteractionManager.runAfterInteractions(() => {
			
		// });
		this.fetchData();
	}

	render() {
		const { refundDataArr, isRefreshing } = this.state;
		return (
			<ListView
				// ref={"scrollView"}
				pageSize={10}
				onEndReached={this._onListEndReached}
				onEndReachedThreshold={5}
				style={styles.container}
				removeClippedSubviews={true}
				dataSource={refundDataArr}
				renderRow={this._renderRefundItem}
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

	renderRefundItem(refundData) {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					this.onRefundPress(refundData);
				}}
				style={styles.itemContainer}
			>
				{
					// 用户头像
				}
				<Image style={styles.userHead} source={require('../../imgs/user_head.png')} />
				<View style={{marginLeft: utils.toDips(28)}}>
					<View style={{flexDirection: 'row'}}>
						{
							// 用户名字和钱
						}
						<View style={styles.nameContainer}>
							<Text style={styles.name}>
								{ refundData.name }
							</Text>
							<Text style={styles.cny}>
								￥{ refundData.cny }
							</Text>
						</View>
						{
							// 手机号和状态
						}
						<View style={styles.phoneContainer}>
							<View style={{flex: 1}}>
								<Text style={styles.phone}>
									{ refundData.phone }
								</Text>
								<Text style={styles.cnyType}>
									定金
								</Text>
							</View>
							{
								// 状态
							}
							<Text style={true ? styles.verify : styles.pass}>
								{ true ? '待审核' : '已通过' }
							</Text>
							{
								// 箭头
							}
							<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
						</View>
					</View>
					{
						// 日期
					}
					<Text style={styles.date}>
						2017-06-10 15:20
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
	/**
	 * 向服务器索要数据
	 * 这里就先模拟一下
	 */
	fetchData(refresh) {
		this.setState({
			isRefreshing: true
		}, () => {
			const timer = setTimeout(() => {
				clearTimeout(timer);
				// 这是模拟的测试数据
				// 正式版时以服务器发来的数据为准
				const refundData = [
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' },
					{ name: '刘冰', cny: 1200, phone: '13854785411' }
				];
				this._refundDataArr = refresh ? refundData : this._refundDataArr.concat(refundData);
				this.setState({
					isRefreshing: false,
					refundDataArr: this.state.refundDataArr.cloneWithRows(this._refundDataArr)
				});
			}, 500);
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

	onRefundPress(refundData) {
		global.nav.push({
			Component: RefundDetailScreen,
			refundData
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	itemContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(165),
		marginTop: utils.toDips(1),
		marginBottom: utils.toDips(1),
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	userHead: {
		width: utils.toDips(90),
		height: utils.toDips(90),
		marginLeft: utils.toDips(28)
	},
	nameContainer: {
		width: utils.toDips(204)
	},
	name: {
		fontSize: utils.getFontSize(24),
		color: '#1a1a1a'
	},
	cny: {
		color: '#eb2a33',
		fontSize: utils.getFontSize(19),
		marginTop: utils.toDips(16)
	},
	date: {
		color: '#a5a5a5',
		fontSize: utils.getFontSize(14),
		marginTop: utils.toDips(18)
	},
	phoneContainer: {
		width: utils.toDips(400),
		flexDirection: 'row',
		alignItems: 'center'
	},
	phone: {
		color: '#4e4e4e',
		fontSize: utils.getFontSize(17)
	},
	cnyType: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(20),
		marginTop: utils.toDips(19)
	},
	verify: {
		fontSize: utils.getFontSize(24),
		color: '#fe8973'
	},
	pass: {
		fontSize: utils.getFontSize(24),
		color: '#81d567'
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginRight: utils.toDips(32),
		marginLeft: utils.toDips(26)
	}
});