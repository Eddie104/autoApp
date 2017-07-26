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
			isShowingSpinner: false
		};

		this._onTakePicture = this.takePicture.bind(this);
		this._onBack = this.onBack.bind(this);
	}

	render() {
		const { isShowingSpinner } = this.state;
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
							<Text style={styles.capture}>[识别]</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onBack}
							style={styles.captureContainer}
						>
							<Text style={styles.capture}>[返回]</Text>
						</TouchableOpacity>
					</View>
					{
						isShowingSpinner && <Spinner text={'识别中...'} />
					}
				</Camera>
			</View>
		);
	}

	takePicture() {
		const { isShowingSpinner } = this.state;
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
									if (action === 'idcard.scan') global.nav.push({Component: IdcardResultScreen, data: jsonData.data.item, imgPath: data.path});
									else if (action === 'driver.scan') global.nav.push({Component: DriverResultScreen, data: jsonData.data, imgPath: data.path});
									else if (action === 'driving.scan') global.nav.push({Component: DrivingResultScreen, data: jsonData.data.item, imgPath: data.path});
								} else {
									// 识别失败
									utils.toast('识别失败，请重新识别');
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
