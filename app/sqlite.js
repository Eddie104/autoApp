'use strict';

import * as utils from './utils';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DB_NAME = 'auto.db';
const DB_VERSION = '1.0';
const DB_DISPLAY_NAME = 'AutoSqlite';
const DB_SIZE = 200000;

// 门店数据表名
const STORE_TABLE = 'storeTable';

let db = null;

export function createTestData() {
	return [
		{
			name: '丰田改美瑞',
			owner: '于国富',
			address: '北京朝阳区东大桥大街8号尚都国际中心'
		},
		{
			name: '花园桥雷克萨斯4S店',
			owner: '于国富',
			address: '北京朝阳区东大桥大街8号尚都国际中心'
		},
		{
			name: '神龙京津4S店',
			owner: '于国富',
			address: '北京朝阳区东大桥大街8号尚都国际中心'
		},
		{
			name: '寰宇恒通奥迪4S店',
			owner: '于国富',
			address: '北京朝阳区东大桥大街8号尚都国际中心'
		},
		{
			name: '元丰正通4S店',
			owner: '于国富',
			address: '北京朝阳区东大桥大街8号尚都国际中心'
		},
		{
			name: '首创中伟雪佛兰4S店',
			owner: '于国富',
			address: '北京朝阳区东大桥大街8号尚都国际中心'
		}
	];
}

function open() {
	return new Promise((resolve, reject) => {
		if (db) {
			resolve();
		} else {
			SQLite.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE).then(SQLitePlugin => {
				db = SQLitePlugin;
				console.warn('数据库打开成功！');
				resolve();
			}).catch(err => {
				console.warn('数据库打开失败！,错误是：' + err);
				resolve(err);
			});
		}
	});
}

export function close() {
	if (db) {
		db.close();
		console.warn('数据库成功关闭！');
	} else {
		console.warn('数据库关闭失败!');
	}
	db = null;
}

export function createTable(successCB, errorCB) {
	open().then(() => {
		// 创建门店表
		db.transaction((tx) => {
			tx.executeSql(`CREATE TABLE IF NOT EXISTS ${STORE_TABLE}(id INTEGER PRIMARY KEY NOT NULL, name NVARCHAR(20), owner NVARCHAR(10), address NVARCHAR(50));`).then(() => {
				console.warn('创建门店表成功!');
			}).catch(err => {
				console.warn(`创建门店表失败 => ${utils.obj2Str(err)}`);
			});
			console.warn('创建门店！！！');
			tx.executeSql(`INSERT INTO ${UPDATE_TABLE} (id,time) VALUES (1,3630);`).then(() => {
				console.warn('往更新时间表里插入数据成功！')
			}).catch(err => {
				console.warn(`往更新时间表里插入数据失败 => ${utils.obj2Str(err)}！`)
			});
		}, (err) => {
			console.warn('创建表失败');
			errorCB && errorCB();
		} ,() => {
			console.warn('创建表成功');
			successCB && successCB();
		});		
	});
}

export function findUpdateTime() {
	return new Promise((resolve, reject) => {
		if (db) {
			db.executeSql(`SELECT * FROM ${UPDATE_TABLE} LIMIT 1`).then(results => {
				resolve(results[0].rows.item(0));
			}).catch(err => {
				reject(err);
			});
		}else {
			reject('db not open');
		}
	});
}


// const Magazines_TABLE_NAME = "Magazines";// 封面列表
// const Article_TABLE_NAME = "Article";// 文章详情

// export default class SQLite {

// 	constructor() {
// 		if (this.db) {
// 			this.db.close();
// 		}

// 		DB_NAME = "sqliteDemo.db";
// 		this.database_version = "1.0";
// 		this.database_displayname = "GWDSQLite";
// 		this.database_size = 1;
// 	}

// 	open() {
// 		this.db = SQLiteStorage.openDatabase(
// 			this.database_name,
// 			this.database_version,
// 			this.database_displayname,
// 			this.database_size, ()=>{
// 			console.log('数据库打开成功！');
// 		}, err => {
// 			console.log('数据库打开失败！,错误是：'+err);
// 		});
// 	}

// 	close() {
// 		if (this.db) {
// 			this.db.close();
// 			console.log('数据库成功关闭！');
// 		} else {
// 			console.log('数据库关闭失败!');
// 		}
// 		this.db = null;
// 	}

// 	// 创建表
// 	createTable() {
// 		if (!this.db) {
// 			this.open();
// 		}
// 		// 创建杂志列表
// 		this.db.transaction((tx) => {
// 			// 图书列表
// 			// id作为主键
// 			tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Magazines_TABLE_NAME}(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR, pic VARCHAR);`, [], ()=> {
// 					// this._successCB('收藏executeSql');
// 				}, (err) => {
// 					console.log(err)
// 					// this._errorCB('收藏executeSql', err);
// 				});
// 			// 文章详情表
// 			tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Article_TABLE_NAME}(id INTEGER PRIMARY KEY NOT NULL, summary VARCHAR, pic VARCHAR);`, [], ()=> {
// 					// this._successCB('收藏executeSql');
// 				}, (err) => {
// 					console.log(err)
// 					// this._errorCB('收藏executeSql', err);
// 				});

// 		}, (err) => {
// 			console.log('创建表失败');
// 		} ,() => {
// 			console.log('创建表成功');
// 		})
// 	}

// 	// 保存图书记录
// 	saveBooks(book) {
// 		return new Promise( (resolve,reject) => {
// 			if (this.db) {
// 				this.db.executeSql(`INSERT INTO ${Magazines_TABLE_NAME} (id,name,pic) VALUES(?,?,?)`,
// 					[book.getId(), book.getName(), book.getPic()], () => {
// 						resolve();
// 					}, (err) => {
// 						reject();
// 					});
// 			}else {
// 				reject('this.db not open');
// 			}
// 		} )
// 	}

// 	saveArticles(article){//保存文章详情
// 		return new Promise((resolve, reject)=>{
// 			if(this.db){
// 				this.db.executeSql(
// 					'INSERT INTO '+ Article_TABLE_NAME +' (id,summary,pic) VALUES(?,?,?)',
// 					[article.getId(),article.getSummary(),article.getPic()],

// 					()=>{
// 						resolve();
// 					},

// 					(err)=>{
// 						reject();
// 					})

// 			}else {
// 				reject('this.db not open');
// 			}
// 		});

// 	}

// 	deleteBooks(name){ // 删除某条记录

// 		return new Promise((resolve,reject) => {
// 			if(this.db){
// 				this.db.executeSql('DELETE FROM ' + Magazines_TABLE_NAME + ' WHERE name=? ',[name],
// 					()=>{
// 						resolve();
// 						console.log('成功删除本条记录');
// 					},(err)=>{
// 						reject(err);
// 					}

// 				)
// 			}else{
// 				reject()
// 			}
// 		});

// 	}

// 	deleteAllBooks(){ // 删除所有缓存记录

// 		return new Promise((resolve,reject) => {
// 			if(this.db){
// 				this.db.executeSql('DELETE FROM ' + Magazines_TABLE_NAME,[],
// 					()=>{
// 						resolve();
// 						console.log('成功删除所有记录');
// 					},(err)=>{
// 						reject(err);
// 					}

// 				)
// 			}else{
// 				reject()
// 			}
// 		});

// 	}

// 	deleteAllArticles(){ // 删除所有文章详情缓存

// 		return new Promise((resolve,reject) => {
// 			if(this.db){
// 				this.db.executeSql('DELETE FROM ' + Article_TABLE_NAME,[],
// 					()=>{
// 						resolve();
// 						console.log('成功删除所有记录');
// 					},(err)=>{
// 						reject(err);
// 					}

// 				)
// 			}else{
// 				reject()
// 			}
// 		});

// 	}

// 	findHistoryByName(name){ // 查找是否有同名的
// 		return new Promise((resolve,reject) => {
// 			if(this.db){
// 				this.db.executeSql('SELECT * FROM '+ Magazines_TABLE_NAME + ' WHERE name=? LIMIT 1 ',[name],
// 					(results)=>{
// 						console.log(results)
// 						if(results.rows.length > 0){
// 							resolve(results.rows.item(0));
// 						}else{
// 							reject(0);
// 						}
// 					},
// 					(err)=>{
// 						reject(err);
// 					}
// 				)
// 			}else{
// 				reject('this.db not open')
// 			}
// 		})
// 	}

// 	listBookCache(){ // 查找缓存列表，找到所有需要展示的数据
// 		return new Promise((resolve, reject)=>{
// 			if(this.db){
// 				this.db.executeSql('SELECT * FROM '+Magazines_TABLE_NAME +' LIMIT '+80,[],
// 					(results)=>{
// 						var len = results.rows.length;
// 						var datas = [];
// 						for(let i=0;i<len;i++){
// 							datas.push(results.rows.item(i));
// 						}
// 						resolve(datas);
// 					},(err)=>{
// 						reject(err);
// 					});
// 			}else {
// 				reject('this.db not open');
// 			}
// 		});
// 	}

// 	findArticleCache(id){ // 查找文章缓存，找到所有需要展示的数据
// 		return new Promise((resolve, reject)=>{
// 			if(this.db){
// 				this.db.executeSql('SELECT * FROM '+ Article_TABLE_NAME +' WHERE id=? LIMIT 1',[id],
// 					(results)=>{
// 						// console.log(results.rows.item(0))
// 						resolve(results.rows.item(0));
// 					},(err)=>{
// 						reject(err);
// 					});
// 			}else {
// 				reject('this.db not open');
// 			}
// 		});
// 	}


// }
