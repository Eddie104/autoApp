'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import Camera from 'react-native-camera';

export default class TestScene extends PureComponent {

	constructor(props) {
		super(props);

		this._onBack = this.onBack.bind(this);
	}

	render() {
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
					onBarCodeRead={e => {
						utils.toast(e.data);
					}}
					barCodeTypes={['qr']}
				>
					<View style={{flexDirection: 'row', width: utils.screenWidth(), justifyContent: 'space-around'}}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onBack}
							style={styles.captureContainer}
						>
							<Text style={styles.capture}>[返回]</Text>
						</TouchableOpacity>
					</View>
				</Camera>
			</View>
		);
	}

	onBack() {
		global.nav.pop();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
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
