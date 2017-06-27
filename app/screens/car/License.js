'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

/**
 * 车辆牌照面板
 */
export default class License extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{}}>
					牌照
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});
