'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
	Animated
} from 'react-native';

import * as utils from '../utils';

/**
 * 弹出的菜单
 */
export default class PopupMenu extends PureComponent {

	static propTypes = {
		items: PropTypes.array,
		funcs: PropTypes.array
	};

	static defaultProps = {
		items: ['菜单1', '菜单2'],
		funcs: [() => {}, () => {}]
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
		return(
			<TouchableOpacity
				key={index}
				activeOpacity={0.8}
				onPress={() => {
					utils.toast('index = ' + index);
					const { funcs } = this.props;
					const func = funcs[index];
					func && func();
					this.fold();
				}}
				style={styles.item}
			>
				<Text style={{}}>
					{ item }		
				</Text>	
			</TouchableOpacity>
		);
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
		backgroundColor: 'white',
		marginTop: utils.toDips(100),
		marginRight: utils.toDips(20)
	},
	item: {
		width: utils.toDips(120),
		height: utils.toDips(60),
		alignItems: 'center',
		justifyContent: 'center'
	}
});
