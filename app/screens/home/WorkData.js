'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';

import * as utils from '../../utils';
import SubTitle from '../../components/SubTitle';
import HomeDataDao from '../../dao/HomeDataDao';
import ConstantsUtils from '../../util/ConstantsUtils';
import UserDataDao from '../../dao/UserDataDao'

/**
 * 工作看板
 */
export default class WorkData extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
	        taskList:null,
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
		HomeDataDao.getTaskData(userId).then((res)=> {			
	    	if(res){
	    		this.setState({
					taskList:res
				});
	    	}
       	}).catch((error)=> {       	
        });
	}
	
	render() {
		var rows ;
		if(this.state.taskList){
			rows = this.state.taskList.list.map((row, indexKey) => {
	    		return this.renderItem(indexKey,row.icon, row.title, row.number);
	     	});
     	}
		
		return (
			<View style={styles.container}>
				<SubTitle color={'#63c53c'} title={'工作看板'} />
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						alignItems:'flex-start'
					}}
				>
					{rows}
				</View>
			</View>
		);
	}

	renderItem(indexKey,imgSource, name, badge) {
		badge = isNaN(badge) ? 0 : parseInt(badge);
		return(
			<View style={styles.itemContainer} key={indexKey}>
				<Image style={styles.itemImg} source={{uri: ConstantsUtils.baseImgaeUrl + imgSource}}/>
				<Text style={styles.itemName}>{ name }</Text>
				{
					badge > 0 && (
						<View
							style={{
								position: 'absolute',
								left: utils.toDips(128),
								top: utils.toDips(-1),
								backgroundColor: '#f52c44',
								borderRadius: utils.toDips(12),
								alignItems: 'center',
								height:utils.toDips(24),
								justifyContent: 'center',
								paddingLeft: utils.toDips(10),
								paddingRight: utils.toDips(10)
							}}
						>
							<Text style={{color: 'white', fontSize: utils.getFontSize(10)}}>
								{ badge }
							</Text>
						</View>
					)
				}
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
	itemContainer: {
		alignItems: 'center',
		width: utils.screenWidth() / 4,
		marginTop: utils.toDips(44),
	},
	itemImg: {
		width: utils.toDips(78),
		height: utils.toDips(78)
	},
	itemName: {
		color: '#364153',
		fontSize: utils.getFontSize(19),
		marginTop: utils.toDips(20),
		backgroundColor: 'transparent'
	}
});
