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
import CameraScreen from '../../components/CameraScreen';
import RadioModal from '../../components/RadioModal';
import ImageFuncPanel from './ImageFuncPanel';
import ImageListScene from './ImageListScene';
import ActionSheet from '@yfuks/react-native-action-sheet';
import DateTimePicker from '../../components/DateTimePicker';

// 请假的事由
const LEAVE_TYPE_ARR = ['事假', '病假', '年假', '调休', '婚假', '产假', '陪产假', '路途假', '其他'];

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
			curType: LEAVE_TYPE_ARR[0],
			startDateYear: now.getFullYear(),
			startDateMonth: now.getMonth() + 1,
			startDateDate: now.getDate(),
			startDateHour: now.getHours(),
			startDateMinutes: now.getMinutes(),
			endDateYear: now.getFullYear(),
			endDateMonth: now.getMonth() + 1,
			endDateDate: now.getDate(),
			endDateHour: now.getHours(),
			endDateMinutes: now.getMinutes(),
			// 请假的事由
			reason: ''
		};

		this._onLeaveTypePress = this.onLeaveTypePress.bind(this);
		this._onLeaveDateStartPress = this.onLeaveDateStartPress.bind(this);
		this._onLeaveDateEndPress = this.onLeaveDateEndPress.bind(this);

		this._onLeaveTypeSelected = this.onLeaveTypeSelected.bind(this);
		this._onReasonChanged = this.onReasonChanged.bind(this);

		this._onAddImage = this.onAddImage.bind(this);
		this._timePicker = DateTimePicker(this.onTimePicked.bind(this), new Date());

		// 为了修复android上多行textInput的bug
		this._latestSubmitEditing = 0;
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
		this._timePicker.hide();
	}

	render() {
		const { 
			isShowingLeaveTypeModal,
			curType,
			startDateYear,
			startDateMonth,
			startDateDate,
			startDateHour,
			startDateMinutes,
			endDateYear,
			endDateMonth,
			endDateDate,
			endDateHour,
			endDateMinutes,
			reason
		} = this.state;
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
					<TouchableOpacity activeOpacity={0.8} onPress={this._onLeaveDateStartPress} style={styles.itemContainer}>
						<Text style={styles.itemKey}>
							开始时间
						</Text>
						<View style={styles.itemValContainer}>
							<Text style={styles.itemKey}>
								{ startDateYear }-{ utils.number2Str(startDateMonth, 2) }-{ utils.number2Str(startDateDate, 2) } { utils.number2Str(startDateHour, 2) }:{ utils.number2Str(startDateMinutes, 2) }
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
								{ endDateYear }-{ utils.number2Str(endDateMonth, 2) }-{ utils.number2Str(endDateDate, 2) } { utils.number2Str(endDateHour, 2) }:{ utils.number2Str(endDateMinutes, 2) }
							</Text>
							<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
						</View>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._onLeaveTypePress}
						style={
							[
								styles.itemContainer,
								{
									height: utils.toDips(300),
									alignItems: 'flex-start',
									flexDirection: 'column'
								}
							]
						}
					>
						<Text style={[styles.itemKey, {marginTop: utils.toDips(25)}]}>
							请假事由
						</Text>
						<TextInput
							maxLength={300}
							autoCapitalize={"none"}
							style={styles.textInput}
							// 关闭拼写自动修正
							autoCorrect={false}
							keyboardType={"default"}
							multiline={true}
							numberOfLines={10}
							value={reason}
							onChangeText={this._onReasonChanged}
							placeholder={"请输入请假事由（必填）"}
							placeholderTextColor={'#cbcbcb'}
							underlineColorAndroid={'transparent'}
							returnKeyType="default"
							blurOnSubmit={false}
							onSubmitEditing={e => {
								// 为了修复android上多行textInput中换行键不能换行的bug
								if (!utils.isIOS()) {
									const latestSubmitEditing = this._latestSubmitEditing;
									this._latestSubmitEditing = e.timeStamp;
									if (latestSubmitEditing && e.timeStamp - latestSubmitEditing < 300) return;
									const text = this.state.reason;
									if (!text.endsWith("\n")) {
										this.setState({ reason: text + '\n' });
									}
								}
							}}
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
							<Image
								style={{
									width: utils.toDips(56),
									height: utils.toDips(49),
									marginRight: utils.toDips(20)
								}}
								source={require('../../imgs/camera.png')}
							/>
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
				<RadioModal
					visible={isShowingLeaveTypeModal}
					valArr={LEAVE_TYPE_ARR}
					curVal={curType}
					onSelected={this._onLeaveTypeSelected}
				/>
			</View>
		);
	}

	onLeaveTypePress() {
		this.setState({
			isShowingLeaveTypeModal: true
		});
	}

	onLeaveDateStartPress() {
		this._isStartTime = true;
		this._timePicker.show();
	}

	onLeaveDateEndPress() {
		this._isStartTime = false;
		this._timePicker.show();
	}

	onTimePicked(pickedValue) {
		if (this._isStartTime) {
			this.setState({
				startDateYear: utils.removeLast(pickedValue[0]),
				startDateMonth: utils.removeLast(pickedValue[1]),
				startDateDate: utils.removeLast(pickedValue[2]),
				startDateHour: utils.removeLast(pickedValue[3]),
				startDateMinutes: utils.removeLast(pickedValue[4])
			});
		} else {
			this.setState({
				endDateYear: utils.removeLast(pickedValue[0]),
				endDateMonth: utils.removeLast(pickedValue[1]),
				endDateDate: utils.removeLast(pickedValue[2]),
				endDateHour: utils.removeLast(pickedValue[3]),
				endDateMinutes: utils.removeLast(pickedValue[4])
			});
		}
	}

	onLeaveTypeSelected(curType) {
		if (curType) {
			this.setState({
				curType,
				isShowingLeaveTypeModal: false
			});
		} else {
			this.setState({
				isShowingLeaveTypeModal: false
			});
		}
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
			Component: CameraScreen,
			onTakePicture: data => {
				global.imagesSelected.push({
					width: utils.toDips(720),
					height: utils.toDips(1280),
					uri: data.path
				});
			}
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
		width: utils.screenWidth() - utils.toDips(22),
		height: utils.toDips(200),
		marginTop: utils.toDips(25),
		flex: 1,
		textAlign: 'left',
		textAlignVertical: 'top',
		includeFontPadding: false
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
