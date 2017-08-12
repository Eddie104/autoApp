/**
 * BaseDao
 * 
 */
'use strict';
import ConstantsUtils from '../util/ConstantsUtils'

export default class BaseDao {
  
  	static netGetData(resolve,reject,urlPart) {
  		var url =  ConstantsUtils.baseUrl + urlPart;
  		var parm = {  
			    method: 'GET',
			    headers: {
			        'Accept': 'application/json',
			        "Content-Type": "application/x-www-form-urlencoded"
			    }
			};
  		
        fetch(url,parm)
            .then((response)=>response.json())
            .catch((error)=> {
                reject(error);
            }).then((responseData)=> {
                if (!responseData) {
                    reject(new Error('responseData is null'));
                    return;
                }
                resolve(responseData);
        }).done();
    }
  	
  	static netPostData(resolve,reject,urlPart,par){
  		var url =  ConstantsUtils.baseUrl + urlPart;
    	var parm = {  
		    method: 'POST',
		    headers: {
		        'Accept': 'application/json',
		        "Content-Type": "application/x-www-form-urlencoded"
		    },
		    body: par,
		};
    	
        fetch(url,parm)
            .then((response)=>response.json())
            .catch((error)=> {
                reject(error);
            }).then((responseData)=> {
                if (!responseData) {
                    reject(new Error('responseData is null'));
                    return;
                }
                resolve(responseData);
        }).done();
  	}
 	
 	static netPostFormData(resolve,reject,urlPart,filPath) {
 		var url =  ConstantsUtils.baseUrl + urlPart;
		let formData = new FormData();  
		let file = {uri: filPath, type: 'multipart/form-data', name: 'a.jpg'};  
		formData.append("file",file);
		
		var parm = {  
		    method:'POST',  
			headers:{  
    			'Content-Type':'multipart/form-data',  
	    		},  
	    		body:formData,
			};
  
	  		fetch(url,parm)
                .then((response)=>response.json())
                .catch((error)=> {
                    reject(error);
                }).then((responseData)=> {
                    if (!responseData) {
                        reject(new Error('responseData is null'));
                    return;
                }
                resolve(responseData);
        }).done();
    }
}

