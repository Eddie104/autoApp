'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';

/**
 * 展示图片的面板
 */
export default class ImageFuncPanel extends PureComponent {

	static propTypes = {
		onAddImage: PropTypes.func
	};

	static defaultProps = {
		onAddImage: () => {}
	};
	
	constructor(props) {
		super(props);

		this.state = {
			imagesSelected: global.imagesSelected.slice()
		};
	}

	render() {
		const { imagesSelected } = this.state;
		const { onAddImage } = this.props;
		return (
			<View style={styles.container}>
				<View style={{flexWrap: 'wrap', flexDirection: 'row', width: utils.screenWidth(), alignItems: 'flex-start'}}>
					{
						imagesSelected && imagesSelected.map((imgData, i) => this.renderImage(imgData, i))
					}
					{
						// 添加图片的按钮
						imagesSelected.length < 9 && (
							<View style={styles.imgContaner}>
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={onAddImage}
									style={{
										width: utils.screenWidth() / 3 - 44,
										height: utils.screenWidth() / 3 - 44,
										backgroundColor: '#f2f2f2',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<Image style={{width: utils.toDips(44), height: utils.toDips(44)}} source={require('../../imgs/ui_214.png')}/>
								</TouchableOpacity>
							</View>
						)
					}
				</View>
			</View>
		);
	}

	renderImage(imgData, i) {
		const { uri } = imgData;
		console.warn(uri);
		return (
			<View key={i} style={styles.imgContaner}>
				<Image style={{width: utils.toDips(220), height: utils.toDips(220)}} source={{uri}}/>
				{
					// 右上角的x按钮
				}
				<TouchableOpacity activeOpacity={0.8} onPress={() => this.removeImg(uri)} style={{position: 'absolute', top: 0, right: 0}}>
					<Image style={{width: utils.toDips(44), height: utils.toDips(44)}} source={require('../../imgs/ui_213.png')}/>
				</TouchableOpacity>
			</View>
		);
	}

	update() {
		this.setState({
			imagesSelected: global.imagesSelected.slice()
		});
	}

	removeImg(uri) {
		let b = false;
		for (let i = 0; i < global.imagesSelected.length; i++) {
			if (global.imagesSelected[i].uri === uri) {
				global.imagesSelected.splice(i, 1);
				b = true;
				break;
			}
		}
		if (b) {
			this.setState({
				imagesSelected: global.imagesSelected.slice()
			});
		}
	}
}

const styles = StyleSheet.create({
	container: {
		width: utils.screenWidth()
	},
	imgContaner: {
		width: utils.screenWidth() / 3 - 2,
		height: utils.screenWidth() / 3 - 2,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
