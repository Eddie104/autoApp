'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';

// import LoginScreen from '../login/LoginScreen';
import * as utils from '../../utils';
import TabNavigator from 'react-native-tab-navigator';

import HomeScreen from '../home/HomeScreen';
import MapScreen from '../map/MapScreen';
import AppScreen from '../app/AppScreen';
import SettingScreen from '../setting/SettingScreen';

export default class IndexScreen extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			selectedTab: 'home'
		};

		this._onHome = this.onHome.bind(this);
		this._onMap = this.onMap.bind(this);
		this._onApp = this.onApp.bind(this);
		this._onSetting = this.onSetting.bind(this);
	}

	render() {
		const { selectedTab } = this.state;
		return (
			<View
				style={styles.container}
			>
				<TabNavigator
					tabBarStyle={{
						height: utils.toDips(105)
					}}
					sceneStyle={{
						paddingBottom: utils.toDips(105) 
					}}
				>
					<TabNavigator.Item
						selected={selectedTab === 'home'}
						title="首页"
						titleStyle= {styles.title}
						renderIcon={() => <Image style={styles.iconImg} source={require('../../imgs/tab/home_unselected.png')} />}
						renderSelectedIcon={() => <Image style={styles.iconImg} source={require('../../imgs/tab/home_selected.png')} />}
						onPress={this._onHome}
					>
						<HomeScreen />
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={selectedTab === 'map'}
						title="地图"
						titleStyle= {styles.title}
						renderIcon={() => <Image style={styles.iconImg} source={require('../../imgs/tab/map_unselected.png')} />}
						renderSelectedIcon={() => <Image style={styles.iconImg} source={require('../../imgs/tab/map_selected.png')} />}
						onPress={this._onMap}
					>
						<MapScreen />
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={selectedTab === 'app'}
						title="应用"
						titleStyle= {styles.title}
						renderIcon={() => <Image style={styles.iconImg} source={require('../../imgs/tab/app_unselected.png')} />}
						renderSelectedIcon={() => <Image style={styles.iconImg} source={require('../../imgs/tab/app_selected.png')} />}
						onPress={this._onApp}
					>
						<AppScreen />	
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={selectedTab === 'setting'}
						title="设置"
						titleStyle= {styles.title}
						renderIcon={() => <Image style={styles.iconImg} source={require('../../imgs/tab/setting_unselected.png')} />}
						renderSelectedIcon={() => <Image style={styles.iconImg} source={require('../../imgs/tab/setting_selected.png')} />}
						onPress={this._onSetting}
					>
						<SettingScreen />
					</TabNavigator.Item>
				</TabNavigator>
			</View>
		);
	}

	onHome() {
		this.setState({
			selectedTab: 'home'
		});
	}

	onMap() {
		this.setState({
			selectedTab: 'map'
		});
	}

	onApp() {
		this.setState({
			selectedTab: 'app'
		});
	}

	onSetting() {
		this.setState({
			selectedTab: 'setting'
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		fontSize: utils.getFontSize(20)
	},
	iconImg: {
		width: utils.toDips(45),
		height: utils.toDips(40)
	}
});
