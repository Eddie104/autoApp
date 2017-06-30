'use strict';

/*
 * 用到的第三方组件：
 * react-native-scrollable-tab-view 地址： https://github.com/skv-headless/react-native-scrollable-tab-view
 * react-native-tab-navigator 地址：https://github.com/happypancake/react-native-tab-navigator
 * react-native-circular-progress 地址：https://github.com/bgryszko/react-native-circular-progress
 * react-native-toast 地址：https://github.com/remobile/react-native-toast
 * react-native-baidu-map  地址：https://github.com/lovebing/react-native-baidu-map
 * react-native-smart-splash-screen 地址：
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	BackHandler
} from 'react-native';

import SplashScreen from 'react-native-smart-splash-screen';
import { Navigator } from 'react-native-deprecated-custom-components';
import * as utils  from './app/utils';
import IndexScreen from './app/screens/index/IndexScreen';

export default class App extends Component{

	constructor(props) {
		super(props);
		// 上一次按下android返回键的时间
		this._lastPressBackTime = 0;
	}

	componentDidMount () {
		BackHandler.addEventListener('hardwareBackPress', () => {
			let nav = global.nav;
			const routers = nav ? nav.getCurrentRoutes() : null;
			if (routers && routers.length > 1) {
				nav.pop();
				return true;
			}
			const now = new Date().getTime();
			if (now - this._lastPressBackTime < 3000) {
				return false;
			}
			this._lastPressBackTime = now;
			utils.toast("再按一次退出");
			return true;
		});

		SplashScreen.close({
			animationType: SplashScreen.animationType.scale,
			duration: 850,
			delay: 500,
		});
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