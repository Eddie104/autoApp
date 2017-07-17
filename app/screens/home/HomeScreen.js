'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import FinanceData from './FinanceData';
import WorkData from './WorkData';
import LoginScreen from '../login/LoginScreen';
import CarScreen from '../car/CarScreen';
import ScannerScreen from '../scanner/ScannerScreen';
import DrivingResultScreen from '../scanner/DrivingResultScreen';

/**
 * 首页面板
 */
export default class HomeScreen extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			cheLiangVal: 76,
			cheLiangTotal: 85,
			heTongVal: 76,
			heTongTotal: 90,
			siJiVal: 72,
			siJiTotal: 80
		};

		this._showLoginScreen = this.showLoginScreen.bind(this);
		this._showCarScreen = this.showCarScreen.bind(this);
	}

	render() {
		const { cheLiangVal, cheLiangTotal, heTongVal, heTongTotal, siJiVal, siJiTotal } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={'智慧车队'} showBackBtn={false} showMoreBtn={true} moreFunc={this._showLoginScreen} />
				<ScrollView
					style={styles.container}
				>
					{
						// 车辆、合同和司机/客户
					}
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							backgroundColor: 'white'
						}}
					>
						{
							// 车辆
							// this.renderTopItem(require('../../imgs/cheliang.png'), '车辆', cheLiangVal, cheLiangTotal, this._showCarScreen)
							this.renderTopItem(require('../../imgs/cheliang.png'), '车辆', cheLiangVal, cheLiangTotal, () => {
								global.nav.push({
									Component: ScannerScreen,
									// Component: DrivingResultScreen,
									action: 'idcard.scan'
								});
							})
						}
						{
							// 可爱的分割线
						}
						<View style={styles.line} />
						{
							// 合同
							this.renderTopItem(require('../../imgs/hetong.png'), '合同', heTongVal, heTongTotal, () => {
								global.nav.push({
									Component: ScannerScreen,
									action: 'driver.scan'
								});
							})
						}
						{
							// 可爱的分割线
						}
						<View style={styles.line} />
						{
							// 司机/客户
							this.renderTopItem(require('../../imgs/siji.png'), '司机/客户', siJiVal, siJiTotal, () => {
								global.nav.push({
									Component: ScannerScreen,
									action: 'driving.scan'
								});
							})
						}
					</View>
					{
						// 财务数据
					}
					<FinanceData />
					{
						// 工作看板
					}
					<WorkData />
				</ScrollView>
			</View>
		);
	}

	renderTopItem(imgSource, name, val, total, onPress) {
		return(
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				style={styles.topItemContainer}
			>
				<Image style={styles.topItemImg} source={imgSource} />
				<Text style={styles.itemName}>{ name }</Text>
				<Text style={styles.itemValue}>
					{ val } / { total }
				</Text>
			</TouchableOpacity>
		);
	}

	showLoginScreen() {
		global.nav.push({
			Component: LoginScreen
		});
	}

	showCarScreen() {
		global.nav.push({
			Component: CarScreen
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	topItemContainer: {
		flex: 1,
		height: utils.toDips(236),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	topItemImg: {
		width: utils.toDips(66),
		height: utils.toDips(54)
	},
	itemName: {
		marginTop: utils.toDips(28),
		color: '#364153',
		fontSize: utils.getFontSize(22),
		backgroundColor: 'transparent'
	},
	itemValue: {
		backgroundColor: 'transparent',
		color: '#82868e',
		fontSize: utils.getFontSize(19)
	},
	line: {
		width: utils.toDips(1),
		height: utils.toDips(86),
		backgroundColor: '#e1e1e1'
	}
});
