'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';
import * as utils from '../utils';
import ConstantsUtils  from '../util/ConstantsUtils';

/**
 * 背景是圆形纯色的，带了一张图片的icon
 */
export default class KeyValItem extends PureComponent {

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
		const { itemKey, itemVal,property } = this.props;		
		var proCom = this.renderPropertyVal(property.type,itemVal);
				
		return (
			<View>
			<View style={styles.itemContainer}>
				<Text style={styles.key}>
					{ itemKey }
				</Text>				
				{proCom}
			</View>
			<View style={styles.line} />
			</View>
		);
	}
	
	renderPropertyVal(type, value) {
		if(type==ConstantsUtils.PROPERTY_TYPE_PHOTO&&value){
			var sidx = value.lastIndexOf("/");
			var path = value.slice(0, sidx) + '/s_' + value.slice(sidx+1 + Math.abs(0));
			//var path = str.substring(0, str.lastIndexOf("/"))+'s_'+str.substring(str.lastIndexOf("/"), str.length-1);
			//utils.toast(path);
			return <Image style={styles.itemImg} source={{uri: ConstantsUtils.bizImgaeUrl + path}}/>;
		}
		
		return <Text style={styles.val}> { value } </Text>;
	}
}

const styles = StyleSheet.create({
	
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
	},
	
	itemImg: {
		width: utils.toDips(78),
		height: utils.toDips(78)
	},
});