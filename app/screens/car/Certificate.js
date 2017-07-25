'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';

import * as utils from '../../utils';
import EntityItemDataDao from '../../dao/EntityItemDataDao';
import UserDataDao from '../../dao/UserDataDao';
import ModelDataDao from '../../dao/ModelDataDao';
import KeyValItem from '../../components/KeyValItem';
import ConstantsUtils from '../../util/ConstantsUtils';


/**
 * 车辆证照面板
 */
export default class Certificate extends PureComponent {
	
	constructor(props) {
		super(props);
		this.state = {			
			modelCode:null,
			modelName:'',
			modelProperties:null,
			pageIdx:0,
			carDataArr:[],
		};
	}
	
	componentDidMount() {
		this.getUserInfor();
	}

	getUserInfor(){
	    UserDataDao.getUser().then((res)=> {
	    	if(res){
	    		this.getNetModelData(res.id);
	    	}
        }).catch((error)=> {
       	
        });
    }
	
	getNetModelData(userId){
		const {row} = this.props;
		const modelCode = row.code;
		ModelDataDao.getModel(userId,modelCode).then((res)=> {
	    	if(res){
	    		this.getNetListData(userId,modelCode,res);
	    	}
        }).catch((error)=> {       	
        });
	}
	
	getNetListData(userId,code,modelProperties){
		const {carData} = this.props;
		EntityItemDataDao.getRelationList(userId,code,carData.detailData.id,carData.modelProperties.code,this.state.pageIdx).then((res)=> {
	    	if(res){
	    		this.showListdata(res.list.data,modelProperties);
	    	}
        }).catch((error)=> {       	
        });
	}
	
	showListdata(carData,modelProperties){
		if(!carData||carData.length==0){
			utils.toast("未更新到新的数据！");
			this.setState({
				carDataArr: this.state.carDataArr,
				modelProperties:modelProperties,
				modelCode:modelProperties.code,
				modelName:modelProperties.name
			});
			return;
		}
		
		var carDataArrTemp = this.state.carDataArr.concat(carData);
		this.setState({
				carDataArr: carDataArrTemp,
				modelProperties:modelProperties,
				modelCode:modelProperties.code,
				modelName:modelProperties.name
		});
	}
	
	render() {
		const { row,carData} = this.props;
		var rows;
		if(this.state.modelProperties){			
			rows = this.state.modelProperties.detailProperties.map((row, indexKey) => {
				const property = this.state.modelProperties.detailProperties[indexKey];
				var val = this.state.carDataArr[0][property.code];
				return <KeyValItem itemKey={property.name} itemVal={val}  key={property.code} property = {property}/>
     		});
		}
		
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					{rows}					
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});
