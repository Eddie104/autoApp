'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Image,
	ScrollView
} from 'react-native';

import RNFS from 'react-native-fs';
import TopBar from '../../components/TopBar';
import Spinner from '../../components/Spinner';
import * as utils from '../../utils';
import * as api from '../../api';
import * as net from '../../net';

/**
 * 扫描结果场景的父类
 */
export default class ScannerResultScreen extends PureComponent {

	static propTypes = {
		data: PropTypes.object,
		imgPath: PropTypes.string
	};

	constructor(props) {
		super(props);

		this._onOK = this.onOK.bind(this);
		this._onBack = this.onBack.bind(this);
	}

	componentDidMount() {
		const { imgPath, backImgPath } = this.props;
		// substring(7) -> to remove the file://
		RNFS.readFile(utils.isIOS() ? imgPath : imgPath.substring(7), 'base64').then(imgBase64 => {
			RNFS.readFile(utils.isIOS() ? backImgPath : backImgPath.substring(7), 'base64').then(backImgBase64 => {
				this.setState({
					imgBase64,
					backImgBase64
				});
			});
		});
	}

	render() {
		const { imgBase64, isShowingSpinner } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={ this.getTitle() } showMoreBtn={false} />
				<ScrollView style={{flex: 1}}>
					{
						this.renderKeyItemRow()
					}
					<Image style={{width: utils.toDips(750), height: utils.toDips(1280 * 750 / 720)}} source={{ uri: `data:image/jpeg;base64,${imgBase64}` }} />
					{
						this.renderBackImg()
					}
					{
						// 通过和拒绝两个按钮
					}
					<View style={styles.btnContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onOK}
							style={styles.btn}
						>
							<Text style={styles.btnText}>
								确定
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onBack}
							style={[styles.btn, {marginLeft: utils.toDips(82), backgroundColor: '#e54c65'}]}
						>
							<Text style={styles.btnText}>
								重新识别
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
				{
					isShowingSpinner && <Spinner backgroundColor={'rgba(0, 0, 0, 0.5)'} textBackgroundColor={'rgba(0, 0, 0, .7)'} text={'保存中...'} />
				}
			</View>
		);
	}

	getTitle() {
		return '扫描结果';
	}

	renderKeyItemRow() {
		return null;
	}

	renderBackImg() {
		const { backImgBase64 } = this.state;
		return (
			<Image style={{width: utils.toDips(750), height: utils.toDips(1280 * 750 / 720)}} source={{ uri: `data:image/jpeg;base64,${backImgBase64}` }} />
		);
	}

	onOK() {
		if (this.checkLegal()) {
			this.setState({
				isShowingSpinner: true
			}, () => {
				const tmp = { ...this.state };
				delete tmp.isShowingSpinner;
				net.post(this.getAPI(), tmp, result => {
					this.setState({
						isShowingSpinner: false
					}, () => {
						// console.warn(result);
						// 往前两步走
						global.nav.popN(2);
					});
				}, err => {
					console.warn(err);
				});
			});
		}
	}

	checkLegal() {
		return false;
	}

	onBack() {
		global.nav.pop();
	}

	getAPI() {
		return api.idData();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	btnContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(208),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	btn: {
		width: utils.toDips(260),
		height: utils.toDips(90),
		backgroundColor: '#3e8ed7',
		borderRadius: utils.toDips(10),
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnText: {
		color: 'white',
		fontSize: utils.getFontSize(28),
		backgroundColor: 'transparent'
	}
});
