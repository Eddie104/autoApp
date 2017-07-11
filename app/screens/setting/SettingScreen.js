'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import SettingItem from './SettingItem';

export default class SettingScreen extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'设置'} showBackBtn={false} showMoreBtn={false} />
				{
					// 顶部用户信息
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={styles.userContainer}
				>
					<Image style={styles.head} source={require('../../imgs/my_head.png')} />
					{
						// 名字和手机号
					}
					<View style={styles.nameContainer}>
						<Text style={styles.name}>
							王得智
						</Text>
						<Text style={styles.phoneLabel}>
							{ '手机号码  ' }
							<Text style={styles.phone}>
								13621021103
							</Text>
						</Text>
					</View>
					{
						// 箭头
					}
					<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
				</TouchableOpacity>
				{
					// 其他
				}
				<SettingItem
					style={{marginTop: utils.toDips(22)}}
					iconSource={require('../../imgs/icon_zhangHuYuE.png')}
					iconSourceWidth={utils.toDips(29)}
					iconSourceHeight={utils.toDips(32)}
					iconSize={utils.toDips(48)}
					iconColor={'#feb02a'}
					itemName={'账户余额'}
					itemVal={'￥862.00'}
					onPress={() => {}}
				/>
				<SettingItem
					iconSource={require('../../imgs/icon_woDeHeTong.png')}
					iconSourceWidth={utils.toDips(29)}
					iconSourceHeight={utils.toDips(29)}
					iconSize={utils.toDips(48)}
					iconColor={'#92a7ff'}
					itemName={'我的合同'}
					onPress={() => {}}
				/>
				<SettingItem
					iconSource={require('../../imgs/icon_woDeZhangDan.png')}
					iconSourceWidth={utils.toDips(25)}
					iconSourceHeight={utils.toDips(28)}
					iconSize={utils.toDips(48)}
					iconColor={'#50a6ee'}
					itemName={'我的账单'}
					onPress={() => {}}
				/>
				<SettingItem
					iconSource={require('../../imgs/icon_caiWuLiuShui.png')}
					iconSourceWidth={utils.toDips(28)}
					iconSourceHeight={utils.toDips(28)}
					iconSize={utils.toDips(48)}
					iconColor={'#fe8973'}
					itemName={'财务流水'}
					onPress={() => {}}
				/>
				<SettingItem
					iconSource={require('../../imgs/icon_guanYuKuiJia.png')}
					iconSourceWidth={utils.toDips(12)}
					iconSourceHeight={utils.toDips(28)}
					iconSize={utils.toDips(48)}
					iconColor={'#21c0c7'}
					itemName={'关于盔甲'}
					onPress={() => {}}
				/>
				{
					// 退出按钮
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={styles.exitContainer}
				>
					<Text style={styles.exit}>
						退出
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	userContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(146),
		// justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row'
	},
	head: {
		width: utils.toDips(102),
		height: utils.toDips(102),
		marginLeft: utils.toDips(28)
	},
	nameContainer: {
		marginLeft: utils.toDips(16),
		flex: 1
	},
	name: {
		color: '#1a1a1a',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	},
	phoneLabel: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(20),
		marginTop: utils.toDips(12),
		backgroundColor: 'transparent'
	},
	phone: {
		color: '#4e4e4e',
		backgroundColor: 'transparent'
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginRight: utils.toDips(32)
	},
	exitContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(100),
		marginTop: utils.toDips(28),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	exit: {
		color: '#de3c48',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	}
});
