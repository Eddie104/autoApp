/**
 * 
 * 
 */
'use strict';

import BaseDao from './BaseDao'

export default class ModelDataDao extends BaseDao{
  
  	static getModel(user_id,code) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/model/getmodel.do';
        	var parm = 'code='+code;
        	super.netPostData(resolve,reject,url,parm);
        })
    }
 
}

