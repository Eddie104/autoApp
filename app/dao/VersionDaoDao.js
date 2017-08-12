/**
 * 
 * 
 */
'use strict';

import BaseDao from './BaseDao'

export default class VersionDao extends BaseDao{
  
  	static getLastVersion(oldVersion,channel) {  		
        return new Promise((resolve, reject)=> {
        	let url= '/app/ver/checkVersion.do?'+'oldVersion='+oldVersion+'&channel='+channel;
            super.netGetData(resolve,reject,url);
        })
    }
 
}

