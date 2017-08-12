/**
 * UserDataDao
 * 
 */
'use strict';

import {
  AsyncStorage,
} from 'react-native';

import BaseDao from './BaseDao'

export default class HomeDataDao  extends BaseDao{
 
  	static getMainData(user_id) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/home/maindata.do';
        	var parm = 'user_id='+user_id;
        	super.netPostData(resolve,reject,url,parm);            	
        })
    }
  	
  	static getFinanceData(user_id) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/home/financedata.do';
        	var parm = 'user_id='+user_id;
        	super.netPostData(resolve,reject,url,parm);            	
        })
    }
  	
  	static getTaskData(user_id) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/home/taskdata.do';
        	var parm = 'user_id='+user_id;
        	super.netPostData(resolve,reject,url,parm);            	
        })
    }
  	
}

