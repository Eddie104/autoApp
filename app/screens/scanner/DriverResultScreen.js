'use strict';

import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import ScannerResultScreen from './ScannerResultScreen';
import KeyValRow from './KeyValRow';
import * as api from '../../api';

/**
 * 驾驶证识别结果
 */
export default class DriverResultScreen extends ScannerResultScreen {

	static defaultProps = {
		data: {
			name: '名字',
			cardno: '驾驶证号',
			sex: '性别',
			nation: '国籍',
			address: '地址',
			birthday: '生日',
			registerDate: '初次领证日期',
			issueDate: '有效起始日期',
			validPeriod: '有效期',
			drivingType: '准驾车型'
		},
		imgPath: ''
	};
	
	constructor(props) {
		super(props);
	}

	getTitle() {
		return '识别驾驶证结果';
	}

	renderKeyItemRow() {
		const { name, cardno, sex, nation, address, birthday, registerDate, issueDate, validPeriod, drivingType } = this.props.data;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'名字:'} itemVal={name} type={'input'} />
				<KeyValRow itemKey={'驾驶证号:'} itemVal={cardno} type={'input'} />
				<KeyValRow itemKey={'性别:'} itemVal={sex} type={'input'} />
				<KeyValRow itemKey={'国籍:'} itemVal={nation} type={'input'} />
				<KeyValRow itemKey={'地址:'} itemVal={address} type={'input'} />
				<KeyValRow itemKey={'出生日期:'} itemVal={birthday} type={'input'} />
				<KeyValRow itemKey={'初次领证日期:'} itemVal={registerDate} type={'input'} />
				<KeyValRow itemKey={'有效起始日期:'} itemVal={issueDate} type={'input'} />
				<KeyValRow itemKey={'有效期:'} itemVal={validPeriod} type={'input'} />
				<KeyValRow itemKey={'准驾车型:'} itemVal={drivingType} type={'input'} />
			</View>
		);
	}

	getAPI() {
		return api.driverData();
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
