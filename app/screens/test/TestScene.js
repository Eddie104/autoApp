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
import DateTimePicker from '../../components/DateTimePicker';
// import ConstantsUtils  from '../util/ConstantsUtils';
import QuestionDateComponent from './QuestionDateComponent';
import RNFS from 'react-native-fs';


// import Picker from 'react-native-picker';
const FileModule = require('NativeModules').FileModule;

export default class TestScene extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			imgBase64Arr: []
		}
		this._imgBase64Arr = [];
	}

	render() {
		const { imgBase64Arr } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={ '测试场景' } showMoreBtn={false} />
				<Text style={{}} onPress={() => {
					const uriArr = [
						'assets-library://asset/asset.JPG?id=B84E8479-475C-4727-A4A4-B77AA9980897&ext=JPG',
						'assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG'
					];
					this.test(uriArr, () => {
						this.setState({
							imgBase64Arr: this._imgBase64Arr
						});
					});
				}}>
					测试
				</Text>
				{
					imgBase64Arr.map((imgBase64, index) => {
						return <Image key={index} style={{width: utils.toDips(200), height: utils.toDips(200)}} source={{ uri: `data:image/jpeg;base64,${imgBase64}` }} />
					})
				}
			</View>
		);
	}

	test(uriArr, cb) {
		if (uriArr.length > 0) {
			utils.getImgBase64(uriArr.shift(), (imgBase64) => {
				this._imgBase64Arr.push(imgBase64);
				this.test(uriArr, cb);
			});
		} else {
			cb();
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	
	itemImg: {
		width: utils.screenWidth(),
		// topbar的高度是124
		height: utils.screenHeight() - utils.toDips(124),
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	
	/*preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},*/
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
