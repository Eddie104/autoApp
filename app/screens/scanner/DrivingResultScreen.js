'use strict';

import React, { PropTypes } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import ScannerResultScreen from './ScannerResultScreen';
import KeyValRow from './KeyValRow';

/**
 * 行驶证识别结果
 */
export default class DrivingResultScreen extends ScannerResultScreen {

	static propTypes = {
		data: PropTypes.object,
	};

	static defaultProps = {
		data: {
			name: '所有人',
			cardno: '号牌号码',
			vehicleType: '车辆类型',
			address: '地址',
			useCharacte: '使用性质',
			model: '品牌型号',
			vin: '车辆识别代号',
			enginePN: '发动机号码',
			registerDate: '注册日期',
			issueDate: '发证日期'
		}
	};
	
	constructor(props) {
		super(props);
	}

	getTitle() {
		return '识别行驶证结果';
	}

	renderKeyItemRow() {
		const { data } = this.props;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'号牌号码:'} itemVal={data.cardno} type={'input'} />
				<KeyValRow itemKey={'车辆类型:'} itemVal={data.vehicleType} type={'input'} />
				<KeyValRow itemKey={'所有人:'} itemVal={data.name} type={'input'} />
				<KeyValRow itemKey={'住址:'} itemVal={data.address} type={'input'} />
				<KeyValRow itemKey={'使用性质:'} itemVal={data.useCharacte} type={'input'} />
				<KeyValRow itemKey={'品牌型号:'} itemVal={data.model} type={'input'} />
				<KeyValRow itemKey={'车辆识别代号:'} itemVal={data.vin} type={'input'} />
				<KeyValRow itemKey={'发动机号码:'} itemVal={data.enginePN} type={'input'} />
				<KeyValRow itemKey={'注册日期:'} itemVal={data.registerDate} type={'input'} />
				<KeyValRow itemKey={'发证日期:'} itemVal={data.issueDate} type={'input'} />
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
