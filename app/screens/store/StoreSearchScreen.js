'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import * as sqlite from '../../sqlite';
import * as utils from '../../utils';
import TopBar from '../../components/TopBar';

/**
 * 门店搜索场景
 */
export default class StoreSearchScreen extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'门店列表'} showMoreBtn={false} />
				<Text style={{marginTop: utils.toDips(100)}} onPress={() => {sqlite.createTable();}}>
					创建数据库
				</Text>
				<Text style={{}} onPress={() => {
					sqlite.findUpdateTime().then((result) => {
						utils.toast(result.time.toString());
					});
				}}>
					读取数据
				</Text>
				<Text style={{}} onPress={() => {sqlite.close();}}>
					关闭数据库
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
