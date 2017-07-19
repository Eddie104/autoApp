'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import Camera from 'react-native-camera';
import TopBar from '../../components/TopBar';
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
	}

	render() {
		return (
			<View style={styles.container}>
				{
					// <TopBar title={ this.getTitle() } showMoreBtn={false} />
				}
				<Camera
					ref={(cam) => {
						this._camera = cam;
					}}
					style={styles.preview}
					aspect={Camera.constants.Aspect.fill}
					captureQuality={Camera.constants.CaptureQuality['720p']}
					captureTarget={Camera.constants.CaptureTarget.temp}
				>
					<Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
				</Camera>
			</View>
		);
	}

	takePicture() {
		this._camera.capture()
			.then((data) => {
				const { action } = this.props;
				OcrModule.tryToSend(config.YUN_MAI_ACCOUNT, config.YUN_MAI_PASSWORD, action, data.path, (result) => {
					const jsonData = JSON.parse(utils.isIOS() ? result : result.data);
					if (jsonData.status === 'OK') {
						if (action === 'idcard.scan') global.nav.push({Component: IdcardResultScreen, data: jsonData.data.item, imgPath: data.path});
						else if (action === 'driver.scan') global.nav.push({Component: DriverResultScreen, data: jsonData.data, imgPath: data.path});
						else if (action === 'driving.scan') global.nav.push({Component: DrivingResultScreen, data: jsonData.data.item, imgPath: data.path});
						// utils.toast(utils.isIOS() ? result : result.data);
					} else {
						// 识别失败
					}
				});
			}).catch(err => console.error(err));
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
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		color: '#000',
		padding: 10,
		margin: 40
	}
});
