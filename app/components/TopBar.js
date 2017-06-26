'use strict';

/**
 * 顶部的导航栏
 */

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Text
} from 'react-native';

import * as utils from '../utils';

const TOP_BAR_HEIGHT = utils.isIOS() ? 124 : 84;

export default class TopBar extends PureComponent {

	static propTypes = {
		title: PropTypes.string.isRequired,
		showBackBtn: PropTypes.bool,
		showMoreBtn: PropTypes.bool
	};

	static defaultProps = {
		showBackBtn: true,
		showMoreBtn: true
	};
	
	constructor(props) {
		super(props);

		this._onBack = this.onBack.bind(this);
		this._onMore = this.onMore.bind(this);
	}

	render() {
		const { title, showMoreBtn, showBackBtn } = this.props;
		return (
			<View
				style={styles.container}>
				{
					// 中间的title
				}
				<Text
					style={styles.title}
				>
					{ title }
				</Text>
				{
					// 左边的返回按钮
					showBackBtn && (
						<TouchableOpacity
							style={styles.backContainer}
							activeOpacity={0.8}
							onPress={this._onBack}
						>
							<Image
								style={styles.backImg}
								source={require('../imgs/back.png')}
							/>
						</TouchableOpacity>
					)
				}
				{
					// 右边的菜单按钮
					showMoreBtn && (
						<TouchableOpacity
							style={styles.moreContainer}
							activeOpacity={0.8}
							onPress={this._onMore}
						>
							<Image
								resizeMode={"stretch"}
								style={styles.moreImg}
								source={require('../imgs/more.png')}
							/>
						</TouchableOpacity>
					)
				}
			</View>
		);
	}

	onBack() {
		global.nav.pop();
	}

	onMore() {
		// 更多按钮事件
	}
}

const styles = StyleSheet.create({
	container: {
		width: utils.screenWidth(),
		height: utils.toDips(TOP_BAR_HEIGHT),
		flexDirection: 'row',
		backgroundColor: '#364153',
		justifyContent: 'space-between',
	},
	backContainer: {
		width: utils.toDips(76),
		height: utils.toDips(TOP_BAR_HEIGHT)
	},
	backImg: {
		width: utils.toDips(27),
		height: utils.toDips(48),
		position: 'absolute',
		right: 0,
		bottom: utils.toDips(22)
	},
	moreContainer: {
		width: utils.toDips(76),
		height: utils.toDips(TOP_BAR_HEIGHT),
		justifyContent: 'center'
	},
	moreImg: {
		width: utils.toDips(43),
		height: utils.toDips(9)
	},
	title: {
		position: 'absolute',
		top: utils.toDips(20),
		width: utils.screenWidth(),
		textAlign: 'center',
		color: 'white',
		fontSize: utils.getFontSize(30)
	}
});
