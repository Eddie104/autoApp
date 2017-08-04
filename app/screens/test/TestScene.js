'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
// import ConstantsUtils  from '../util/ConstantsUtils';

export default class TestScene extends PureComponent {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={ '测试场景' } showMoreBtn={false} />
				<Image
					style={styles.itemImg}
					source={{
						uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501823102363&di=21ef1962900fec94c2805d8e12d5bf18&imgtype=0&src=http%3A%2F%2Flove.heima.com%2Fupload%2F161013%2F59715-16101323134R10.jpg'
					}}
				>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.captureContainer}
					>
						<Text style={styles.capture}>{ '[下载原图]'  }</Text>
					</TouchableOpacity>
				</Image>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	
	itemImg: {
		width: utils.screenWidth(),
		// topbar的高度是124
		height: utils.screenHeight() - utils.toDips(124),
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	
	/*preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},*/
	captureContainer: {
		width: utils.toDips(325),
		height: utils.toDips(90),
		backgroundColor: '#3e8ed7',
		borderRadius: utils.toDips(10),
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: utils.toDips(50)
	},
	capture: {
		color: 'white',
		fontSize: utils.getFontSize(28),
		backgroundColor: 'transparent'
	}
});
