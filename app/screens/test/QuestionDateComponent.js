'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput
} from 'react-native';

import * as utils from '../../utils';
import RadioModal from '../../components/RadioModal';

export default class QuestionStringComponent extends PureComponent {
	
	constructor(props) {
		super(props);
		this.state = {
			curType: null,
			curName: null,
			isShowingLeaveTypeModal:false,
		};
		
	}
	
	static propTypes = {
		itemKey: PropTypes.string,
		itemVal: PropTypes.string,
		hasLine: PropTypes.bool,
    	numberOfLines: PropTypes.number,
    	propertyObject: PropTypes.object,
    	onTextChanged: PropTypes.func
	};
	
	static defaultProps = {
		itemKey: '键',
		itemVal: '值',
		hasLine: true,
		numberOfLines: 1,
		propertyObject:null,
		onTextChanged: null
	};

	render() {
		const { modelProperty ,hasLine, numberOfLines } = this.props;
		return (
			<View>
				<View style={styles.itemContainer}>
					<Text style={styles.itemKey}>
						{modelProperty.name}
					</Text>
					<TextInput
						maxLength={30}
						autoCapitalize={"none"}
						style={styles.daysText}
						// 关闭拼写自动修正
						autoCorrect={false}
						keyboardType={"default"}
						multiline={false}
						value={this.state.itemVal}
						onChangeText={this._onLeaveDaysChanged}
						placeholder={"请输入请假天数"}
						placeholderTextColor={'#cbcbcb'}
						underlineColorAndroid={'transparent'}
						returnKeyType="default"
					/>
				</View>
				<View style={styles.line} />
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		width: utils.screenWidth(),
		height: utils.toDips(93),
		backgroundColor: 'white',
		alignItems: 'center',
		paddingLeft: utils.toDips(20),
		paddingRight: utils.toDips(20),
		justifyContent: 'space-between'
	},
	itemKey: {
		color: '#364153',
		fontSize: utils.getFontSize(22),
		backgroundColor: 'transparent',
	},
	textInput: {
		fontSize: utils.getFontSize(22),
		color: "#364153",
		width: utils.screenWidth() - utils.toDips(22),
		height: utils.toDips(93),
		marginTop: utils.toDips(10),
		flex: 1,
		textAlign: 'left',
		textAlignVertical: 'top',
		includeFontPadding: false
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginLeft: utils.toDips(38)
	},
	line: {
		width: utils.screenWidth(),
		height: utils.toDips(1.5),
		backgroundColor: '#dddfe2'
	},
	daysText: {
		fontSize: utils.getFontSize(22),
		color: "#364153",
		width: utils.toDips(87),
		flex: 1,
		textAlign: 'right',
		textAlignVertical: 'center',
		includeFontPadding: false,
		paddingRight: utils.toDips(38)
	}
});
