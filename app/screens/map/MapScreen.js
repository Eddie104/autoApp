'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map'

export default class MapScreen extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			mayType: MapTypes.NORMAL,
			zoom: 15,
			center: {
				longitude: 113.981718,
				latitude: 22.542449
			},
			trafficEnabled: false,
			baiduHeatMapEnabled: false,
			markers: [{
				longitude: 113.981718,
				latitude: 22.542449,
				title: "Window of the world"
			}]
		};
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			this.setState({
				center: {
					latitude,
					longitude
				},
				marker: {
					latitude,
					longitude,
					title: 'Your location'
				},
			});
		}, (error) => {
			console.log(error);
		}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'地图'} showBackBtn={false} showMoreBtn={false} />
				<MapView 
					trafficEnabled={this.state.trafficEnabled}
					baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
					zoom={this.state.zoom}
					mapType={this.state.mapType}
					center={this.state.center}
					marker={this.state.marker}
					markers={this.state.markers}
					style={styles.map}
					onMarkerClick={(e) => {
						console.warn(JSON.stringify(e));
					}}
					onMapClick={(e) => {
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		height: 40
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	map: {
		width: utils.screenWidth(),
		// 124是topBar的高度,105是底部导航的高度
		height: utils.screenHeight() - utils.toDips(124 + 105),
		// marginBottom: 16
	}
});
