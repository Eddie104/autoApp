'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	ScrollView
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import Property from './Property';
import Customer from './Customer';
import Contract from './Contract';
import Finance from './Finance';

export default class AppScreen extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'应用'} showBackBtn={false} showMoreBtn={false} />
				<ScrollView style={styles.container}>
					{
						// 资产管理
					}
					<Property />
					{
						// 司机/客户
					}
					<Customer />
					{
						// 合同管理
					}
					<Contract />
					{
						// 财务管理
					}
					<Finance />
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	}
});
