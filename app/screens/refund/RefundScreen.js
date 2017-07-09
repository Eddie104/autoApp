'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import MyScrollableTabView from '../../components/MyScrollableTabView';
import RefundList from './RefundList';

/**
 * 退款审核界面
 */
export default class RefundScreen extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'退款审核'} showMoreBtn={false} />
				<MyScrollableTabView>
					<RefundList tabLabel='全部' />
					<RefundList tabLabel='待审核' />
					<RefundList tabLabel='已完成' />
				</MyScrollableTabView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
