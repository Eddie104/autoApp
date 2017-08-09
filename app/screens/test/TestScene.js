'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import DateTimePicker from '../../components/DateTimePicker';
// import ConstantsUtils  from '../util/ConstantsUtils';


import Picker from 'react-native-picker';

export default class TestScene extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			date: ''
		}

		this._picker = null;
	}

	componentDidMount() {
		// console.warn(PopPicker);
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={ '测试场景' } showMoreBtn={false} />
				<Text style={{}} onPress={() => this.showTimePicker()}>
					时间选择器
				</Text>
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
