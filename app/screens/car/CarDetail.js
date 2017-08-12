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
			<View>
			<View style={styles.itemContainer}>
				<Text style={styles.key}>
					{ itemKey }
				</Text>
				{
					// 搞一个占空间的弹性view
				}
				
				<Text style={styles.val}>
					{ itemVal }
				</Text>
			</View>
			<View style={styles.line} />
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
		const { carData } = this.props.carData;
		
		var rows = carData.modelProperties.detailProperties.map((row, indexKey) => {
			const property = carData.modelProperties.detailProperties[indexKey];
			var val = carData.detailData[property.code];
			return <KeyValItem itemKey={property.name} itemVal={val}  key={property.code}/>
     	});
		
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					{rows}					
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
		alignItems: 'center',
		paddingLeft: utils.toDips(42),
		paddingRight: utils.toDips(42),
		justifyContent: 'space-between'
	},
	key: {
		color: '#364153',
		fontSize: utils.getFontSize(22),
		backgroundColor: 'transparent'
	},
	valContainer: {
		width: utils.toDips(278)
	},
	val: {
		color: '#929497',
		fontSize: utils.getFontSize(16),
		backgroundColor: 'transparent'
	},
	line: {
		width: utils.toDips(684),
		height: utils.toDips(1),
		backgroundColor: '#e9e9e9',
		alignSelf: 'center'
	}
});
