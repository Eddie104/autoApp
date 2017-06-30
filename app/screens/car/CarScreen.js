'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	TouchableOpacity,
	InteractionManager
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import CarDetailScreen from './CarDetailScreen';

/**
 * 车辆资产界面
 */
export default class CarScreen extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			carDataArr: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
			isRefreshing: false
		};
		this._carDataArr = [];

		this._renderCarItem = this.renderCarItem.bind(this);
		this._onRefresh = this.onRefresh.bind(this);
		this._onListEndReached = this.onListEndReached.bind(this);
	}

	componentDidMount() {
		// InteractionManager.runAfterInteractions(() => {
			
		// });
		this.fetchData();
	}

	render() {
		const { carDataArr, isRefreshing } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={'车辆资产'} showMoreBtn={false} />
				<ListView
					// ref={"scrollView"}
					pageSize={10}
					onEndReached={this._onListEndReached}
					onEndReachedThreshold={5}
					style={styles.container}
					removeClippedSubviews={true}
					dataSource={carDataArr}
					renderRow={this._renderCarItem}
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
			</View>
		);
	}

	renderCarItem(carData) {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					this.onCarPress(carData);
				}}
				style={styles.carItemContainer}
			>
				{
					// 汽车的icon
				}
				<View style={styles.iconContainer}>
					<Image style={styles.iconCarImg} source={require('../../imgs/icon_car.png')}/>
				</View>
				{
					// 名字和颜色
				}
				<View style={styles.carNameContainer}>
					<Text style={styles.carName}>
						{ carData.name }
					</Text>
					<Text style={styles.carColor}>
						{ carData.color }
					</Text>
				</View>
				{
					// 弹性的空白区
				}
				<View style={{flex: 1}} />
				{
					// 牌照和id
				}
				<View style={styles.carNoContainer}>
					<Text style={styles.carNo}>
						{ carData.no }
					</Text>
					<Text style={styles.carID}>
						{ carData.id }
					</Text>
				</View>
				{
					// 箭头
				}
				<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
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
				const carData = [
					{ name: '卡罗拉12', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213211' },
					{ name: '卡罗拉3', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213212' },
					{ name: '卡罗拉1', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213213' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213214' },
					{ name: '卡罗拉324324', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213215' },
					{ name: '卡罗拉543', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213216' },
					{ name: '卡罗拉1', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213217' },
					{ name: '卡罗拉23', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213218' },
					{ name: '卡罗432拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI213219' },
					{ name: '卡罗34拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132110' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132111' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132112' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132113' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132114' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132115' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132116' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132117' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132118' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132119' },
					{ name: '卡罗拉', color: '白色', no: '沪BWH206', id: 'FEJDSKOJFNEIOFDNEI2132120' }
				];
				this._carDataArr = refresh ? carData : this._carDataArr.concat(carData);
				this.setState({
					isRefreshing: false,
					carDataArr: this.state.carDataArr.cloneWithRows(this._carDataArr)
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

	onCarPress(carData) {
		global.nav.push({
			Component: CarDetailScreen,
			carData
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e8e8e8'
	},
	carItemContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(158),
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: utils.toDips(1),
		marginBottom: utils.toDips(1)
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
	carNameContainer: {
		marginLeft: utils.toDips(23)
	},
	carName: {
		color: '#1a1a1a',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	},
	carColor: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(21),
		marginTop: utils.toDips(18),
		backgroundColor: 'transparent'
	},
	carNoContainer: {
		width: utils.toDips(372)
	},
	carNo: {
		color: '#4e4e4e',
		fontSize: utils.getFontSize(21),
		backgroundColor: 'transparent'
	},
	carID: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(17),
		marginTop: utils.toDips(18),
		backgroundColor: 'transparent'
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginRight: utils.toDips(30)
	}
});
