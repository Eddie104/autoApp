/**
 * 
 * 
 */
'use strict';

import BaseDao from './BaseDao'

export default class EntityItemDataDao extends BaseDao{
  
  	static getList(userId,code,pageIdx) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/entity/getlist.do';
        	var parm = 'code='+code+'&pageIdx='+pageIdx+'&userId='+userId;
        	super.netPostData(resolve,reject,url,parm);
        })
    }
  	
  	static getRelationList(userId,code,parentId,parentCode,pageIdx) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/entity/getrelationlist.do';
        	var parm = 'code='+code+'&pageIdx='+pageIdx+'&userId='+userId+'&parentCode='+parentCode+'&parentId='+parentId;
        	super.netPostData(resolve,reject,url,parm);
        })
    }
 
}

