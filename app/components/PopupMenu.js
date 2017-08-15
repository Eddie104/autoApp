'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
	Image,
	Animated
} from 'react-native';

import * as utils from '../utils';

/**
 * 弹出的菜单
 */
export default class PopupMenu extends PureComponent {

	static propTypes = {
		items: PropTypes.array,
		funcs: PropTypes.array,
		// itemImgSource: PropTypes.array
	};

	static defaultProps = {
		items: ['菜单1', '菜单2', '菜单3', '菜单4', '菜单5'],
		funcs: [() => { console.log(111); }, () => { console.log(22); }, () => { console.log(333); }, () => { console.log(44); }, () => { console.log(555); }],
		// itemImgSource: [require('../imgs/item_qianYue.png'), require('../imgs/item_qianYue.png'), require('../imgs/item_qianYue.png'), require('../imgs/item_qianYue.png'), require('../imgs/item_qianYue.png')]
	};
	
	constructor(props) {
		super(props);

		this.state = {
			fadeAnim: new Animated.Value(0),
			left: utils.screenWidth()
		}
	}

	render() {
		const { items } = this.props;
		const { fadeAnim, left } = this.state;
		return (
			<TouchableWithoutFeedback onPress={() => {this.fold();}}>
				<View
					style={[styles.container, { left }]}
				>
					<Animated.View style={[styles.itemContainer, { opacity: fadeAnim }]}>
						{
							items.map((item, index) => {return this.renderItem(item, index);})
						}
					</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	renderItem(item, index) {
		const { items } = this.props;
		const itemView = (
			<TouchableOpacity
				key={index}
				activeOpacity={0.8}
				onPress={() => {
					const { funcs } = this.props;
					const func = funcs[index];
					func && func();
					this.fold();
				}}
				style={styles.item}
			>	
				{
					// <Image style={{width: utils.toDips(45), height: utils.toDips(46)}} source={itemImgSource[index]} />
				}
				<Text style={styles.title}>
					{ item }
				</Text>
			</TouchableOpacity>
		);
		if (index < items.length - 1) {
			// 底下加个横线
			return (
				<View key={index} style={{
					paddingBottom: utils.toDips(2), borderColor: '#23262A', borderBottomWidth: 1
				}}>
					{ itemView }
				</View>
			);
		}
		return itemView;
	}

	/**
	 * 展开
	 */
	unfold() {
		this.setState({
			left: 0
		}, () => {
			Animated.timing(this.state.fadeAnim, {
				duration: 200,
				toValue: 1,
			}).start();
		});
	}

	/**
	 * 收起来
	 */
	fold() {
		Animated.timing(this.state.fadeAnim, {
			duration: 200,
			toValue: 0,
		}).start(() => {
			this.setState({
				left: utils.screenWidth() 
			});
		});
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		width: utils.screenWidth(),
		// 105是底部导航栏的高度
		height: utils.screenHeight() - utils.toDips(105),
		backgroundColor: 'transparent',
		alignItems: 'flex-end'
	},
	itemContainer: {
		backgroundColor: '#364153',
		
		marginTop: utils.toDips(125),
		marginRight: utils.toDips(20)
	},
	item: {
		width: utils.toDips(280),
		height: utils.toDips(70),
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	title: {
		color: 'white',
	},
	line: {
		width: utils.toDips(684),
		height: utils.toDips(1),
		backgroundColor: '#e9e9e9',
		alignSelf: 'center'
	},
});
