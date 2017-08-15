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
			imgBase64: null
		}

		this._picker = null;
	}

	componentDidMount() {
		// console.warn(PopPicker);
	}

	render() {
		const { imgBase64 } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={ '测试场景' } showMoreBtn={false} />
				<QuestionDateComponent modelProperty={{name: 'keykeykey'}} itemVal={'valvalval'} />
				<QuestionDateComponent modelProperty={{name: 'keykeykeykeykeykey'}} itemVal={'valvalval'} />
				<QuestionDateComponent modelProperty={{name: 'keykeykey'}} itemVal={'valvalval'} />

				<Text style={{}} onPress={() => {
					const uri = 'assets-library://asset/asset.JPG?id=ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED&ext=JPG';
					utils.getImgBase64(uri, (imgBase64) => {
						this.setState({
							imgBase64 
						});
					});
				}}>
					测试
				</Text>
				{
					imgBase64 && <Image style={{width: utils.toDips(750), height: utils.toDips(1280 * 750 / 720)}} source={{ uri: `data:image/jpeg;base64,${imgBase64}` }} />
				}
			</View>
		);
	}

	showTimePicker() {
		if(!this._picker){
			this._picker = DateTimePicker();
		}
        this._picker.toggle();
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
