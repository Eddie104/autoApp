'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';

import * as utils from '../../utils';
import SubTitle from '../../components/SubTitle';

/**
 * 工作看板
 */
export default class WorkData extends PureComponent {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<SubTitle color={'#63c53c'} title={'工作看板'} />
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap'
					}}
				>
					{
						this.renderItem(require('../../imgs/nianJianDaoQi.png'), '年检到期')
					}
					{
						this.renderItem(require('../../imgs/heTongDaoQi.png'), '合同到期')
					}
					{
						this.renderItem(require('../../imgs/shangYeXian.png'), '商业险')
					}
					{
						this.renderItem(require('../../imgs/cheLiangTuoBao.png'), '车辆脱保')
					}
				</View>
			</View>
		);
	}

	renderItem(imgSource, name) {
		return(
			<View style={styles.itemContainer}>
				<Image style={styles.itemImg} source={imgSource}/>
				<Text style={styles.itemName}>{ name }</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginTop: utils.toDips(18),
		paddingBottom: utils.toDips(40)
	},
	itemContainer: {
		alignItems: 'center',
		width: utils.screenWidth() / 4,
		marginTop: utils.toDips(44)
	},
	itemImg: {
		width: utils.toDips(78),
		height: utils.toDips(78)
	},
	itemName: {
		color: '#364153',
		fontSize: utils.getFontSize(19),
		marginTop: utils.toDips(20)
	}
});
