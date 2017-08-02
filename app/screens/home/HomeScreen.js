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
import MessageBox from '../../components/MessageBox';
import FinanceData from './FinanceData';
import WorkData from './WorkData';
import LoginScreen from '../login/LoginScreen';
import CarScreen from '../car/CarScreen';

import HomeDataDao from '../../dao/HomeDataDao';
import UserDataDao from '../../dao/UserDataDao';

import ScannerScreen from '../scanner/ScannerScreen';
import StoreSearchScreen from '../store/StoreSearchScreen';

/**
 * 首页面板
 */
export default class HomeScreen extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			cheLiangVal: 0,
			cheLiangTotal: 0,
			heTongVal: 0,
			heTongTotal: 0,
			siJiVal: 0,
			siJiTotal: 0,
		};

		this._showLoginScreen = this.showLoginScreen.bind(this);
		this._showCarScreen = this.showCarScreen.bind(this);
		this._showContractScreen = this.showContractScreen.bind(this);
		this._showDriverScreen = this.showDriverScreen.bind(this);
	}
	
	componentDidMount() {
		this.getUserInfor();
	}
	
	getUserInfor(){
		UserDataDao.getUser().then((res)=> {
			if(!res){
				this.showLoginScreen();
			}else{
				this.getMainData(res.id)
			}
		}).catch((error)=> {
		});
	}
	
	getMainData(userId){
		HomeDataDao.getMainData(userId).then((res)=> {
			if(res){
				var dataList = res.list;
				this.setState({
					cheLiangVal:dataList[0].number1,
					cheLiangTotal:dataList[0].number2,
					heTongVal:dataList[1].number1,
					heTongTotal:dataList[1].number2,
					siJiVal:dataList[2].number1,
					siJiTotal:dataList[2].number2,
				});
			}
		}).catch((error)=> {
		});
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
							this.renderTopItem(require('../../imgs/cheliang.png'),'#62CB30', '车辆', cheLiangVal, cheLiangTotal, this._showCarScreen)
						}
						{
							// 可爱的分割线
							//<View style={styles.line} />
						}
						{
							// 合同
							this.renderTopItem(require('../../imgs/hetong.png'), '#FFB706','合同', heTongVal, heTongTotal, this._showContractScreen)
						}
						{
							// 可爱的分割线
							//<View style={styles.line} />
						}
						{
							// 司机/客户
							this.renderTopItem(require('../../imgs/siji.png'),'#3499DB', '司机/客户', siJiVal, siJiTotal, this._showDriverScreen)
						}
						{
							// 身份证识别
							this.renderTopItem(require('../../imgs/siji.png'),'#3499DB', '身份证识别', siJiVal, siJiTotal, () => {global.nav.push({Component: StoreSearchScreen, action: 'idcard.scan'});})
						}
						{
							// 身份证识别
							this.renderTopItem(require('../../imgs/siji.png'),'#3499DB', '驾驶证识别', siJiVal, siJiTotal, () => {global.nav.push({Component: ScannerScreen, action: 'driver.scan'});})
						}
						{
							// 身份证识别
							this.renderTopItem(require('../../imgs/siji.png'),'#3499DB', '行驶证识别', siJiVal, siJiTotal, () => {global.nav.push({Component: ScannerScreen, action: 'driving.scan'});})
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
					
					<MessageBox show={true}/>
					
				</ScrollView>
			</View>
		);
	}
	
	renderTopItem(imgSource,color, name, val, total, onPress) {
		return(
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				style={{
					backgroundColor: color,
					flex: 1,
					height: utils.toDips(210),
					alignItems: 'center',
					margin: 5,
					justifyContent: 'center'
				}}
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
		global.nav.resetTo({
			Component: LoginScreen
		});
	}

	showCarScreen() {
		const modelCode = 'car';
		global.nav.push({
			Component: CarScreen,modelCode
		});
	}
	
	showContractScreen() {
		const modelCode = 'contract_lease';
		global.nav.push({
			Component: CarScreen,modelCode
		});
	}
	
	showDriverScreen() {
		const modelCode = 'car_master';
		global.nav.push({
			Component: CarScreen,modelCode
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
		height: utils.toDips(210),
		alignItems: 'center',
		margin: 5,
		justifyContent: 'center'
	},
	topItemImg: {
		width: utils.toDips(66),
		height: utils.toDips(54)
	},
	itemName: {
		marginTop: utils.toDips(20),
		color: 'white',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	},
	itemValue: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: utils.getFontSize(16)
	},
	line: {
		width: utils.toDips(1),
		height: utils.toDips(86),
		backgroundColor: '#e1e1e1'
	}
});
