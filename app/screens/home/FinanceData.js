'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import * as utils from '../../utils';
import CircularProgress from './CircularProgress';

/**
 * 首页里的财务数据
 */
export default class FinanceData extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: utils.toDips(30),
						marginLeft: utils.toDips(10)
					}}
				>
					{
						// 小竖条
					}
					<View style={{
						backgroundColor: '#feb02a',
						width: utils.toDips(6),
						height: utils.toDips(30)
					}} />
					<Text
						style={{
							color: '#364153',
							fontSize: utils.getFontSize(21),
							marginLeft: utils.toDips(20)
						}}
					>
						财务数据
					</Text>
				</View>
				{
					// 各种圆形的进度条
				}
				<View
					style={styles.circularProgressContainer}>
					<CircularProgress color={'#63c53c'} value={95} name={'管理费'} nameVal={'￥1200'} />
					<CircularProgress color={'#4ecfe2'} value={40} name={'租金'} nameVal={'￥4156'} />
					<CircularProgress color={'#feb02a'} value={70} name={'保险费'} nameVal={'￥1600'} />
					<CircularProgress color={'#92a7ff'} value={80} name={'押金'} nameVal={'￥1000'} />
					<CircularProgress color={'#fe8973'} value={60} name={'定金'} nameVal={'￥10000'} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginTop: utils.toDips(18),
		paddingBottom: utils.toDips(40)
	},
	circularProgressContainer: {
		width: utils.screenWidth(),
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'flex-start',
	}
});
