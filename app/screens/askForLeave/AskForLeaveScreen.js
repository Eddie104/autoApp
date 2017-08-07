'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import LeaveTypeModal from './LeaveTypeModal';

/**
 * 请假场景
 */
export default class AskForLeaveScreen extends PureComponent {
	
	constructor(props) {
		super(props);
		
		this.state = {
			// 是否显示请假类型的弹窗
			isShowingLeaveTypeModal: false,
			curType: '事假'
		};

		this._onLeaveTypePress = this.onLeaveTypePress.bind(this);
		this._onLeaveDateStarPress = this.onLeaveDateStarPress.bind(this);
		this._onLeaveDateEndPress = this.onLeaveDateEndPress.bind(this);

		this._onLeaveTypeSelected = this.onLeaveTypeSelected.bind(this);
	}

	render() {
		const { isShowingLeaveTypeModal, curType } = this.state;
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
								事假
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
								事假
							</Text>
							<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
						</View>
					</TouchableOpacity>
				</ScrollView>
				<LeaveTypeModal visible={isShowingLeaveTypeModal} curType={curType} onSelected={this._onLeaveTypeSelected} />
			</View>
		);
	}

	onLeaveTypePress() {
		this.setState({
			isShowingLeaveTypeModal: true
		});
	}

	onLeaveDateStarPress() {

	}

	onLeaveDateEndPress() {

	}

	onLeaveTypeSelected(curType) {
		this.setState({
			curType,
			isShowingLeaveTypeModal: false
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
	}
});
