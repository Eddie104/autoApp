'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
import SubTitle from '../../components/SubTitle';
import ImageItem from '../../components/ImageItem';
import RefundScreen from '../refund/RefundScreen';

/**
 * 财务管理
 */
export default class Finance extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<SubTitle color={'#92a7ff'} title={'财务管理'} />
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
						source={require('../../imgs/item_siJiZhangHu.png')}
						sourceWidth={utils.toDips(55)}
						sourceHeight={utils.toDips(41)}
						color={'#92a7ff'}
						size={utils.toDips(84)}
						itemName={'司机账户'}
					/>
					<ImageItem
						source={require('../../imgs/item_shouKuan.png')}
						sourceWidth={utils.toDips(51)}
						sourceHeight={utils.toDips(48)}
						color={'#92a7ff'}
						size={utils.toDips(84)}
						itemName={'首款'}
					/>
					<ImageItem
						source={require('../../imgs/item_tuiKuan.png')}
						sourceWidth={utils.toDips(54)}
						sourceHeight={utils.toDips(54)}
						color={'#92a7ff'}
						size={utils.toDips(84)}
						itemName={'退款'}
						onPress={() => {
							global.nav.push({
								Component: RefundScreen
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
