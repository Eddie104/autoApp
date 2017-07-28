'use strict';

import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
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
			cardno: '362301198610041014',
			sex: '男',
			folk: '民族',
			birthday: '生日',
			address: '地址地址地址地址地址地址地址地址地址地址'
		},
		imgPath: ''
	};

	constructor(props) {
		super(props);

		this._onNameChanged = this.onNameChanged.bind(this);
		this._onCardnoChanged = this.onCardnoChanged.bind(this);
		this._onSexChanged = this.onSexChanged.bind(this);
		this._onFolkChanged = this.onFolkChanged.bind(this);
		this._onBirthdayChanged = this.onBirthdayChanged.bind(this);
		this._onAddressChanged = this.onAddressChanged.bind(this);
	}

	getTitle() {
		return '识别身份证结果';
	}

	renderKeyItemRow() {
		const { name, cardno, sex, folk, birthday, address } = this.state;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'名字:'} itemVal={name} type={'input'} onTextChanged={this._onNameChanged} />
				<KeyValRow itemKey={'身份证号:'} itemVal={cardno} type={'input'} onTextChanged={this._onCardnoChanged} />
				<KeyValRow itemKey={'性别:'} itemVal={sex} type={'input'} onTextChanged={this._onSexChanged} />
				<KeyValRow itemKey={'民族:'} itemVal={folk} type={'input'} onTextChanged={this._onFolkChanged} />
				<KeyValRow itemKey={'生日:'} itemVal={birthday} type={'input'} onTextChanged={this._onBirthdayChanged} />
				<KeyValRow itemKey={'地址:'} itemVal={address} type={'input'} numberOfLines={3} onTextChanged={this._onAddressChanged} />
			</View>
		);
	}

	onNameChanged(name) {
		this.setState({
			name
		});
	}

	onCardnoChanged(cardno) {
		this.setState({
			cardno
		});
	}

	onSexChanged(sex) {
		this.setState({
			sex
		});
	}

	onFolkChanged(folk) {
		this.setState({
			folk
		});
	}

	onBirthdayChanged(birthday) {
		this.setState({
			birthday
		});
	}

	onAddressChanged(address) {
		this.setState({
			address
		});
	}

	checkLegal() {
		const { name, cardno, sex } = this.state;
		if (typeof(name) === 'string' && (name.length === 0 || name.length > 5)) {
			utils.toast('请输入正确的姓名！');
			return false;
		}
		if (!utils.isCardno(cardno)) {
			utils.toast('请输入正确的身份证号！');
			return false;
		}
		if (sex !== '男' && sex !== '女') {
			utils.toast('请输入正确的性别！');
			return false;
		}
		return true;
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
