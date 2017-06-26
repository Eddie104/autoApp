'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';

export default class SettingScreen extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'设置'} showBackBtn={false} showMoreBtn={false} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
