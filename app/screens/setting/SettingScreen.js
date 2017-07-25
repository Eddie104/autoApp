'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import SettingItem from './SettingItem';
import LoginScreen from '../login/LoginScreen';
import UserDataDao from '../../dao/UserDataDao'

export default class SettingScreen extends PureComponent {
	
	constructor(props) {
		super(props);
		this._onLogout = this.onLogout.bind(this);
		this.state = {
	        user:null,
	        realName:'',
	        loginUserName:'',
	        
	    }
	}
	
	componentDidMount() {
	    this.getUserInfor();
	}
	
	getUserInfor(){
	    UserDataDao.getUser().then((res)=> {
	    	if(res){
	    		this.setState({
					realName:res.realName,
					loginUserName:res.loginUserName,					
				});
	    	}else{
	    	}
        }).catch((error)=> {
        });
    }
	
	render() {
		return (
			<View style={styles.container}>
				<TopBar title={'设置'} showBackBtn={false} showMoreBtn={false} />
				{
					// 顶部用户信息
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={styles.userContainer}
				>
					<Image style={styles.head} source={require('../../imgs/my_head.png')} />
					{
						// 名字和手机号
					}
					<View style={styles.nameContainer}>
						<Text style={styles.name}>
							{this.state.realName}
						</Text>
						<Text style={styles.phoneLabel}>
							{ '账户  ' }
							<Text style={styles.phone}>
								{this.state.loginUserName}
							</Text>
						</Text>
					</View>
					{
						// 箭头
					}
					<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
				</TouchableOpacity>
				{
					// 其他
				}
				
				<SettingItem
					iconSource={require('../../imgs/icon_guanYuKuiJia.png')}
					iconSourceWidth={utils.toDips(12)}
					iconSourceHeight={utils.toDips(28)}
					iconSize={utils.toDips(48)}
					iconColor={'#21c0c7'}
					itemName={'关于盔甲'}
					onPress={() => {}}
				/>
				{
					// 退出按钮
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this._onLogout}
					style={styles.exitContainer}
				>
					<Text style={styles.exit}>
						退出
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
	
	onLogout() {
		global.nav.resetTo({
			Component: LoginScreen
		});
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	userContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(146),
		// justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row'
	},
	head: {
		width: utils.toDips(102),
		height: utils.toDips(102),
		marginLeft: utils.toDips(28)
	},
	nameContainer: {
		marginLeft: utils.toDips(16),
		flex: 1
	},
	name: {
		color: '#1a1a1a',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	},
	phoneLabel: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(20),
		marginTop: utils.toDips(12),
		backgroundColor: 'transparent'
	},
	phone: {
		color: '#4e4e4e',
		backgroundColor: 'transparent'
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginRight: utils.toDips(32)
	},
	exitContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(100),
		marginTop: utils.toDips(28),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	exit: {
		color: '#de3c48',
		fontSize: utils.getFontSize(24),
		backgroundColor: 'transparent'
	}
});
