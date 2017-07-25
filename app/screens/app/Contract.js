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
 * 合同管理
 */
export default class Contract extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<SubTitle color={'#81d567'} title={'合同管理'} />
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
						source={require('../../imgs/item_zhengXin.png')}
						sourceWidth={utils.toDips(46)}
						sourceHeight={utils.toDips(51)}
						color={'#81d567'}
						size={utils.toDips(84)}
						itemName={'合同'}
						onPress={() => {
							var modelCode ='contract_lease';
							global.nav.push({
								Component: CarScreen,modelCode
							});
						}}
					/>
				
				{
//					<ImageItem
//						source={require('../../imgs/item_qianYue.png')}
//						sourceWidth={utils.toDips(45)}
//						sourceHeight={utils.toDips(46)}
//						color={'#81d567'}
//						size={utils.toDips(84)}
//						itemName={'签约'}
//					/>
				}
					<ImageItem
						source={require('../../imgs/item_jiaoChe.png')}
						sourceWidth={utils.toDips(58)}
						sourceHeight={utils.toDips(49)}
						color={'#81d567'}
						size={utils.toDips(84)}
						itemName={'交车'}
						onPress={() => {
							var modelCode ='contract_car_delivery';
							global.nav.push({
								Component: CarScreen,modelCode
							});
						}}
					/>
					<ImageItem
						source={require('../../imgs/item_jieSuan.png')}
						sourceWidth={utils.toDips(44)}
						sourceHeight={utils.toDips(53)}
						color={'#81d567'}
						size={utils.toDips(84)}
						itemName={'结算'}
						onPress={() => {
							var modelCode ='order_balance';
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
		backgroundColor: 'white',
		marginTop: utils.toDips(20)
	}
});
