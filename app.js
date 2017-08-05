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

	// ios版的百度地图有个坑。会说RCTViewManager.h和RCTConvert+CoreLocation.h找不到
	// 按下下面的修改，就行了
	/*
	//#import "RCTViewManager.h"
	#import <React/RCTViewManager.h>
	//#import "RCTConvert+CoreLocation.h"
	#import <React/RCTConvert+CoreLocation.h>
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
import * as sqlite  from './app/sqlite';
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

		// 更新一下门店的数据
		sqlite.update().then(() => {
			// console.warn('更新数据成功!!!')
		}).catch(err => {
			// console.warn(`更新数据失败!!! => ${utils.obj2Str(err)}`);
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
		
		// navigator可用的方法
		// getCurrentRoutes() - 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
		// jumpBack() - 跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
		// jumpForward() - 上一个方法不是调到之前的路由了么，用这个跳回来就好了。
		// jumpTo(route) - 跳转到已有的场景并且不卸载。
		// push(route) - 跳转到新的场景，并且将场景入栈，你可以稍后跳转过去
		// pop() - 跳转回去并且卸载掉当前场景
		// replace(route) - 用一个新的路由替换掉当前场景
		// replaceAtIndex(route, index) - 替换掉指定序列的路由场景
		// replacePrevious(route) - 替换掉之前的场景
		// resetTo(route) - 跳转到新的场景，并且重置整个路由栈
		// immediatelyResetRouteStack(routeStack) - 用新的路由数组来重置路由栈
		// popToRoute(route) - pop到路由指定的场景，在整个路由栈中，处于指定场景之后的场景将会被卸载。
		// popToTop() - pop到栈中的第一个场景，卸载掉所有的其他场景。
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