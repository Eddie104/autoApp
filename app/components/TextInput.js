'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	TextInput,
	Text
} from 'react-native';

const ColorPropType = require('ColorPropType');

export default class JTextInput extends PureComponent {

	static propTypes = {
		text: PropTypes.string,
		maxLength: PropTypes.number,
		style: Text.propTypes.style,
		// enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search') 
		keyboardType: PropTypes.string,
		multiline: PropTypes.bool,
		placeholder: PropTypes.string,
		placeholderTextColor: ColorPropType,
		// enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo') 
		returnKeyType: PropTypes.string
	};

	static defaultProps = {
		text: '',
		maxLength: 200,
		keyboardType: 'default',
		multiline: false,
		placeholder: '请输入',
		placeholderTextColor: '#364153',
		returnKeyType: 'done'
	};
	
	constructor(props) {
		super(props);

		this.state = {
			text: props.text
		};
		this._onTextChanged = this.onTextChanged.bind(this);
	}

	render() {
		const { maxLength, style, keyboardType, multiline, placeholder, placeholderTextColor, returnKeyType } = this.props;
		const { text } = this.state;
		return (
			<TextInput 
				maxLength={maxLength}
				autoCapitalize={"none"}
				style={style}
				// 关闭拼写自动修正
				autoCorrect={false}
				keyboardType={keyboardType}
				multiline={multiline}
				value={text}
				onChangeText={this._onTextChanged}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				underlineColorAndroid={'transparent'}
				returnKeyType={returnKeyType}
			/>
		);
	}

	onTextChanged(text) {
		this.setState({
			text
		});
	}

	get text() {
		return this.state.text;
	}
}