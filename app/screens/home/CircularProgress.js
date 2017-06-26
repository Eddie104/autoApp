'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import ColorPropType from 'ColorPropType';
import * as utils from '../../utils';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

/**
 * 圆形进度条的直径
 */
const SIZE = 106;

const WIDTH = 3;

/**
 * 圆形进度条
 */
export default class CircularProgress extends PureComponent {

	static propTypes = {
		value: PropTypes.number,
		color: ColorPropType,
		name: PropTypes.string,
		nameVal: PropTypes.string
	};

	static defaultProps = {
		value: 30,
		color: 'red',
		name: '进度条名称',
		nameVal: '进度条数值'
	};
	
	constructor(props) {
		super(props);
	}

	render() {
		const { value, color, name, nameVal } = this.props;
		return (
			<View style={styles.container}>
				<AnimatedCircularProgress
					size={ utils.toDips(SIZE) }
					width={ utils.toDips(WIDTH) }
					fill={ value }
					tintColor={ color }
					backgroundColor={ "#c0cbd4" }
				>
				{
					(fill) => (
						<View
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: 0,
								right: 0,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{
								backgroundColor: 'transparent',
								textAlign: 'center',
								color: '#364153',
								fontSize: utils.getFontSize(19)
							}}>
								{ value }%
							</Text>
						</View>
					)
				}
				</AnimatedCircularProgress>
				{
					// 名称和数值
				}
				<View
					style={{
						flexDirection: 'row',
						marginTop: utils.toDips(30)
					}}
				>
					<Text
						style={{
							fontSize: utils.getFontSize(21),
							color: '#1d1d1d'
						}}
					>
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: utils.toDips(SIZE)
	}
});
