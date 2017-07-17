'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';

import TopBar from '../../components/TopBar';
import * as utils from '../../utils';

/**
 * 扫描结果场景的父类
 */
export default class ScannerResultScreen extends PureComponent {	

	constructor(props) {
		super(props);

		this._onOK = this.onOK.bind(this);
		this._onBack = this.onBack.bind(this);
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={ this.getTitle() } showMoreBtn={false} />
				{
					this.renderKeyItemRow()
				}
				{
					// 通过和拒绝两个按钮
				}
				<View style={styles.btnContainer}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._onOK}
						style={styles.btn}
					>
						<Text style={styles.btnText}>
							确定
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._onBack}
						style={[styles.btn, {marginLeft: utils.toDips(82), backgroundColor: '#e54c65'}]}
					>
						<Text style={styles.btnText}>
							重新识别
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	getTitle() {
		return '扫描结果';
	}

	renderKeyItemRow() {
		return null;
	}

	onOK() {

	}

	onBack() {
		global.nav.pop();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	btnContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(208),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	btn: {
		width: utils.toDips(260),
		height: utils.toDips(90),
		backgroundColor: '#3e8ed7',
		borderRadius: utils.toDips(10),
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnText: {
		color: 'white',
		fontSize: utils.getFontSize(28),
		backgroundColor: 'transparent'
	}
});
