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
 * 行驶证识别结果
 */
export default class DrivingResultScreen extends ScannerResultScreen {

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
		},
		imgPath: ''
	};
	
	constructor(props) {
		super(props);

		const { name, cardno, vehicleType, address, useCharacte, model, vin, enginePN, registerDate, issueDate } = props.data;
		this.state = {
			imgBase64: '',
			name,
			cardno,
			vehicleType,
			address,
			useCharacte,
			model,
			vin,
			enginePN,
			registerDate,
			issueDate,
			isShowingSpinner: false
		};

		this._onNameChanged = this.onNameChanged.bind(this);
		this._onCardnoChanged = this.onCardnoChanged.bind(this);
		this._onVehicleTypeChanged = this.onVehicleTypeChanged.bind(this);
		this._onAddressChanged = this.onAddressChanged.bind(this);
		this._onUseCharacteChanged = this.onUseCharacteChanged.bind(this);
		this._onModelChanged = this.onModelChanged.bind(this);
		this._onVinChanged = this.onVinChanged.bind(this);
		this._onEnginePNChanged = this.onEnginePNChanged.bind(this);
		this._onRegisterDateChanged = this.onRegisterDateChanged.bind(this);
		this._onIssueDateChanged = this.onIssueDateChanged.bind(this);
	}

	getTitle() {
		return '识别行驶证结果';
	}

	renderKeyItemRow() {
		const { cardno, vehicleType, name, address, useCharacte, model, vin, enginePN, registerDate, issueDate } = this.state;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'号牌号码:'} itemVal={cardno} type={'input'} onTextChanged={this._onCardnoChanged} />
				<KeyValRow itemKey={'车辆类型:'} itemVal={vehicleType} type={'input'} onTextChanged={this._onVehicleTypeChanged} />
				<KeyValRow itemKey={'所有人:'} itemVal={name} type={'input'} onTextChanged={this._onNameChanged} />
				<KeyValRow itemKey={'住址:'} itemVal={address} type={'input'} numberOfLines={3} onTextChanged={this._onAddressChanged} />
				<KeyValRow itemKey={'使用性质:'} itemVal={useCharacte} type={'input'} onTextChanged={this._onUseCharacteChanged} />
				<KeyValRow itemKey={'品牌型号:'} itemVal={model} type={'input'} onTextChanged={this._onModelChanged} />
				<KeyValRow itemKey={'车辆识别代号:'} itemVal={vin} type={'input'} onTextChanged={this._onVinChanged} />
				<KeyValRow itemKey={'发动机号码:'} itemVal={enginePN} type={'input'} onTextChanged={this._onEnginePNChanged} />
				<KeyValRow itemKey={'注册日期:'} itemVal={registerDate} type={'input'} onTextChanged={this._onRegisterDateChanged} />
				<KeyValRow itemKey={'发证日期:'} itemVal={issueDate} type={'input'} onTextChanged={this._onIssueDateChanged} />
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

	onVehicleTypeChanged(vehicleType) {
		this.setState({
			vehicleType
		});
	}

	onAddressChanged(address) {
		this.setState({
			address
		});
	}

	onUseCharacteChanged(useCharacte) {
		this.setState({
			useCharacte
		});
	}

	onModelChanged(model) {
		this.setState({
			model
		});
	}

	onVinChanged(vin) {
		this.setState({
			vin
		});
	}

	onEnginePNChanged(enginePN) {
		this.setState({
			enginePN
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

	checkLegal() {
		const { name, cardno, vin, enginePN, registerDate, issueDate } = this.state;
		if (typeof(name) === 'string' && (name.length === 0 || name.length > 5)) {
			utils.toast('请输入正确的姓名！');
			return false;
		}
		if (cardno.length === 0) {
			utils.toast('请输入正确的号牌号码！');
			return false;
		}
		if (vin.length === 0) {
			utils.toast('请输入正确的车辆识别代号！');
			return false;
		}
		if (enginePN.length === 0) {
			utils.toast('请输入正确的发动机号码！');
			return false;
		}
		if (registerDate.length === 0 || !utils.checkDate(registerDate.substr(0, 4), registerDate.substr(4, 2), registerDate.substr(6, 2))) {
			utils.toast('请输入正确的注册日期！');
			return false;
		}
		if (issueDate.length === 0 || !utils.checkDate(issueDate.substr(0, 4), issueDate.substr(4, 2), issueDate.substr(6, 2))) {
			utils.toast('请输入正确的发证日期！');
			return false;
		}
		return true;
	}


	getAPI() {
		return api.carData();
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
