'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	TouchableOpacity,
	InteractionManager
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import CarDetailScreen from './CarDetailScreen';
import EntityItemDataDao from '../../dao/EntityItemDataDao';
import UserDataDao from '../../dao/UserDataDao';
import ModelDataDao from '../../dao/ModelDataDao';

/**
 * 车辆资产界面
 */
export default class CarScreen extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			carDataArr: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
			isRefreshing: false,
			modelCode:null,
			modelName:'',
			modelProperties:null,
			pageIdx:0,
		};
		this._carDataArr = [];
		
		this._renderCarItem = this.renderCarItem.bind(this);
		this._onRefresh = this.onRefresh.bind(this);
		this._onListEndReached = this.onListEndReached.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { carDataArr, isRefreshing } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={this.state.modelName} showMoreBtn={false} />
				<ListView
					// ref={"scrollView"}
					pageSize={10}
					onEndReached={this._onListEndReached}
					onEndReachedThreshold={5}
					style={styles.container}
					removeClippedSubviews={true}
					dataSource={carDataArr}
					renderRow={this._renderCarItem}
					refreshControl={
						<RefreshControl
							onRefresh={this._onRefresh}
							refreshing={isRefreshing}
						/>
					}
					canCancelContentTouches={true}
					scrollEnabled={true}
					automaticallyAdjustContentInsets={false}
					enableEmptySections={true}
					keyboardDismissMode={'on-drag'}
				/>
			</View>
		);
	}

	renderCarItem(carData) {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					this.onCarPress(carData);
				}}
				style={styles.carItemContainer}
			>
				{
					// 汽车的icon
				}
				<View style={styles.iconContainer}>
					<Image style={styles.iconCarImg} source={require('../../imgs/icon_car.png')}/>
				</View>
				{
					// 名字和颜色
				}
				<View style={styles.carNameContainer}>
					<Text style={styles.carName} numberOfLines={1}>
						{carData.position1}
					</Text>
					<Text style={styles.carColor}>
						{ carData.position2 }
					</Text>
				</View>
				{
					// 弹性的空白区
				}
				<View style={{flex: 1}} />
				{
					// 牌照和id
				}
				<View style={styles.carNoContainer}>
					<Text style={styles.carNo} numberOfLines={1}>
						{ carData.position3 }
					</Text>
					<Text style={styles.carID}>
						{carData.position4}
					</Text>
				</View>
				{
					// 箭头
				}
				<Image style={styles.arrow} source={require('../../imgs/arrow.png')} />
			</TouchableOpacity>
		);
	}

	/**
	 * 向服务器索要数据
	 * 这里就先模拟一下
	 */
	fetchData(refresh) {
		this.setState({
			isRefreshing: true
		}, () => {
			const timer = setTimeout(() => {
				clearTimeout(timer);
				this.getUserInfor(refresh);
			}, 500);
		});
	}
	
	getUserInfor(refresh){
	    UserDataDao.getUser().then((res)=> {
	    	if(res){
	    		this.getNetModelData(res.id,refresh);
	    	}
        }).catch((error)=> {
       	
        });
    }
	
	getNetModelData(userId,refresh){
		const { modelCode } = this.props;
		ModelDataDao.getModel(userId,modelCode).then((res)=> {
	    	if(res){
	    		this.getNetListData(userId,refresh,modelCode,res);
	    	}
        }).catch((error)=> {
       	
        });
	}
	
	getNetListData(userId,refresh,code,modelProperties){
		EntityItemDataDao.getList(userId,code,this.state.pageIdx).then((res)=> {
	    	if(res){
	    		this.showListdata(res.list.data,refresh,modelProperties);
	    	}
        }).catch((error)=> {
       	
        });
	}
	
	showListdata(carData,refresh,modelProperties){
		if(!carData||carData.length==0){
			utils.toast("未更新到新的数据！");
			this.setState({
				isRefreshing: false,
				carDataArr: this.state.carDataArr.cloneWithRows(this._carDataArr)
			});
			return;
		}

		const currentData = [];
		for(var i = 0 ;i <carData.length;i++){
			var rowData = new Object();
			rowData.position1 = carData[i][modelProperties.listProperties[0].code];//第一位置
			rowData.position2 = carData[i][modelProperties.listProperties[1].code];//第二位置
			
			if(modelProperties.listProperties[2]){//第三位置需要根据list属性判断是否需求
				rowData.position3 = carData[i][modelProperties.listProperties[2].code];
			}
			if(modelProperties.listProperties[3]){//第四位置需要根据list属性判断是否需求
				rowData.position4 = carData[i][modelProperties.listProperties[3].code];
			}
			rowData.detailData = carData[i];
			rowData.modelProperties = modelProperties;
			currentData.push(rowData);			
		}
		
		this._carDataArr = refresh ? currentData : this._carDataArr.concat(currentData);
		this.setState({
			isRefreshing: false,
			carDataArr: this.state.carDataArr.cloneWithRows(this._carDataArr),
			modelProperties:modelProperties,
			modelCode:modelProperties.code,
			modelName:modelProperties.name,
			pageIdx:this.state.pageIdx+1,
		});
	}
	
	/**
	 * 刷新
	 */
	onRefresh() {
		this.fetchData(true);
	}

	/**
	 * 加载更多
	 */
	onListEndReached() {
		this.fetchData();
	}

	onCarPress(carData) {
		global.nav.push({
			Component: CarDetailScreen,
			carData
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e8e8e8'
	},
	carItemContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(158),
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: utils.toDips(1),
		marginBottom: utils.toDips(1)
	},
	iconContainer: {
		width: utils.toDips(94),
		height: utils.toDips(94),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#04afc0',
		borderRadius: utils.toDips(94) / 2,
		marginLeft: utils.toDips(30)
	},
	iconCarImg: {
		width: utils.toDips(66),
		height: utils.toDips(52)
	},
	carNameContainer: {
		marginLeft: utils.toDips(23)
	},
	carName: {
		color: '#1a1a1a',
		fontSize: utils.getFontSize(21),
		width: utils.toDips(400),
		backgroundColor: 'transparent'
	},
	carColor: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(16),
		marginTop: utils.toDips(18),
		backgroundColor: 'transparent'
	},
	carNoContainer: {
		width: utils.toDips(100)
	},
	carNo: {
		color: '#4e4e4e',
		fontSize: utils.getFontSize(21),
		backgroundColor: 'transparent'
	},
	carID: {
		color: '#7d7d7d',
		fontSize: utils.getFontSize(17),
		marginTop: utils.toDips(18),
		backgroundColor: 'transparent'
	},
	arrow: {
		width: utils.toDips(18),
		height: utils.toDips(32),
		marginRight: utils.toDips(30)
	}
});
