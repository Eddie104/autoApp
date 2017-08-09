'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

import Camera from 'react-native-camera';
import Spinner from '../../components/Spinner';
import * as utils from '../../utils';
import * as config from '../../config'; 
import IdcardResultScreen from './IdcardResultScreen';
import DriverResultScreen from './DriverResultScreen';
import DrivingResultScreen from './DrivingResultScreen';

const OcrModule = require('NativeModules').OcrModule;

/**
 * 扫描证件的场景
 */
export default class ScannerScreen extends PureComponent {

	static propTypes = {
		// 识别身份证 idcard.scan
		// 识别驾照 driver.scan
		// 识别行驶证 driving.scan
		action: PropTypes.string.isRequired
	};
	
	constructor(props) {
		super(props);
		this.state = {
			isShowingSpinner: false,
			// 是否识别正面，只有识别身份证的时候才用得到
			isPositive: props.action === 'idcard.scan'
		};

		this._onTakePicture = this.takePicture.bind(this);
		this._onBack = this.onBack.bind(this);

		if (props.action === 'idcard.scan') {
			// 身份证，要识别正反面
			this._idcardData = {};
			utils.toast('请先识别正面身份证', 'center');
		} else if(props.action === 'driver.scan') {
			utils.toast('请先识别正面驾驶证', 'center');
		} else if(props.action === 'driving.scan') {
			utils.toast('请先识别正面行驶证', 'center');
		}
	}

	render() {
		const { isShowingSpinner, isPositive } = this.state;
		return (
			<View style={styles.container}>
				<Camera
					ref={(cam) => {
						this._camera = cam;
					}}
					style={styles.preview}
					aspect={Camera.constants.Aspect.fill}
					captureQuality={Camera.constants.CaptureQuality['720p']}
					captureTarget={Camera.constants.CaptureTarget.temp}
				>
					<View style={{flexDirection: 'row', width: utils.screenWidth(), justifyContent: 'space-around'}}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onTakePicture}
							style={styles.captureContainer}
						>
							<Text style={styles.capture}>{ this.props.action === 'idcard.scan' ? (isPositive ? '[识别正面]' : '[识别反面]') : '[识别]' }</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onBack}
							style={styles.captureContainer}
						>
							<Text style={styles.capture}>[返回]</Text>
						</TouchableOpacity>
					</View>
				</Camera>
				{
					isShowingSpinner && <Spinner backgroundColor={'rgba(0, 0, 0, 0.5)'} textBackgroundColor={'rgba(0, 0, 0, .7)'} text={'识别中...'} />
				}
			</View>
		);
	}

	takePicture() {
		const { isShowingSpinner, isPositive } = this.state;
		if (!isShowingSpinner) {
			this._camera.capture()
				.then((data) => {
					this.setState({
						isShowingSpinner: true
					}, () => {
						const { action } = this.props;
						OcrModule.tryToSend(config.YUN_MAI_ACCOUNT, config.YUN_MAI_PASSWORD, action, data.path, (result) => {
							this.setState({
								isShowingSpinner: false
							}, () => {
								const jsonData = JSON.parse(result.data);
								if (jsonData.status === 'OK') {
									if (action === 'idcard.scan') {
										if (isPositive) {
											// 开始识别反面
											this._idcardData = jsonData.data.item;
											this._positiveImgPath = data.path;
											this.setState({
												isPositive: false
											});
											utils.toast('请识别反面身份证', 'center');
										} else {
											// 身份证背面的信息有：
											// issue_authority: "签发单位",
											// valid_period: "有效期"
											this._idcardData.issue_authority = jsonData.data.item.issue_authority;
											this._idcardData.valid_period = jsonData.data.item.valid_period;
											global.nav.push({Component: IdcardResultScreen, data: this._idcardData, backImgPath: data.path, imgPath: this._positiveImgPath});
										}
									} else if (action === 'driver.scan') {
										global.nav.push({Component: DriverResultScreen, data: jsonData.data, imgPath: data.path});
									} else if (action === 'driving.scan') {
										global.nav.push({Component: DrivingResultScreen, data: jsonData.data.item, imgPath: data.path});
									}
								} else {
									// 识别失败
									// utils.toast('识别失败，请重新识别');
									const statusStr = jsonData.status.toString();
									if (statusStr == '-90') {
										utils.toast('无此接口权限');
									} else if (statusStr == '-91') {
										utils.toast('余额不足');
									} else if (statusStr == '-92') {
										utils.toast('用户已冻结');
									} else if (statusStr == '-98') {
										utils.toast('时间超限');
									} else if (statusStr == '-99') {
										utils.toast('验证md5错误');
									}  else if (statusStr == '-100') {
										utils.toast('用户名或者密码错误');
									} else if (statusStr == '-101') {
										utils.toast('上传失败');
									} else if (statusStr == '-102') {
										utils.toast('文件上传太大');
									} else if (statusStr == '-106') {
										utils.toast('请求出现异常');
									} else if (statusStr == '-110') {
										utils.toast('识别失败，请重新识别');
									} else if (statusStr == '-117') {
										utils.toast('账号超过15天试用期或试用期内当天可识别次数已达上限');
									} else if (statusStr == '-118') {
										utils.toast('用户账户余额为0或可识别次数为0');
									}
								}
							});
						});
					});
				}).catch(err => console.error(err));
		}
	}

	onBack() {
		const { isShowingSpinner } = this.state;
		if (!isShowingSpinner) {
			global.nav.pop();
		}
	}

	getTitle() {
		const { action } = this.props;
		if (action === 'idcard.scan') return '识别身份证';
		if (action === 'driver.scan') return '识别驾照';
		if (action === 'driving.scan') return '识别行驶证';
		return action;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	captureContainer: {
		width: utils.toDips(325),
		height: utils.toDips(90),
		backgroundColor: '#3e8ed7',
		borderRadius: utils.toDips(10),
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: utils.toDips(50)
	},
	capture: {
		color: 'white',
		fontSize: utils.getFontSize(28),
		backgroundColor: 'transparent'
	}
});
