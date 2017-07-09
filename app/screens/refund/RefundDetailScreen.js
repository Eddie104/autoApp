'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	Modal,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import MyScrollableTabView from '../../components/MyScrollableTabView';
import RefundDetail from './RefundDetail';

export default class RefundDetailScreen extends PureComponent {

	static propTypes = {
		refundData: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false
		};

		this._showModal = this.showModal.bind(this);
		this._closeModal = this.closeModal.bind(this);
		this._onModalOK = this.onModalOK.bind(this);
	}

	render() {
		const { refundData } = this.props;
		const { modalVisible } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={'退款审核'} showMoreBtn={false} />
				{
					// 顶部用户信息
				}
				<View style={styles.topUserContainer}>
					{
						// 头像
					}
					<Image style={styles.userHead} source={require('../../imgs/user_head.png')}/>
					<View style={{marginLeft: utils.toDips(28)}}>
						<View style={{flexDirection: 'row'}}>
							{
								// 名字和钱
							}
							<View style={styles.nameContainer}>
								<Text style={styles.name}>{refundData.name}</Text>
								<Text style={styles.cny}>￥{refundData.cny}</Text>
							</View>
							{
								// 手机号
							}
							<View style={styles.phoneContainer}>
								<Text style={styles.phone}>{refundData.phone}</Text>
								<Text style={styles.cnyType}>定金</Text>
							</View>
						</View>
						<Text style={styles.date}>2016-10-02 05:23</Text>
					</View>
				</View>
				<MyScrollableTabView style={{ marginTop: utils.toDips(20) }}>
					<RefundDetail tabLabel='详细信息' showModal={this._showModal} />
					<RefundDetail tabLabel='合同信息' />
					<RefundDetail tabLabel='司机信息' />
				</MyScrollableTabView>

				{
					// 通过退款的确认窗口
				}
				<Modal
					// 可选值：slide、fade、none
					animationType={'fade'}
					transparent={true}
					visible={modalVisible}
					onRequestClose={this._closeModal}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalInnerContainer}>
							{
								// title
							}
							<Text style={styles.modalTitle}>
								退款审核确认
							</Text>
							{
								// 可爱的分割线
							}
							<View style={styles.modalLine} />
							{
								// 正文
							}
							<Text style={styles.modalContent}>
								您正在审核通过刘冰师傅的退款申请，金额为<Text style={[styles.modalContent, {color: '#ed3535'}]}>￥1200</Text>，退款方式为：银行卡打款，确认通过审核吗？
							</Text>
							{
								// 可爱的分割线
							}
							<View style={styles.modalLine} />
							{
								// 确定和取消按钮
							}
							<View style={styles.modalBtnContainer}>
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={this._closeModal}
									style={styles.modalBtn}
								>
									<Text style={styles.modalBtnText}>
										取消
									</Text>
								</TouchableOpacity>
								{
									// 竖着的分割线
								}
								<View style={{width: 1, backgroundColor: '#c7c7c7'}} />
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={this._onModalOK}
									style={styles.modalBtn}
								>
									<Text style={[styles.modalBtnText, {color: '#4ac73a'}]}>
										确定
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	showModal() {
		this.setState({
			modalVisible: true
		});
	}

	closeModal() {
		this.setState({
			modalVisible: false
		});
	}

	/**
	 * 弹窗中的确定事件
	 */
	onModalOK() {
		this.closeModal();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	topUserContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(165),
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center'
	},
	userHead: {
		width: utils.toDips(90),
		height: utils.toDips(90),
		marginLeft: utils.toDips(28)
	},
	nameContainer: {
		width: utils.toDips(204),
		justifyContent: 'space-between'
	},
	name: {
		fontSize: utils.getFontSize(23),
		color: '#1a1a1a',
		backgroundColor: 'transparent'
	},
	cny: {
		fontSize: utils.getFontSize(18),
		color: '#eb2a33',
		marginTop: utils.toDips(15),
		backgroundColor: 'transparent'
	},
	phoneContainer: {
		width: utils.toDips(400),
		justifyContent: 'space-between'
	},
	phone: {
		fontSize: utils.getFontSize(23),
		color: '#4e4e4e',
		backgroundColor: 'transparent'
	},
	cnyType: {
		fontSize: utils.getFontSize(20),
		color: '#7d7d7d',
		backgroundColor: 'transparent'
	},
	date: {
		color: '#a5a5a5',
		fontSize: utils.getFontSize(18),
		marginTop: utils.toDips(14),
		backgroundColor: 'transparent'
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalInnerContainer: {
		width: utils.screenWidth() - utils.toDips(76 * 2),
		borderRadius: 10,
		alignItems: 'center',
		backgroundColor: 'white'
	},
	modalTitle: {
		color: '#080808',
		fontSize: utils.getFontSize(24),
		marginTop: utils.toDips(27),
		backgroundColor: 'transparent'
	},
	modalLine: {
		width: utils.screenWidth() - utils.toDips(76 * 2),
		height: utils.toDips(1.5),
		backgroundColor: '#d0d0d0',
		marginTop: utils.toDips(24)
	},
	modalContent: {
		color: '#747474',
		fontSize: utils.getFontSize(22),
		marginTop: utils.toDips(18),
		marginLeft: utils.toDips(34),
		marginRight: utils.toDips(34),
		lineHeight: 30,
		backgroundColor: 'transparent'
	},
	modalBtnContainer: {
		flexDirection: 'row',
		width: utils.screenWidth() - utils.toDips(76 * 2),
		height: utils.toDips(86),
		justifyContent: 'center'
	},
	modalBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	modalBtnText: {
		color: '#fa5464',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	}
});
