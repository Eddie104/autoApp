'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	ViewPropTypes
} from 'react-native';

import * as utils from '../utils';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class MyScrollableTabView extends PureComponent {

	static propTypes = {
		style: ViewPropTypes.style
	};

	static defaultProps = {
		style: {}
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { style } = this.props;
		return (
			<ScrollableTabView
				tabBarUnderlineStyle={{backgroundColor: '#3e8ed7'}}
				tabBarBackgroundColor={'white'}
				tabBarActiveTextColor={'#3e8ed7'}
				style={style}
			>
				{ this.props.children }
			</ScrollableTabView>
		);
	}
}