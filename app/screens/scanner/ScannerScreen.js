'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import Camera from 'react-native-camera';
import TopBar from '../../components/TopBar';
import * as net from '../../net';
import * as utils from '../../utils';

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
				<TopBar title={'车辆资产'} showMoreBtn={false} />
				<Camera
					ref={(cam) => {
						this.camera = cam;
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
		this.camera.capture()
			.then((data) => {
				const { action } = this.props;
				OcrModule.tryToSend('add9ab6a-10ff-4ae9-932a-ec685a57e80d', 'WIBreoZyRcfOjPPxxSLXKFwrDKfHQZ', action, data.path, (result) => {
					// {"status":"OK","data":{"facade":"0","item":{"name":"周鸿杰","cardno":"362301198610041014","sex":"男","folk":"汉","birthday":"1986年10月04日","address":"江西省上饶市信州区胜利路43号3栋3单元601室","issue_authority":[],"valid_period":[],"header_pic":[]}}}
					const jsonData = JSON.parse(utils.isIOS() ? result : result.data);
					if (jsonData.status === 'OK') {

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
