'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
import SubTitle from '../../components/SubTitle';
import ImageItem from '../../components/ImageItem';
import CarScreen from '../car/CarScreen';

/**
 * 资产管理
 */
export default class Property extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		
		return (
			<View style={styles.container}>
				<SubTitle color={'#feb02a'} title={'资产管理'} />
				{
					// 下边带色的空白区域
				}
				<View style={{
					backgroundColor: 'white',
					width: utils.screenWidth(),
					height: utils.toDips(29),
					borderBottomWidth: utils.toDips(1),
					borderColor: '#e1e1e1'
				}} />
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						backgroundColor: 'white'
					}}
				>
					<ImageItem
						source={require('../../imgs/item_cheLiang.png')}
						sourceWidth={utils.toDips(54)}
						sourceHeight={utils.toDips(39)}
						color={'#feb02a'}
						size={utils.toDips(84)}
						itemName={'车辆'}
						onPress={() => {
							var modelCode ='car';
							global.nav.push({
								Component: CarScreen,modelCode
							});
						}}
					/>
					<ImageItem
						source={require('../../imgs/item_zhiBiao.png')}
						sourceWidth={utils.toDips(54)}
						sourceHeight={utils.toDips(39)}
						color={'#feb02a'}
						size={utils.toDips(84)}
						itemName={'车牌'}
						onPress={() => {
							var modelCode ='license_plate';
							global.nav.push({
								Component: CarScreen,modelCode
							});
						}}
					/>
					<ImageItem
						source={require('../../imgs/item_chuZhi.png')}
						sourceWidth={utils.toDips(43)}
						sourceHeight={utils.toDips(43)}
						color={'#feb02a'}
						size={utils.toDips(84)}
						itemName={'车辆证照'}
						onPress={() => {
							var modelCode ='car_license';
							global.nav.push({
								Component: CarScreen,modelCode
							});
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	}
});
