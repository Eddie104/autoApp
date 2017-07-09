'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
import SubTitle from '../../components/SubTitle';
import ImageItem from '../../components/ImageItem';

/**
 * 司机/客户
 */
export default class Customer extends PureComponent {
		
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<SubTitle color={'#4c99f4'} title={'司机/客户'} />
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
						source={require('../../imgs/item_siJiXinXi.png')}
						sourceWidth={utils.toDips(44)}
						sourceHeight={utils.toDips(45)}
						color={'#4c99f4'}
						size={utils.toDips(84)}
						itemName={'司机信息'}
					/>
					<ImageItem
						source={require('../../imgs/item_siJiZhangHu.png')}
						sourceWidth={utils.toDips(55)}
						sourceHeight={utils.toDips(41)}
						color={'#4c99f4'}
						size={utils.toDips(84)}
						itemName={'司机证照'}
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
