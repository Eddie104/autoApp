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

		this._onNameChanged = this.onNameChanged.bind(this);
		this._onCardnoChanged = this.onCardnoChanged.bind(this);
		this._onSexChanged = this.onSexChanged.bind(this);
		this._onNationChanged = this.onNationChanged.bind(this);
		this._onAddressChanged = this.onAddressChanged.bind(this);
		this._onBirthdayChanged = this.onBirthdayChanged.bind(this);
		this._onRegisterDateChanged = this.onRegisterDateChanged.bind(this);
		this._onIssueDateChanged = this.onIssueDateChanged.bind(this);
		this._onValidPeriodChanged = this.onValidPeriodChanged.bind(this);
		this._onDrivingTypeChanged = this.onDrivingTypeChanged.bind(this);
	}

	getTitle() {
		return '识别驾驶证结果';
	}

	renderKeyItemRow() {
		const { name, cardno, sex, nation, address, birthday, registerDate, issueDate, validPeriod, drivingType } = this.props.data;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'名字:'} itemVal={name} type={'input'} onTextChanged={this._onNationChanged} />
				<KeyValRow itemKey={'驾驶证号:'} itemVal={cardno} type={'input'} onTextChanged={this._onCardnoChanged} />
				<KeyValRow itemKey={'性别:'} itemVal={sex} type={'input'} onTextChanged={this._onSexChanged} />
				<KeyValRow itemKey={'国籍:'} itemVal={nation} type={'input'} onTextChanged={this._onNationChanged} />
				<KeyValRow itemKey={'地址:'} itemVal={address} type={'input'} numberOfLines={3} onTextChanged={this._onAddressChanged} />
				<KeyValRow itemKey={'出生日期:'} itemVal={birthday} type={'input'} onTextChanged={this._onBirthdayChanged} />
				<KeyValRow itemKey={'初次领证日期:'} itemVal={registerDate} type={'input'} onTextChanged={this._onRegisterDateChanged} />
				<KeyValRow itemKey={'有效起始日期:'} itemVal={issueDate} type={'input'} onTextChanged={this._onIssueDateChanged} />
				<KeyValRow itemKey={'有效期:'} itemVal={validPeriod} type={'input'} onTextChanged={this._onValidPeriodChanged} />
				<KeyValRow itemKey={'准驾车型:'} itemVal={drivingType} type={'input'} onTextChanged={this._onDrivingTypeChanged} />
			</View>
		);
	}

	onNameChanged(name){
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

	onNationChanged(nation) {
		this.setState({
			nation
		});
	}

	onAddressChanged(address) {
		this.setState({
			address
		});
	}

	onBirthdayChanged(birthday) {
		this.setState({
			birthday
		});
	}

	onRegisterDateChanged(registerDate) {
		this.setState({
			registerDate
		});
	}

	onIssueDateChanged(issueDate) {
		this.setState({
			issueDate
		});
	}

	onValidPeriodChanged(validPeriod) {
		this.setState({
			validPeriod
		});
	}

	onDrivingTypeChanged(drivingType) {
		this.setState({
			drivingType
		});
	}

	checkLegal() {
		const { name, cardno, drivingType, issueDate, validPeriod } = this.state;
		if (name.length === 0 || name.length > 5) {
			utils.toast('请输入正确的姓名！');
			return false;
		}
		if (!utils.isCardno(cardno)) {
			utils.toast('请输入正确的驾驶证号！');
			return false;
		}

		const legalDrivingType = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2', 'C3', 'C4', 'C5'];
		let isDrivingTypeLegal = false;
		for (let i = 0; i < legalDrivingType.length; i++) {
			if (legalDrivingType[i] === drivingType) {
				isDrivingTypeLegal = true;
				break;
			}
		}
		if (!isDrivingTypeLegal) {
			utils.toast('请输入正确的准驾类型！');
			return false;
		}

		if (issueDate === '') {
			utils.toast('请输入正确的有效起始日期！');
			return false;
		}

		if (validPeriod === '') {
			utils.toast('请输入正确的有效期！');
			return false;
		}

		return true;
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
