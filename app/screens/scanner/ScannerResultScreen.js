'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Image
} from 'react-native';

import RNFS from 'react-native-fs';
import TopBar from '../../components/TopBar';
import * as utils from '../../utils';
import * as api from '../../api';
import * as net from '../../net';

/**
 * 扫描结果场景的父类
 */
export default class ScannerResultScreen extends PureComponent {

	static propTypes = {
		data: PropTypes.object,
		imgPath: PropTypes.string
	};

	constructor(props) {
		super(props);

		this.state = {
			imgBase64: '',
			...props.data
		};

		this._onOK = this.onOK.bind(this);
		this._onBack = this.onBack.bind(this);
	}

	componentDidMount() {
		// substring(7) -> to remove the file://
		RNFS.readFile(utils.isIOS() ? this.props.imgPath : this.props.imgPath.substring(7), "base64").then(imgBase64 => this.setState({
			imgBase64
		}));
	}

	render() {
		const { imgBase64 } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={ this.getTitle() } showMoreBtn={false} />
				{
					this.renderKeyItemRow()
				}
				<Image style={{width: 200, height: 200}} source={{ uri: `data:image/jpeg;base64,${imgBase64}` }} />
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
		utils.toast(JSON.stringify(this.state));
		net.post(this.getAPI(), this.state, result => {
			utils.toast(result.status.toString());
			// utils.toast(utils.obj2Str(result));
		}, err => {
			utils.toast(err);
		});
	}

	onBack() {
		global.nav.pop();
	}

	getAPI() {
		return api.idData();
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
