'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	ScrollView
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import MyScrollableTabView from '../../components/MyScrollableTabView';
import CarDetail from './CarDetail';
import License from './License';
import Certificate from './Certificate';
import CarMore from './CarMore';

/**
 * 车辆详情界面
 */
export default class CarDetailScreen extends PureComponent {

	static propTypes = {
		carData: PropTypes.object.isRequired
	};
	
	constructor(props) {
		super(props);
	}

	render() {
		const { carData } = this.props;
		return (
			<View style={styles.container}>
				<TopBar title={'车辆资产'} showMoreBtn={false} />
				{
					// 顶部的车辆信息
				}
				<View style={styles.topCatDataContainer}>
					{
						// 汽车icon
					}
					<View style={styles.iconContainer}>
						<Image style={{width: utils.toDips(66), height: utils.toDips(52)}} source={require('../../imgs/icon_car.png')} />
					</View>
					{
						// 汽车的名字和颜色
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
						// 搞一个占空间用的弹性view
					}
					<View style={{flex: 1}} />
					{
						// 汽车的牌照和id
					}
					<View style={styles.noContainer}>
						<Text style={styles.carNo}>
							{ carData.no }
						</Text>
						<Text style={styles.carID}>
							{ carData.id }
						</Text>
					</View>
				</View>
				<MyScrollableTabView style={{ marginTop: utils.toDips(20) }}>
					<CarDetail tabLabel='详情' />
					<License tabLabel='车辆牌照' />
					<Certificate tabLabel='车辆证照' />
					<CarMore tabLabel='更多' />
				</MyScrollableTabView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	topCatDataContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(165),
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center'
	},
	iconContainer: {
		width: utils.toDips(94),
		height: utils.toDips(94),
		backgroundColor: '#04afc0',
		borderRadius: utils.toDips(94) / 2,
		marginLeft: utils.toDips(27),
		alignItems: 'center',
		justifyContent: 'center'
	},
	carNameContainer: {
		marginLeft: utils.toDips(30)
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
	noContainer: {
		width: utils.toDips(460)
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
	}
});
