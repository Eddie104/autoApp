'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	DatePickerAndroid,
	TextInput
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import LeaveTypeModal from './LeaveTypeModal';
import ImageFuncPanel from './ImageFuncPanel';
import ImageListScene from './ImageListScene';
import CameraScreen from './CameraScreen';
import ActionSheet from '@yfuks/react-native-action-sheet';

/**
 * 请假场景
 */
export default class AskForLeaveScreen extends PureComponent {
	
	constructor(props) {
		super(props);
		
		const now = new Date();
		this.state = {
			// 是否显示请假类型的弹窗
			isShowingLeaveTypeModal: false,
			curType: '事假',
			startDateYear: now.getFullYear(),
			startDateMonth: now.getMonth(),
			startDateDate: now.getDate(),
			endDateYear: now.getFullYear(),
			endDateMonth: now.getMonth(),
			endDateDate: now.getDate(),
			// 请假的事由
			reason: ''
		};

		this._onLeaveTypePress = this.onLeaveTypePress.bind(this);
		this._onLeaveDateStarPress = this.onLeaveDateStarPress.bind(this);
		this._onLeaveDateEndPress = this.onLeaveDateEndPress.bind(this);

		this._onLeaveTypeSelected = this.onLeaveTypeSelected.bind(this);
		this._onReasonChanged = this.onReasonChanged.bind(this);

		this._onAddImage = this.onAddImage.bind(this);
	}

	componentWillMount() {
		this._navigatorListener = global.nav.navigationContext.addListener('didfocus', (event) => {
			if (event.target._currentRoute.Component === AskForLeaveScreen) {
				this._imgFuncPanel.update();
			}
		});
	}

	componentWillUnmount() {
		this._navigatorListener && this._navigatorListener.remove();
		this._navigatorListener = null;
	}

	render() {
		const { isShowingLeaveTypeModal, curType, startDateYear, startDateMonth, startDateDate, endDateYear, endDateMonth, endDateDate, reason } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={'请假'} showMoreBtn={false} />
				<ScrollView style={styles.container}>
					<TouchableOpacity activeOpacity={0.8} onPress={this._onLeaveTypePress} style={styles.itemContainer}>
						<Text style={styles.itemKey}>
							请假类型
						</Text>
						<View style={styles.itemValContainer}>
							<Text style={styles.itemKey}>
								{ curType }
							</Text>
							<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
						</View>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity activeOpacity={0.8} onPress={this._onLeaveDateStarPress} style={styles.itemContainer}>
						<Text style={styles.itemKey}>
							开始时间
						</Text>
						<View style={styles.itemValContainer}>
							<Text style={styles.itemKey}>
								{ startDateYear }-{ utils.number2Str(startDateMonth + 1, 2) }-{ utils.number2Str(startDateDate, 2) }
							</Text>
							<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
						</View>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity activeOpacity={0.8} onPress={this._onLeaveDateEndPress} style={styles.itemContainer}>
						<Text style={styles.itemKey}>
							结束时间
						</Text>
						<View style={styles.itemValContainer}>
							<Text style={styles.itemKey}>
								{ endDateYear }-{ utils.number2Str(endDateMonth + 1, 2) }-{ utils.number2Str(endDateDate, 2) }
							</Text>
							<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
						</View>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity activeOpacity={0.8} onPress={this._onLeaveTypePress} style={[styles.itemContainer, {height: utils.toDips(200), alignItems: 'flex-start'}]}>
						<Text style={[styles.itemKey, {marginTop: utils.toDips(25)}]}>
							请假事由
						</Text>
						<TextInput 
							maxLength={200}
							autoCapitalize={"none"}
							style={styles.textInput}
							// 关闭拼写自动修正
							autoCorrect={false}
							keyboardType={"default"}
							multiline={true}
							value={reason}
							onChangeText={this._onReasonChanged}
							placeholder={"请输入请假事由（必填）"}
							placeholderTextColor={'#cbcbcb'}
							underlineColorAndroid={'transparent'}
							returnKeyType="done"
						/>
					</TouchableOpacity>
					<View style={styles.line} />
					{
						// 图片
					}
					<View style={styles.imgcontainer}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: utils.toDips(25)}}>
							<Text style={[styles.itemKey, {marginLeft: utils.toDips(20)}]}>
								图片
							</Text>
							<Image style={{width: utils.toDips(56), height: utils.toDips(49), marginRight: utils.toDips(20)}} source={require('../../imgs/camera.png')} />
						</View>
						<ImageFuncPanel ref={c => this._imgFuncPanel = c} onAddImage={this._onAddImage} />
					</View>
				</ScrollView>
				{
					// 提交
				}
				<TouchableOpacity
					style={styles.submitBtn}
					activeOpacity={0.8}
					onPress={() => {}}
				>
					<Text style={styles.submitText}>
						提交试试
					</Text>
				</TouchableOpacity>
				<LeaveTypeModal visible={isShowingLeaveTypeModal} curType={curType} onSelected={this._onLeaveTypeSelected} />
			</View>
		);
	}

	onLeaveTypePress() {
		this.setState({
			isShowingLeaveTypeModal: true
		});
	}

	async onLeaveDateStarPress() {
		await this.pickDate((year, month, day) => {
			this.setState({
				startDateYear: year,
				startDateMonth: month,
				startDateDate: day
			});
		});
	}

	async onLeaveDateEndPress() {
		await this.pickDate((year, month, day) => {
			this.setState({
				endDateYear: year,
				endDateMonth: month,
				endDateDate: day
			});
		});
	}

	async pickDate(cb) {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				date: new Date(),
				// mode有三种：
				// calendar: Show a date picker in calendar mode.
				// spinner: Show a date picker in spinner mode.
				// default: Show a default native date picker(spinner/calendar) based on android versions.
				mode: 'default'
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				// 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
				cb(year, month, day);
			}
		} catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		}
	}

	onLeaveTypeSelected(curType) {
		this.setState({
			curType,
			isShowingLeaveTypeModal: false
		});
	}

	onReasonChanged(reason) {
		this.setState({
			reason
		});
	}

	onAddImage() {
		ActionSheet.showActionSheetWithOptions({
			options: ['相册', '拍照'],
			cancelButtonIndex: 3,
			tintColor: 'blue'
		}, (buttonIndex) => {
			// console.warn('button clicked :', buttonIndex);
			if (buttonIndex === 0) {
				this.onPickPhoto();
			} else if (buttonIndex === 1) {
				this.onTakePhoto();
			}
		});
	}

	/**
	 * 拍照
	 */
	onTakePhoto() {
		global.nav.push({
			Component: CameraScreen
		});
	}

	/**
	 * 从相册里取照片
	 */
	onPickPhoto() {
		global.nav.push({
			Component: ImageListScene
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
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
		backgroundColor: 'transparent'
	},
	itemValContainer: {
		flexDirection: 'row',
		alignItems: 'center'
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
	textInput: {
		fontSize: utils.getFontSize(22),
		color: "#364153",
		height: utils.toDips(200),
		marginTop: utils.toDips(16),
		marginLeft: utils.toDips(22),
		flex: 1,
		textAlign: 'left',
		textAlignVertical: 'top'
	},
	imgcontainer: {
		backgroundColor: 'white'
	},
	submitBtn: {
		width: utils.toDips(650),
		height: utils.toDips(90),
		backgroundColor: '#3e8ed7',
		borderRadius: utils.toDips(10),
		marginTop: utils.toDips(25),
		marginBottom: utils.toDips(25),
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
	submitText: {
		color: 'white',
		fontSize: utils.getFontSize(28),
		backgroundColor: 'transparent'
	}
});
