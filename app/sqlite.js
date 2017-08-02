'use strict';

import * as utils from './utils';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const Magazines_TABLE_NAME = "Magazines";// 封面列表
const Article_TABLE_NAME = "Article";// 文章详情

export default class SQLite {

	constructor() {
		if (this.db) {
			this.db.close();
		}

		this.database_name = "sqliteDemo.db";
		this.database_version = "1.0";
		this.database_displayname = "GWDSQLite";
		this.database_size = 1;
	}

	open() {
		this.db = SQLiteStorage.openDatabase(
			this.database_name,
			this.database_version,
			this.database_displayname,
			this.database_size, ()=>{
			console.log('数据库打开成功！');
		}, err => {
			console.log('数据库打开失败！,错误是：'+err);
		});
	}

	close() {
		if (this.db) {
			this.db.close();
			console.log('数据库成功关闭！');
		} else {
			console.log('数据库关闭失败!');
		}
		this.db = null;
	}

	// 创建表
	createTable() {
		if (!this.db) {
			this.open();
		}
		// 创建杂志列表
		this.db.transaction((tx) => {
			// 图书列表
			// id作为主键
			tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Magazines_TABLE_NAME}(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR, pic VARCHAR);`, [], ()=> {
					// this._successCB('收藏executeSql');
				}, (err) => {
					console.log(err)
					// this._errorCB('收藏executeSql', err);
				});
			// 文章详情表
			tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Article_TABLE_NAME}(id INTEGER PRIMARY KEY NOT NULL, summary VARCHAR, pic VARCHAR);`, [], ()=> {
					// this._successCB('收藏executeSql');
				}, (err) => {
					console.log(err)
					// this._errorCB('收藏executeSql', err);
				});

		}, (err) => {
			console.log('创建表失败');
		} ,() => {
			console.log('创建表成功');
		})
	}

	// 保存图书记录
	saveBooks(book) {
		return new Promise( (resolve,reject) => {
			if (this.db) {
				this.db.executeSql(`INSERT INTO ${Magazines_TABLE_NAME} (id,name,pic) VALUES(?,?,?)`,
					[book.getId(), book.getName(), book.getPic()], () => {
						resolve();
					}, (err) => {
						reject();
					});
			}else {
				reject('this.db not open');
			}
		} )
	}

	saveArticles(article){//保存文章详情
		return new Promise((resolve, reject)=>{
			if(this.db){
				this.db.executeSql(
					'INSERT INTO '+ Article_TABLE_NAME +' (id,summary,pic) VALUES(?,?,?)',
					[article.getId(),article.getSummary(),article.getPic()],

					()=>{
						resolve();
					},

					(err)=>{
						reject();
					})

			}else {
				reject('this.db not open');
			}
		});

	}

	deleteBooks(name){ // 删除某条记录

		return new Promise((resolve,reject) => {
			if(this.db){
				this.db.executeSql('DELETE FROM ' + Magazines_TABLE_NAME + ' WHERE name=? ',[name],
					()=>{
						resolve();
						console.log('成功删除本条记录');
					},(err)=>{
						reject(err);
					}

				)
			}else{
				reject()
			}
		});

	}

	deleteAllBooks(){ // 删除所有缓存记录

		return new Promise((resolve,reject) => {
			if(this.db){
				this.db.executeSql('DELETE FROM ' + Magazines_TABLE_NAME,[],
					()=>{
						resolve();
						console.log('成功删除所有记录');
					},(err)=>{
						reject(err);
					}

				)
			}else{
				reject()
			}
		});

	}

	deleteAllArticles(){ // 删除所有文章详情缓存

		return new Promise((resolve,reject) => {
			if(this.db){
				this.db.executeSql('DELETE FROM ' + Article_TABLE_NAME,[],
					()=>{
						resolve();
						console.log('成功删除所有记录');
					},(err)=>{
						reject(err);
					}

				)
			}else{
				reject()
			}
		});

	}

	findHistoryByName(name){ // 查找是否有同名的
		return new Promise((resolve,reject) => {
			if(this.db){
				this.db.executeSql('SELECT * FROM '+ Magazines_TABLE_NAME + ' WHERE name=? LIMIT 1 ',[name],
					(results)=>{
						console.log(results)
						if(results.rows.length > 0){
							resolve(results.rows.item(0));
						}else{
							reject(0);
						}
					},
					(err)=>{
						reject(err);
					}
				)
			}else{
				reject('this.db not open')
			}
		})
	}

	listBookCache(){ // 查找缓存列表，找到所有需要展示的数据
		return new Promise((resolve, reject)=>{
			if(this.db){
				this.db.executeSql('SELECT * FROM '+Magazines_TABLE_NAME +' LIMIT '+80,[],
					(results)=>{
						var len = results.rows.length;
						var datas = [];
						for(let i=0;i<len;i++){
							datas.push(results.rows.item(i));
						}
						resolve(datas);
					},(err)=>{
						reject(err);
					});
			}else {
				reject('this.db not open');
			}
		});
	}

	findArticleCache(id){ // 查找文章缓存，找到所有需要展示的数据
		return new Promise((resolve, reject)=>{
			if(this.db){
				this.db.executeSql('SELECT * FROM '+ Article_TABLE_NAME +' WHERE id=? LIMIT 1',[id],
					(results)=>{
						// console.log(results.rows.item(0))
						resolve(results.rows.item(0));
					},(err)=>{
						reject(err);
					});
			}else {
				reject('this.db not open');
			}
		});
	}


}
