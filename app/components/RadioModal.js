'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Modal,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';

import * as utils from '../utils';

/**
 * 单选框
 */
export default class RadioModal extends PureComponent {

	static propTypes = {
		visible: PropTypes.bool,
		valArr: PropTypes.array,
		curVal: PropTypes.string,
		onSelected: PropTypes.func
	};

	static defaultProps = {
		visible: false,
		valArr: ['事假', '病假', '年假', '调休', '婚假', '产假', '陪产假', '路途假', '其他'],
		curVal: '事假',
		onSelected: val => {}
	};
	
	constructor(props) {
		super(props);

		this.state = {
			visible: props.visible
		};

		this._closeModal = this.closeModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible === true) {
			this.setState({
				visible: true
			});
		}
	}

	render() {
		const { visible } = this.state;
		const { valArr } = this.props;
		return (
			<Modal
				// 可选值：slide、fade、none
				animationType={'fade'}
				transparent={true}
				visible={visible}
				onRequestClose={() => {console.warn("Modal has been closed.")}}
			>
				<TouchableWithoutFeedback
					onPress={() => {
						this.closeModal()
					}}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalInnerContainer}>
							{
								valArr.map((type, index) => {return this.renderItem(type, index);})
							}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}

	renderItem(type, index) {
		const { valArr, curVal } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					this._closeModal(type);
				}}
				key={index}
			>
				<View style={styles.itemContainer}>
					<Text style={styles.itemKey}>{ type }</Text>
					<Image style={styles.selectedImg} source={type === curVal ? require('../imgs/selected_quan.png') : require('../imgs/unselected_quan.png')} />
				</View>
				{
					index < valArr.length - 1 && <View style={styles.line} />
				}
			</TouchableOpacity>
		);
	}

	closeModal(val) {
		this.setState({
			visible: false
		}, () => {
			const { onSelected } = this.props;
			onSelected && onSelected(val);
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: utils.screenWidth(),
		height: utils.screenHeight(),
		backgroundColor: 'red',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalInnerContainer: {
		width: utils.screenWidth() - utils.toDips(40 * 2),
		alignItems: 'center',
		backgroundColor: 'white'
	},
	itemContainer: {
		flexDirection: 'row',
		width: utils.screenWidth() - utils.toDips(40 * 2),
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
	selectedImg: {
		width: utils.toDips(36),
		height: utils.toDips(36)
	},
	line: {
		width: utils.screenWidth() - utils.toDips(40 * 2),
		height: utils.toDips(1.5),
		backgroundColor: '#dddfe2'
	}
});
