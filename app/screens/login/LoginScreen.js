'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity 
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';

export default class LoginScreen extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			account: '',
			password: '',
			showPassword: false
		};

		this._onAccountChanged = this.onAccountChanged.bind(this);
		this._onPasswordChanged = this.onPasswordChanged.bind(this);
		this._onClearAccount = this.onClearAccount.bind(this);
		this._onSwitchShowPassword = this.onSwitchShowPassword.bind(this);
		this._onForgetPassword = this.onForgetPassword.bind(this);
		this._onLogin = this.onLogin.bind(this);
	}

	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'登录'} />
				{
					// 账号输入框
					this.renderInputContainer(true)
				}
				{
					// 密码输入框
					this.renderInputContainer(false)
				}
				{
					// 忘记密码的按钮
				}
				<View
					style={{
						marginTop: utils.toDips(54),
						alignItems: 'flex-end',
						paddingRight: utils.toDips(50)
					}}
				>
					<Text
						style={{
							color: '#9b9b9b',
							fontSize: utils.getFontSize(23)
						}}
						onPress={this._onForgetPassword}
					>
						忘记密码?
					</Text>
				</View>
				{
					// 登录按钮
				}
				<TouchableOpacity
					style={{
						width: utils.toDips(650),
						height: utils.toDips(90),
						backgroundColor: '#3e8ed7',
						borderRadius: utils.toDips(10),
						marginTop: utils.toDips(65),
						alignSelf: 'center',
						alignItems: 'center',
						justifyContent: 'center'
					}}
					activeOpacity={0.8}
					onPress={this._onLogin}
				>
					<Text
						style={{
							color: 'white',
							fontSize: utils.getFontSize(28)
						}}
					>
						立即登录
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	renderInputContainer(isAccountInput) {
		return(
			<View
				style={[styles.inputContainer, {marginTop: isAccountInput ? utils.toDips(82) : 0}]}
			>	
				{
					// 分割线
				}
				<Image
					style={styles.lineImg}
					source={require('../../imgs/line.png')}
				/>
				<View
					style={styles.inputSubContainer}
				>
					{
						// icon
					}
					<Image
						style={styles.iconImg}
						source={isAccountInput ? require('../../imgs/icon_account.png') : require('../../imgs/icon_password.png')}
					/>
					{
						// 输入框
						isAccountInput ? this.renderAccountTextInput() : this.renderPasswordTextInput()
					}
					{
						// 功能按钮
						isAccountInput ? this.renderClearAccountButton() : this.renderSwitchShowPasswordButton()
					}
				</View>
			</View>
		);
	}

	renderAccountTextInput() {
		const { account } = this.state;
		return(
			<TextInput 
				maxLength={11}
				autoCapitalize={"none"}
				style={styles.textInput}
				// 关闭拼写自动修正
				autoCorrect={false}
				keyboardType={"default"}
				multiline={false}
				value={account}
				onChangeText={this._onAccountChanged}
				placeholder={"请输入账号"}
				placeholderTextColor={'#364153'}
				underlineColorAndroid={'transparent'}
				returnKeyType="next"
			/>
		);
	}

	renderPasswordTextInput() {
		const { password, showPassword } = this.state;
		return(
			<TextInput 
				secureTextEntry={!showPassword}
				maxLength={16}
				autoCapitalize={"none"}
				style={styles.textInput}
				// 关闭拼写自动修正
				autoCorrect={false}
				keyboardType={"default"}
				multiline={false}
				value={password}
				onChangeText={this._onPasswordChanged}
				placeholder={"请输入密码"}
				placeholderTextColor={'#364153'}
				underlineColorAndroid={'transparent'}
				returnKeyType="next"
			/>
		);
	}

	renderClearAccountButton() {
		return(
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={this._onClearAccount}
			>
				<Image
					style={styles.funcImg}
					source={require('../../imgs/x.png')}
				/>
			</TouchableOpacity>
		);
	}

	renderSwitchShowPasswordButton() {
		const { showPassword } = this.state;
		return(
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={this._onSwitchShowPassword}
			>
				<Image
					style={styles.funcImg}
					source={showPassword ? require('../../imgs/eye_open.png') : require('../../imgs/eye_close.png')}
				/>
			</TouchableOpacity>
		);
	}

	onAccountChanged(account) {
		this.setState({
			account
		});
	}

	onPasswordChanged(password) {
		this.setState({
			password
		});
	}

	onClearAccount() {
		this.setState({
			account: ''
		});
	}

	onSwitchShowPassword() {
		this.setState({
			showPassword: !this.state.showPassword
		});
	}

	onForgetPassword() {
		// 忘记密码事件
	}

	onLogin() {
		const { account, password } = this.state;
		// 判断account和password的合法性，然后执行登录逻辑
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	inputContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(116),
		backgroundColor: 'white'
	},
	lineImg: {
		width: utils.toDips(750),
		height: utils.toDips(1)
	},
	inputSubContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconImg: {
		width: utils.toDips(38),
		height: utils.toDips(43),
		marginLeft: utils.toDips(28)
	},
	textInput: {
		fontSize: utils.getFontSize(28),
		color: "#364153",
		height: utils.toDips(115),
		marginLeft: utils.toDips(22),
		flex: 1
	},
	funcImg: {
		width: utils.toDips(46),
		height: utils.toDips(38),
		marginRight: utils.toDips(42)
	}
});
