'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';

import * as utils from '../../utils';
import ImageItem from '../../components/ImageItem'

/**
 * 车辆更多面板
 */
export default class CarMore extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					<View style={styles.rowContainer}>
						<ImageItem
							source={require('../../imgs/item_xiangQing.png')}
							sourceWidth={utils.toDips(44)}
							sourceHeight={utils.toDips(46)}
							color={'#4ecfe2'}
							size={utils.toDips(84)}
							itemName={'详情'}
							width={utils.screenWidth() / 3}
						/>
						<ImageItem
							source={require('../../imgs/item_paiZhao.png')}
							sourceWidth={utils.toDips(52)}
							sourceHeight={utils.toDips(39)}
							color={'#81d567'}
							size={utils.toDips(84)}
							itemName={'车辆牌照'}
							width={utils.screenWidth() / 3}
						/>
						<ImageItem
							source={require('../../imgs/item_cheLiang.png')}
							sourceWidth={utils.toDips(54)}
							sourceHeight={utils.toDips(39)}
							color={'#feb02a'}
							size={utils.toDips(84)}
							itemName={'车辆证照'}
							width={utils.screenWidth() / 3}
						/>
					</View>
					<View style={styles.rowContainer}>
						<ImageItem
							source={require('../../imgs/item_baoXian.png')}
							sourceWidth={utils.toDips(41)}
							sourceHeight={utils.toDips(54)}
							color={'#92a7ff'}
							size={utils.toDips(84)}
							itemName={'保险'}
							width={utils.screenWidth() / 3}
						/>
						<ImageItem
							source={require('../../imgs/item_shiGu.png')}
							sourceWidth={utils.toDips(50)}
							sourceHeight={utils.toDips(46)}
							color={'#fe8973'}
							size={utils.toDips(84)}
							itemName={'事故'}
							width={utils.screenWidth() / 3}
						/>
						<ImageItem
							source={require('../../imgs/item_weiBao.png')}
							sourceWidth={utils.toDips(50)}
							sourceHeight={utils.toDips(49)}
							color={'#04afc0'}
							size={utils.toDips(84)}
							itemName={'维保'}
							width={utils.screenWidth() / 3}
						/>
					</View>
					<View style={styles.rowContainer}>
						<ImageItem
							source={require('../../imgs/item_sheBei.png')}
							sourceWidth={utils.toDips(52)}
							sourceHeight={utils.toDips(44)}
							color={'#afc18d'}
							size={utils.toDips(84)}
							itemName={'装车设备'}
							width={utils.screenWidth() / 3}
						/>
						<ImageItem
							source={require('../../imgs/item_shouZhiMingXi.png')}
							sourceWidth={utils.toDips(41)}
							sourceHeight={utils.toDips(48)}
							color={'#e493e0'}
							size={utils.toDips(84)}
							itemName={'车辆收支明细'}
							width={utils.screenWidth() / 3}
						/>
						<ImageItem
							source={require('../../imgs/item_diYa.png')}
							sourceWidth={utils.toDips(52)}
							sourceHeight={utils.toDips(58)}
							color={'#3b9977'}
							size={utils.toDips(84)}
							itemName={'车辆抵押'}
							width={utils.screenWidth() / 3}
						/>
					</View>
					<View style={styles.rowContainer}>
						<ImageItem
							source={require('../../imgs/item_xiangCe.png')}
							sourceWidth={utils.toDips(49)}
							sourceHeight={utils.toDips(42)}
							color={'#4c99f4'}
							size={utils.toDips(84)}
							itemName={'车辆相册'}
							width={utils.screenWidth() / 3}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white'
	}
});
