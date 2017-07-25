/**
 * UserDataDao
 * 
 */
'use strict';

import {
  AsyncStorage,
} from 'react-native';

import BaseDao from './BaseDao'

export default class TipDataDao  extends BaseDao{
 
  	static getTip(user_id) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/tip/gettip.do';
        	var parm = 'user_id='+user_id;
        	super.netPostData(resolve,reject,url,parm);            	
        })
    }
  	
  	static readTip(id) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/tip/read.do';
        	var parm = 'id='+id;
        	super.netPostData(resolve,reject,url,parm);            	
        })
    }
  	
}

