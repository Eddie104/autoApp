'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';

export default class AboutPage extends PureComponent {
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
	}
	
	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'关于盔甲'} showBackBtn={true} showMoreBtn={false} />
				<View key="background" style={styles.userContainer}>
	                <Image style={styles.head} source={require('../../imgs/aboutme.jpg')} />
	                <View style={{
	                    top: 0,
	                    width: utils.screenWidth(),
	                    height: 200
	                }}>
	                	<Text
							style={{
							fontSize: utils.getFontSize(18),
							backgroundColor: 'transparent'
						}}
						>
						上海盔甲网络科技有限公司,版权所有
						</Text>
						
						<Text
							style={{
							fontSize: utils.getFontSize(18),
							backgroundColor: 'transparent'
						}}
						>
						版本1.0
						</Text>
						
	                </View>
	            </View>
			</View>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	userContainer: {
		width: utils.screenWidth(),
		// justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'column'
	},
	head: {
		width: utils.screenWidth(),
		height: utils.toDips(400),
	},
	nameContainer: {
		marginLeft: utils.toDips(16),
		flex: 1
	},
	name: {
		color: '#1a1a1a',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	},
	phoneLabel: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(20),
		marginTop: utils.toDips(12),
		backgroundColor: 'transparent'
	},
	phone: {
		color: '#4e4e4e',
		backgroundColor: 'transparent'
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginRight: utils.toDips(32)
	},
	exitContainer: {
		width: utils.screenWidth(),	
		alignItems: 'center',
        flexDirection: 'column',
	},
	exit: {
		color: '#de3c48',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	}
});
