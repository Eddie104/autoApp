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
		hasLine: PropTypes.bool
	};

	static defaultProps = {
		itemKey: '键',
		itemVal: '值',
		type: 'text',
		hasLine: true
	};
	
	constructor(props) {
		super(props);
	}

	render() {
		const { itemKey, hasLine } = this.props;
		return (
			<View>
				<View style={styles.keyValItemContainer}>
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
		const { itemVal, type } = this.props;
		if (type === 'text') {
			return (
				<Text style={styles.itemVal}>
					{ itemVal }
				</Text>
			);
		}
		if (type === 'input') {
			return (
				<TextInput
					style={[styles.itemVal, {width: utils.screenWidth() / 2, textAlign: 'right'}]}
					text={itemVal}
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
