/**
 * UserDataDao
 * 
 */
'use strict';

import {
  AsyncStorage,
} from 'react-native';

import BaseDao from './BaseDao'

var STORAGE_KEY_USER_ID ='@STORAGE_KEY_USER_ID';

export default class UserDataDao  extends BaseDao{
 
  	//获取保存的用户信息
  	static async getUser(){
	    return new Promise((resolve,reject)=>{
	      AsyncStorage.getItem(STORAGE_KEY_USER_ID,(error,result)=>{
	        if (!error) {
	          try {
	            resolve(JSON.parse(result));
	          } catch (e) {
	            reject(error);
	          }
	        }else {
	          reject(error);
	        }
	      });
	    });
  	}
  	
  	
  	
  	static async saveLocalUser(user){
  		var data = JSON.stringify(user);
       await AsyncStorage.setItem(STORAGE_KEY_USER_ID,data);
  	}
  	
  	static async deleteLocalUser(){
       await AsyncStorage.removeItem(STORAGE_KEY_USER_ID);
  	}
  	
  	static login(loginUsername,password) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/user/login.do';
        	var parm = 'loginUserName='+loginUsername+'&passwrod='+password;
        	super.netPostData(resolve,reject,url,parm);            	
        })
    }
  	
  	static changePwd(oldpassword,newpassword,user_id) {
        return new Promise((resolve, reject)=> {
        	var url= '/app/user/rePassword.do';
        	var parm = 'password='+oldpassword+'&repassword='+newpassword+'&user_id='+user_id
        	super.netPostData(resolve,reject,url,parm);           
        })
    }
}

