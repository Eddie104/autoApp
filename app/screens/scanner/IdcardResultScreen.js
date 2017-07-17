'use strict';

import React, { PropTypes } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import ScannerResultScreen from './ScannerResultScreen';
import KeyValRow from './KeyValRow';

/**
 * 身份证识别结果
 */
export default class IdcardResultScreen extends ScannerResultScreen {

	static propTypes = {
		data: PropTypes.object,
	};

	static defaultProps = {
		data: {
			name: '名字',
			cardno: '身份证号',
			sex: '性别',
			folk: '民族',
			birthday: '生日',
			address: '地址'
		}
	};
	
	constructor(props) {
		super(props);
	}

	getTitle() {
		return '识别身份证结果';
	}

	renderKeyItemRow() {
		const { data } = this.props;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'名字:'} itemVal={data.name} type={'input'} />
				<KeyValRow itemKey={'身份证号:'} itemVal={data.cardno} type={'input'} />
				<KeyValRow itemKey={'性别:'} itemVal={data.sex} type={'input'} />
				<KeyValRow itemKey={'民族:'} itemVal={data.folk} type={'input'} />
				<KeyValRow itemKey={'生日:'} itemVal={data.birthday} type={'input'} />
				<KeyValRow itemKey={'地址:'} itemVal={data.address} type={'input'} />
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
