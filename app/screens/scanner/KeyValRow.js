'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import * as utils from '../../utils';
import TextInput from '../../components/TextInput';

export default class KeyValRow extends PureComponent {

	static propTypes = {
		itemKey: PropTypes.string,
		itemVal: PropTypes.string,
		// enum('text', 'input')
		type: PropTypes.string,
		hasLine: PropTypes.bool,
     	numberOfLines: PropTypes.number,
     	onTextChanged: PropTypes.func
	};

	static defaultProps = {
		itemKey: '键',
		itemVal: '值',
		type: 'text',
		hasLine: true,
		numberOfLines: 1,
		onTextChanged: null
	};
	
	constructor(props) {
		super(props);

		this.state = {
			itemVal: props.itemVal
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.itemVal !== this.state.itemVal;
	}

	render() {
		const { itemKey, hasLine, numberOfLines } = this.props;
		return (
			<View>
				{
					// 一行的时候，高度是93，没多一行，高度增加20，因为字体大小是20px
				}
				<View style={[styles.keyValItemContainer, {height: utils.toDips(93 + 20 * (numberOfLines - 1))}]}>
					<Text style={styles.itemKey}>
						{ itemKey }
					</Text>
					{
						this.renderKey()
					}
				</View>
				{
					hasLine && (
						<View style={styles.lineContainer}>
							<View style={styles.line} />
						</View>
					)
				}
			</View>
		);
	}

	renderKey() {
		const { type, numberOfLines, onTextChanged } = this.props;
		const { itemVal } = this.state;
		if (type === 'text') {
			return (
				<Text style={styles.itemVal} numberOfLines={numberOfLines}>
					{ itemVal }
				</Text>
			);
		}
		if (type === 'input') {
			// 输入框的高度，当只有一行时，就不用设置高度，当大于一行时，高度设为36乘以行数
			return (
				<TextInput
					style={[styles.itemVal, {width: utils.screenWidth() / 2, textAlign: 'right'}, numberOfLines > 1 ? {height: utils.toDips(36 * numberOfLines)} : null]}
					multiline={numberOfLines > 1}
					numberOfLines={numberOfLines}
					text={itemVal}
					onTextChanged={onTextChanged}
				/>
			);
		}
	}
}

const styles = StyleSheet.create({
	keyValItemContainer: {
		flexDirection: 'row',
		width: utils.screenWidth(),
		height: utils.toDips(93),
		backgroundColor: 'white',
		alignItems: 'center',
		paddingLeft: utils.toDips(42),
		paddingRight: utils.toDips(42),
		justifyContent: 'space-between'
	},
	itemKey: {
		color: '#364153',
		fontSize: utils.getFontSize(22),
		backgroundColor: 'transparent'
	},
	itemVal: {
		color: '#a0a2a4',
		fontSize: utils.getFontSize(16),
		backgroundColor: 'transparent'		
	},
	lineContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(1.5),
		backgroundColor: 'white'
	},
	line: {
		width: utils.screenWidth() - utils.toDips(42),
		height: utils.toDips(1.5),
		marginLeft: utils.toDips(42),
		backgroundColor: '#dddfe2'
	}
});
