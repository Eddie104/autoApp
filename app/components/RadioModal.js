'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Modal,
	TouchableOpacity
} from 'react-native';

import * as utils from '../utils';

export default class RadioModal extends PureComponent {

	static propTypes = {
		visible: PropTypes.bool,
		typeArr: PropTypes.array,
		curType: PropTypes.string,
		onSelected: PropTypes.func
	};

	static defaultProps = {
		visible: false,
		typeArr: ['事假', '病假', '年假', '调休', '婚假', '产假', '陪产假', '路途假', '其他'],
		curType: '事假',
		onSelected: () => {}
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
		const { typeArr } = this.props;
		return (
			<Modal
				// 可选值：slide、fade、none
				animationType={'fade'}
				transparent={true}
				visible={visible}
				onRequestClose={() => {console.warn("Modal has been closed.")}}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalInnerContainer}>
						{
							typeArr.map((type, index) => {return this.renderItem(type, index);})
						}
					</View>
				</View>
			</Modal>
		);
	}

	renderItem(type, index) {
		const { typeArr, curType } = this.props;
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
					<Image style={styles.selectedImg} source={type === curType ? require('../imgs/selected_quan.png') : require('../imgs/unselected_quan.png')} />
				</View>
				{
					index < typeArr.length - 1 && <View style={styles.line} />
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
		flex: 1
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
