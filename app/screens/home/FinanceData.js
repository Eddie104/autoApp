'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import * as utils from '../../utils';
import CircularProgress from './CircularProgress';
import SubTitle from '../../components/SubTitle';
import HomeDataDao from '../../dao/HomeDataDao';
import UserDataDao from '../../dao/UserDataDao'

/**
 * 首页里的财务数据
 */
export default class FinanceData extends PureComponent {
	
	constructor(props) {
		super(props);
		this.state = {
	        financeList:null,
	    }
	}
	
	componentDidMount() {
	    this.getUserInfor();
	}
	
	getUserInfor(){
	    UserDataDao.getUser().then((res)=> {
	    	if(res){
	    		this.getHomeData(res.id);
	    	}else{
	    	}
        }).catch((error)=> {
        });
    }
	
	getHomeData(userId){
		HomeDataDao.getFinanceData(userId).then((res)=> {			
	    	if(res){
	    		this.setState({
					financeList:res
				});
	    	}
       	}).catch((error)=> {       	
        });
	}

	render() {
		var rows ;
		if(this.state.financeList){
			rows = this.state.financeList.list.map((row, indexKey) => {
	    		return <CircularProgress key={indexKey} color={row.color} value={row.percetage} name={row.title} nameVal={row.number} />;
	     	});
     	}
		
		return (
			<View style={styles.container}>
				<SubTitle color={'#feb02a'} title={'财务数据'} />
				{
					// 各种圆形的进度条
				}
				<View
					style={styles.circularProgressContainer}>
					{rows}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginTop: utils.toDips(18),
		paddingBottom: utils.toDips(40)
	},
	circularProgressContainer: {
		width: utils.screenWidth(),
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'flex-start',
	}
});
