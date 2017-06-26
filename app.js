'use strict';

/*
 * 用到的第三方组件：
 * react-native-scrollable-tab-view 地址： https://github.com/skv-headless/react-native-scrollable-tab-view
 * react-native-tab-navigator 地址：https://github.com/happypancake/react-native-tab-navigator
 * react-native-circular-progress 地址：https://github.com/bgryszko/react-native-circular-progress
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components';

import IndexScreen from './app/screens/index/IndexScreen';

export default class App extends Component{

	constructor(props) {
		super(props);
	}

	render() {
		// route.SceneConfig的可选值有
		// Navigator.SceneConfigs.PushFromRight (默认)
		// Navigator.SceneConfigs.FloatFromRight
		// Navigator.SceneConfigs.FloatFromLeft
		// Navigator.SceneConfigs.FloatFromBottom
		// Navigator.SceneConfigs.FloatFromBottomAndroid
		// Navigator.SceneConfigs.FadeAndroid
		// Navigator.SceneConfigs.HorizontalSwipeJump
		// Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
		// Navigator.SceneConfigs.VerticalUpSwipeJump
		// Navigator.SceneConfigs.VerticalDownSwipeJump
		return (
			<Navigator
				initialRoute={{
					// 注意，这里的Component的首字母C要大写，要大写，要大写
					Component: IndexScreen
				}}
				configureScene={(route, routeStack) => route.SceneConfig || Navigator.SceneConfigs.FloatFromRight}
				renderScene={this.renderScene.bind(this)} />
		);
	}

	/**
	 * 根据导航路由器渲染场景
	 * @param  {Object} router    路由
	 * @param  {Object} navigator 导航
	 */
	renderScene(router, navigator) {
		global.nav = navigator;
		let { Component } = router;
		return <Component { ...router } />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});