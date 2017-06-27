'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
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
			<View style={styles.itemContainer}>
				<Text style={styles.key}>
					{ itemKey }
				</Text>
				{
					// 搞一个占空间的弹性view
				}
				<View style={styles.container} />
				<View style={styles.valContainer}>
					<Text style={styles.val}>
						{ itemVal }
					</Text>
				</View>
			</View>
		);
	}
}


/**
 * 车辆详情面板
 */
export default class CarDetail extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					<KeyValItem itemKey={'车队:'} itemVal={'上海车队'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'车型:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'颜色:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'车牌号:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'发动机号:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'使用性质:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'车辆所属（简称）:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'车辆用途:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'环保标准:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'文档编号:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'上牌日期:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'生产日期:'} itemVal={'咯咯卡'} />
					<View style={styles.line} />
					<KeyValItem itemKey={'购置/挂靠日期:'} itemVal={'咯咯卡'} />
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	itemContainer: {
		flexDirection: 'row',
		height: utils.toDips(88),
		alignItems: 'center'
	},
	key: {
		color: '#364153',
		fontSize: utils.getFontSize(23),
		marginLeft: utils.toDips(35)
	},
	valContainer: {
		width: utils.toDips(278)
	},
	val: {
		color: '#929497',
		fontSize: utils.getFontSize(23)
	},
	line: {
		width: utils.toDips(684),
		height: utils.toDips(1),
		backgroundColor: '#e9e9e9',
		alignSelf: 'center'
	}
});
