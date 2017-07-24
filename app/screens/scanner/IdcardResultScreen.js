'use strict';

import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as api from '../../api';
import ScannerResultScreen from './ScannerResultScreen';
import KeyValRow from './KeyValRow';

/**
 * 身份证识别结果
 */
export default class IdcardResultScreen extends ScannerResultScreen {

	static defaultProps = {
		data: {
			name: '名字',
			cardno: '身份证号',
			sex: '性别',
			folk: '民族',
			birthday: '生日',
			address: '地址',
			// 头像的base64
			// header_pic: ''
		},
		imgPath: ''
	};

	constructor(props) {
		super(props);
	}

	getTitle() {
		return '识别身份证结果';
	}

	renderKeyItemRow() {
		const { name, cardno, sex, folk, birthday, address } = this.state;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'名字:'} itemVal={name} type={'input'} />
				<KeyValRow itemKey={'身份证号:'} itemVal={cardno} type={'input'} />
				<KeyValRow itemKey={'性别:'} itemVal={sex} type={'input'} />
				<KeyValRow itemKey={'民族:'} itemVal={folk} type={'input'} />
				<KeyValRow itemKey={'生日:'} itemVal={birthday} type={'input'} />
				<KeyValRow itemKey={'地址:'} itemVal={address} type={'input'} />
			</View>
		);
	}

	getAPI() {
		return api.idData();
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
