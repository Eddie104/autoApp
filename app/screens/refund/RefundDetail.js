'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';

class KeyValItem extends PureComponent {

	static propTypes = {
		itemKey: PropTypes.string,
		itemVal: PropTypes.string
	};

	static defaultProps = {
		itemKey: '键',
		itemVal: '值'
	};

	constructor(props){
		super(props);
	}

	render() {
		const { itemKey, itemVal } = this.props;
		return (
			<View style={styles.keyValItemContainer}>
				<Text style={styles.itemKey}>
					{ itemKey }
				</Text>
				<Text style={styles.itemVal}>
					{ itemVal }
				</Text>
			</View>
		);
	}
}


/**
 * 退款的详细信息
 */
export default class RefundDetail extends PureComponent {

	static propTypes = {
		showModal: PropTypes.func
	};

	static defaultProps = {
		showModal: () => {}
	};
	
	constructor(props) {
		super(props);
	}

	render() {
		const { showModal } = this.props;
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					<KeyValItem itemKey={'应退单号'} itemVal={'2017060101101'} />
					<View style={styles.lineContainer}>
						<View style={styles.line} />
					</View>
					<KeyValItem itemKey={'合同编号'} itemVal={'SDX-201501022'} />
					<View style={styles.lineContainer}>
						<View style={styles.line} />
					</View>
					<KeyValItem itemKey={'司机信息'} itemVal={'张杰'} />
					<View style={styles.lineContainer}>
						<View style={styles.line} />
					</View>
					<KeyValItem itemKey={'退款方式'} itemVal={'银行卡打款'} />
					<View style={styles.lineContainer}>
						<View style={styles.line} />
					</View>
					<KeyValItem itemKey={'应退金额'} itemVal={'1200.00'} />
					<View style={styles.lineContainer}>
						<View style={styles.line} />
					</View>
					<KeyValItem itemKey={'待退金额'} itemVal={'1200.00'} />
					<View style={styles.lineContainer}>
						<View style={styles.line} />
					</View>
					<KeyValItem itemKey={'已退金额'} itemVal={'0.00'} />
					<View style={styles.lineContainer}>
						<View style={styles.line} />
					</View>
					<KeyValItem itemKey={'退款日期'} itemVal={'2017-06-10'} />
				</ScrollView>
				{
					// 通过和拒绝两个按钮
				}
				<View style={styles.btnContainer}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={showModal}
						style={styles.btn}
					>
						<Text style={styles.btnText}>
							通过
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {}}
						style={[styles.btn, {marginLeft: utils.toDips(82), backgroundColor: '#e54c65'}]}
					>
						<Text style={styles.btnText}>
							拒绝
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	keyValItemContainer: {
		flexDirection: 'row',
		width: utils.screenWidth(),
		height: utils.toDips(93),
		backgroundColor: 'white',
		alignItems: 'center',
		paddingLeft: utils.toDips(42),
		paddingRight: utils.toDips(42),
		justifyContent: 'space-between'
	},
	itemKey: {
		color: '#364153',
		fontSize: utils.getFontSize(22),
		backgroundColor: 'transparent'
	},
	itemVal: {
		color: '#a0a2a4',
		fontSize: utils.getFontSize(16),
		backgroundColor: 'transparent'
	},
	lineContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(1.5),
		backgroundColor: 'white'
	},
	line: {
		width: utils.screenWidth() - utils.toDips(42),
		height: utils.toDips(1.5),
		marginLeft: utils.toDips(42),
		backgroundColor: '#dddfe2'
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
