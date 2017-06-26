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
				<CircularProgress />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginTop: utils.toDips(18)
	}
});
