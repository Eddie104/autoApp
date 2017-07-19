'use strict';

import React, { PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';

import * as utils from '../../utils';
import ScannerResultScreen from './ScannerResultScreen';
import KeyValRow from './KeyValRow';
import RNFS from 'react-native-fs';

/**
 * 身份证识别结果
 */
export default class IdcardResultScreen extends ScannerResultScreen {

	static propTypes = {
		data: PropTypes.object,
		imgPath: PropTypes.string
	};

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
		this.state = {
			imgBase64: ''
		};
	}

	componentDidMount() {
		// substring(7) -> to remove the file://
		RNFS.readFile(utils.isIOS() ? this.props.imgPath : this.props.imgPath.substring(7), "base64").then(imgBase64 => this.setState({
			imgBase64
		}));
	}

	getTitle() {
		return '识别身份证结果';
	}

	renderKeyItemRow() {
		const { name, cardno, sex, folk, birthday, address } = this.props.data;
		const { imgBase64 } = this.state;
		return (
			<View style={styles.container}>
				<KeyValRow itemKey={'名字:'} itemVal={name} type={'input'} />
				<KeyValRow itemKey={'身份证号:'} itemVal={cardno} type={'input'} />
				<KeyValRow itemKey={'性别:'} itemVal={sex} type={'input'} />
				<KeyValRow itemKey={'民族:'} itemVal={folk} type={'input'} />
				<KeyValRow itemKey={'生日:'} itemVal={birthday} type={'input'} />
				<KeyValRow itemKey={'地址:'} itemVal={address} type={'input'} />
				<Text style={{}}>
					imgPath = { this.props.imgPath }
				</Text>
				<Image style={{width: 200, height: 200}} source={{ uri: `data:image/jpeg;base64,${imgBase64}` }} />
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
