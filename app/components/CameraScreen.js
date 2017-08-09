'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

import Camera from 'react-native-camera';
import * as utils from '../utils';

/**
 * 拍照场景
 */
export default class CameraScreen extends PureComponent {

	static propTypes = {
		onTakePicture: PropTypes.func
	};

	static defaultProps = {
		onTakePicture: () => {}
	};
	
	constructor(props) {
		super(props);

		this._onTakePicture = this.onTakePicture.bind(this);
		this._onBack = this.onBack.bind(this);
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
					captureTarget={Camera.constants.CaptureTarget.cameraRoll}
					captureQuality={Camera.constants.CaptureQuality["720p"]}
				>
					<View style={{flexDirection: 'row', width: utils.screenWidth(), justifyContent: 'space-around'}}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onTakePicture}
							style={styles.captureContainer}
						>
							<Text style={styles.capture}>[拍照]</Text>
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
			</View>
		);
	}

	 onTakePicture() {
		const { onTakePicture } = this.props;
		this.camera.capture({metadata: {}}).then((data) => {
			onTakePicture(data);
			this.onBack();
		}).catch(err => {
			console.warn(err);
		});
	}

	onBack() {
		global.nav.pop();
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
