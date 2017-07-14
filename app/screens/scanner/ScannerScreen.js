'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import Camera from 'react-native-camera';
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
		const options = {};
		//options.location = ...
		this.camera.capture({metadata: options})
			.then((data) => {
				
				utils.toast(data.path);
				const { action } = this.props;
				OcrModule.tryToSend('add9ab6a-10ff-4ae9-932a-ec685a57e80d', 'WIBreoZyRcfOjPPxxSLXKFwrDKfHQZ', action, data.path, (result) => {
					// {"status":"OK","data":{"facade":"0","item":{"name":"周鸿杰","cardno":"362301198610041014","sex":"男","folk":"汉","birthday":"1986年10月04日","address":"江西省上饶市信州区胜利路43号3栋3单元601室","issue_authority":[],"valid_period":[],"header_pic":[]}}}
					utils.toast(utils.isIOS() ? result : result.data);
				});
				
				

				// net.post('http://www.yunmaiocr.com/SrvHTMLAPI', {
				// 	// <action>idcard.scan</action>
				// 	// <client>username</client><!—API账号，不是SAAS账号 -->
				// 	// <system>系统描述：包括硬件型号和操作系统型号等</system><!--不建议为空-->
				// 	// <password>password</password><!—API密码，不是SAAS密码，必须md5加密-->
				// 	// <file>二进制文件，文件最大5M</file><!--要进行识别的文件-->
				// 	// <ext>文件扩展名</ext><!--只能为下面的之一：jpg/jpeg/bmp/tif/tiff-->
				// 	// <header>是否输出头像图片</header><!—1:是；0：否；不填默认为否-->
				// 	// <json>是否需要将结果转成json格式</json><!-- 当值为1时，返回的结果是json格式，如果不传该参数或为其它值，结果返回是xml格式 -->
				// 	action: 'idcard.scan',
				// 	username: 'add9ab6a-10ff-4ae9-932a-ec685a57e80d',
				// 	password: 'WIBreoZyRcfOjPPxxSLXKFwrDKfHQZ',
				// 	format: 1,
				// 	header: 0,
				// 	er: 1,
				// 	file: image64.data
				// }, (result) => {
				// 	console.warn(typeof result);
				// 	console.warn(result);
				// }, err => {
				// 	console.error(err);
				// });
			}).catch(err => console.error(err));
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
