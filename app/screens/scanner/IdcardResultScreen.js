'use strict';

import React from 'react';
import {
	StyleSheet,
	View,
	Image
} from 'react-native';

import RNFS from 'react-native-fs';
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
			address: '地址地址地址地址地址地址地址地址地址地址',
			issue_authority: "签发单位",
			valid_period: "有效期"
		},
		imgPath: '',
		backImgPath: ''
	};

	constructor(props) {
		super(props);
		const { name, cardno, sex, folk, birthday, address, issue_authority, valid_period } = props.data;
		this.state = {
			imgBase64: '',
			backImgBase64: '',
			name,
			cardno,
			sex,
			folk,
			birthday,
			address,
			issue_authority,
			valid_period,
			isShowingSpinner: false
		};

		this._onNameChanged = this.onNameChanged.bind(this);
		this._onCardnoChanged = this.onCardnoChanged.bind(this);
		this._onSexChanged = this.onSexChanged.bind(this);
		this._onFolkChanged = this.onFolkChanged.bind(this);
		this._onBirthdayChanged = this.onBirthdayChanged.bind(this);
		this._onAddressChanged = this.onAddressChanged.bind(this);
		this._onIssueAuthorityChanged = this.onIssueAuthorityChanged.bind(this);
		this._onValidPeriodChanged = this.onValidPeriodChanged.bind(this);
	}

	componentDidMount() {
		const { imgPath, backImgPath } = this.props;
		// substring(7) -> to remove the file://
		RNFS.readFile(utils.isIOS() ? imgPath : imgPath.substring(7), 'base64').then(imgBase64 => {
			RNFS.readFile(utils.isIOS() ? backImgPath : backImgPath.substring(7), 'base64').then(backImgBase64 => {
				this.setState({
					imgBase64,
					backImgBase64
				});
			});
		});
	}

	getTitle() {
		return '识别身份证结果';
	}

	renderBackImg() {
		const { backImgBase64 } = this.state;
		return (
			<Image style={{width: utils.toDips(750), height: utils.toDips(1280 * 750 / 720)}} source={{ uri: `data:image/jpeg;base64,${backImgBase64}` }} />
		);
	}

	renderKeyItemRow() {
		const { name, cardno, sex, folk, birthday, address, issue_authority, valid_period } = this.state;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'名字:'} itemVal={name} type={'input'} onTextChanged={this._onNameChanged} />
				<KeyValRow itemKey={'身份证号:'} itemVal={cardno} type={'input'} onTextChanged={this._onCardnoChanged} />
				<KeyValRow itemKey={'性别:'} itemVal={sex} type={'input'} onTextChanged={this._onSexChanged} />
				<KeyValRow itemKey={'民族:'} itemVal={folk} type={'input'} onTextChanged={this._onFolkChanged} />
				<KeyValRow itemKey={'生日:'} itemVal={birthday} type={'input'} onTextChanged={this._onBirthdayChanged} />
				<KeyValRow itemKey={'地址:'} itemVal={address} type={'input'} numberOfLines={3} onTextChanged={this._onAddressChanged} />
				<KeyValRow itemKey={'签发单位:'} itemVal={issue_authority} type={'input'} onTextChanged={this._onIssueAuthorityChanged} />
				<KeyValRow itemKey={'有效期:'} itemVal={valid_period} type={'input'} onTextChanged={this._onValidPeriodChanged} />
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

	onIssueAuthorityChanged(issue_authority) {
		this.setState({
			issue_authority
		});
	}

	onValidPeriodChanged(valid_period) {
		this.setState({
			valid_period
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
