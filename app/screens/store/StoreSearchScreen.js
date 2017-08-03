'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity
} from 'react-native';

import * as sqlite from '../../sqlite';
import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import CategorySelector from './CategorySelector';

/**
 * 门店搜索场景
 */
export default class StoreSearchScreen extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			keyWord: '',
			// 初始的选择器的left，让其在屏幕以外
			categorySelectorLeft: utils.screenWidth()
		};

		// 当前选择中的类别的索引值，没有选中，该值为-1
		this._curCategoryIndex = -1;

		this._onKeyWordChanged = this.onKeyWordChanged.bind(this);
		this._onAreaCategorySelected = this.onAreaCategorySelected.bind(this);
		this._onCategory1Selected = this.onCategory1Selected.bind(this);
		this._onCategory2Selected = this.onCategory1Selected.bind(this);
	}

	render() {
		const { keyWord, categorySelectorLeft } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={'门店列表'} showMoreBtn={false} />
				{
					// 搜索框
				}
				<View style={styles.searchContainer}>
					<View style={styles.inputContainer}>
						<View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
							<TextInput 
								maxLength={20}
								autoCapitalize={"none"}
								style={styles.textInput}
								// 关闭拼写自动修正
								autoCorrect={false}
								keyboardType={"default"}
								multiline={false}
								value={keyWord}
								onChangeText={this._onKeyWordChanged}
								placeholder={"搜索门店"}
								placeholderTextColor={'#b9b9b9'}
								underlineColorAndroid={'transparent'}
								returnKeyType="done"
							/>
							<Image
								style={{
									width: utils.toDips(36),
									height: utils.toDips(36),
									marginRight: utils.toDips(28)
								}}
								source={require('../../imgs/icon_search.png')}
							/>
						</View>
					</View>
				</View>
				{
					// 三个类别选择按钮
				}
				<View style={styles.categoryContainer}>
					{
						this.renderCategorySelector('区域', this._onAreaCategorySelected)
					}
					{
						// 分割线
					}
					<Image style={styles.categoryLine} source={require('../../imgs/shuXian.png')} />
					{
						this.renderCategorySelector('分类1', this._onCategory1Selected)
					}
					{
						// 分割线
					}
					<Image style={styles.categoryLine} source={require('../../imgs/shuXian.png')} />
					{
						this.renderCategorySelector('分类2', this._onCategory2Selected)
					}
				</View>
				{
					// 类别选择器
				}
				<CategorySelector ref={c => {this._categorySelector = c;}} left={categorySelectorLeft} />
			</View>
		);
	}

	renderCategorySelector(category, onPress) {
		return(
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress || (() => {})}
				style={styles.categorySelectorContainer}
			>
				<Text style={styles.category}>
					{ category }
				</Text>
			</TouchableOpacity>
		);
	}

	onKeyWordChanged(keyWord) {
		this.setState({
			keyWord
		});
	}

	// 区域类别选择
	onAreaCategorySelected() {
		// ['黄浦区', '宝山区', '嘉定区', '徐汇区', '浦东新区', '乱七八槽区']
		if (this._curCategoryIndex === 1) {
			this._categorySelector.fold();
			const t = setTimeout(() => {
				clearTimeout(t);
				this._curCategoryIndex = -1;
				this.setState({
					categorySelectorLeft: utils.screenWidth()
				});
			}, 500);
		} else {
			if (this._curCategoryIndex === -1) {
				this.setState({
					categorySelectorLeft: 0
				}, () => {
					this._categorySelector.unfold();
				});
			}
			this._curCategoryIndex = 1;
		}
	}

	onCategory1Selected() {
		// ['士大夫似的', '过分', '撒到我', 'few发的', '未全额付多少', '个人购房的']
	}

	onCategory2Selected() {
		// ['撒的我', '飞飞', '定区', '蜂窝', '高富帅的', '格瑞德']
	}
}

/*
<Text style={{marginTop: utils.toDips(100)}} onPress={() => {sqlite.createTable();}}>
					创建数据库
				</Text>
				<Text style={{}} onPress={() => {
					sqlite.findUpdateTime().then((result) => {
						utils.toast(result.time.toString());
					});
				}}>
					读取数据
				</Text>
				<Text style={{}} onPress={() => {sqlite.close();}}>
					关闭数据库
				</Text>
*/

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	},
	searchContainer: {
		height: utils.toDips(106),
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputContainer: {
		width: utils.toDips(670),
		height: utils.toDips(76),
		backgroundColor: 'white',
		borderColor: '#e5e5e5',
		borderWidth: utils.toDips(1),
		borderRadius: utils.toDips(10)
	},
	textInput: {
		fontSize: utils.getFontSize(24),
		color: "#364153",
		height: utils.toDips(76),
		marginLeft: utils.toDips(22),
		flex: 1
	},
	categoryContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(88),
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center'
	},
	categoryLine: {
		width: utils.toDips(1),
		height: utils.toDips(38)
	},
	categorySelectorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	category: {
		color: '#565656',
		fontSize: utils.getFontSize(22)
	}
});
