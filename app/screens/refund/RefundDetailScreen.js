'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';

export default class RefundDetailScreen extends PureComponent {

	static propTypes = {
		refundData: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { refundData } = this.props;
		return (
			<View style={styles.container}>
				<TopBar title={'退款审核'} showMoreBtn={false} />
				{
					// 顶部用户信息
				}
				<View style={styles.topUserContainer}>
					{
						// 头像
					}
					<Image style={styles.userHead} source={require('../../imgs/user_head.png')}/>
					<View style={{marginLeft: utils.toDips(28), borderColor: 'red',  borderWidth: 1,}}>
						<View style={{flexDirection: 'row'}}>
							{
								// 名字和钱
							}
							<View style={styles.nameContainer}>
								<Text style={styles.name}>{refundData.name}</Text>
								<Text style={styles.cny}>￥{refundData.cny}</Text>
							</View>
							{
								// 手机号
							}
							<View style={styles.phoneContainer}>
								<Text style={styles.phone}>{refundData.phone}</Text>
								<Text style={styles.cnyType}>定金</Text>
							</View>
						</View>
						<Text style={styles.date}>2016-10-02 05:23</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	topUserContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(165),
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center'
	},
	userHead: {
		width: utils.toDips(90),
		height: utils.toDips(90),
		marginLeft: utils.toDips(28)
	},
	nameContainer: {
		width: utils.toDips(204),
		justifyContent: 'space-between'
	},
	name: {
		fontSize: utils.getFontSize(23),
		color: '#1a1a1a'
	},
	cny: {
		fontSize: utils.getFontSize(18),
		color: '#eb2a33',
		marginTop: utils.toDips(15)
	},
	phoneContainer: {
		width: utils.toDips(400),
		justifyContent: 'space-between'
	},
	phone: {
		fontSize: utils.getFontSize(23),
		color: '#4e4e4e'
	},
	cnyType: {
		fontSize: utils.getFontSize(20),
		color: '#7d7d7d'
	},
	date: {
		color: '#a5a5a5',
		fontSize: utils.getFontSize(18),
		marginTop: utils.toDips(14)
	}
});
