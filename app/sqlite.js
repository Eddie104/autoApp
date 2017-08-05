'use strict';

import { AsyncStorage } from 'react-native';
import * as utils from './utils';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const LAST_UPDATE_DATE = 'lastUpdateDate';

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
			id: 1,
			name: '丰田改美瑞',
			owner: '于国富1',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 2,
			name: '花园桥雷克萨斯4S店',
			owner: '于国富2',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 3,
			name: '神龙京津4S店',
			owner: '于国富3',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 4,
			name: '寰宇恒通奥迪4S店',
			owner: '于国富4',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 5,
			name: '元丰正通4S店',
			owner: '于国富5',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 6,
			name: '首创中伟雪佛兰4S店',
			owner: '于国富6',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 7,
			name: '丰田改美瑞',
			owner: '于国富7',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 8,
			name: '花园桥雷克萨斯4S店',
			owner: '于国富8',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 9,
			name: '神龙京津4S店',
			owner: '于国富9',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 10,
			name: '寰宇恒通奥迪4S店',
			owner: '于国富10',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 11,
			name: '元丰正通4S店',
			owner: '于国富11',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 12,
			name: '首创中伟雪佛兰4S店',
			owner: '于国富12',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 13,
			name: '丰田改美瑞',
			owner: '于国富13',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 14,
			name: '花园桥雷克萨斯4S店',
			owner: '于国富14',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '宝山区'
		},
		{
			id: 15,
			name: '神龙京津4S店',
			owner: '于国富15',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '浦东新区'
		},
		{
			id: 16,
			name: '寰宇恒通奥迪4S店',
			owner: '于国富16',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 17,
			name: '元丰正通4S店',
			owner: '于国富17',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		},
		{
			id: 18,
			name: '首创中伟雪佛兰4S店',
			owner: '于国富18',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '宝山区'
		},
		{
			id: 19,
			name: '丰田改美瑞',
			owner: '于国富19',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '嘉定区'
		},
		{
			id: 20,
			name: '花园桥雷克萨斯4S店',
			owner: '于国富20',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '嘉定区'
		},
		{
			id: 21,
			name: '神龙京津4S店',
			owner: '于国富21',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '浦东新区'
		},
		{
			id: 22,
			name: '寰宇恒通奥迪4S店',
			owner: '于国富22',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '徐汇区'
		},
		{
			id: 23,
			name: '元丰正通4S店',
			owner: '于国富23',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '嘉定区'
		},
		{
			id: 24,
			name: '首创中伟雪佛兰4S店',
			owner: '于国富24',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '浦东新区'
		},
		{
			id: 25,
			name: '丰田改美瑞',
			owner: '于国富25',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area : '徐汇区'
		},
		{
			id: 26,
			name: '花园桥雷克萨斯4S店',
			owner: '于国富26',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '嘉定区'
		},
		{
			id: 27,
			name: '神龙京津4S店',
			owner: '于国富27',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area : '宝山区'
		},
		{
			id: 28,
			name: '寰宇恒通奥迪4S店',
			owner: '于国富28',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area : '宝山区'
		},
		{
			id: 29,
			name: '元丰正通4S店',
			owner: '于国富29',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '宝山区'
		},
		{
			id: 30,
			name: '首创中伟雪佛兰4S店',
			owner: '于国富30',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '嘉定区'
		},
		{
			id: 31,
			name: '丰田改美瑞',
			owner: '于国富31',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '徐汇区'
		},
		{
			id: 32,
			name: '花园桥雷克萨斯4S店',
			owner: '于国富32',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area : '浦东新区'
		},
		{
			id: 33,
			name: '神龙京津4S店',
			owner: '于国富33',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '徐汇区'
		},
		{
			id: 34,
			name: '寰宇恒通奥迪4S店',
			owner: '于国富34',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '嘉定区'
		},
		{
			id: 35,
			name: '元丰正通4S店',
			owner: '于国富35',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '宝山区'
		},
		{
			id: 36,
			name: '首创中伟雪佛兰4S店',
			owner: '于国富36',
			address: '北京朝阳区东大桥大街8号尚都国际中心',
			area: '黄浦区'
		}
	];
}

export function open() {
	return new Promise((resolve, reject) => {
		if (db) {
			resolve();
		} else {
			SQLite.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE).then(SQLitePlugin => {
				db = SQLitePlugin;
				// console.warn('数据库打开成功！');
				resolve();
			}).catch(err => {
				// console.warn('数据库打开失败！,错误是：' + err);
				resolve(err);
			});
		}
	});
}

function createTable(dataArr, successCB, errorCB) {
	open().then(() => {
		db.transaction((tx) => {
			// 先删除表
			tx.executeSql(`DROP TABLE IF EXISTS ${STORE_TABLE};`);
			// 再创建门店表
			tx.executeSql(`CREATE TABLE IF NOT EXISTS ${STORE_TABLE}(id INTEGER PRIMARY KEY NOT NULL, name NVARCHAR(20), owner NVARCHAR(10), address NVARCHAR(50));`).then(() => {
				// console.warn('创建门店表成功!');
			}).catch(err => {
				// console.warn(`创建门店表失败 => ${utils.obj2Str(err)}`);
			});
			// 再插入数据
			for (let i = 0; i < dataArr.length; i++) {				
				tx.executeSql(`INSERT INTO ${STORE_TABLE} (id, name, owner, address) VALUES (${dataArr[i].id}, "${dataArr[i].name}", "${dataArr[i].owner}", "${dataArr[i].address}");`);
			}
		}, (err) => {
			// console.warn('创建表失败');
			errorCB && errorCB();
		} ,() => {
			// console.warn('创建表成功');
			// 记录这次更新数据的时间
			AsyncStorage.setItem(LAST_UPDATE_DATE, new Date().getTime().toString()).then(() => {
				successCB && successCB();
			});
		});		
	});
}

export function close() {
	if (db) {
		db.close();
		db = null;
		// console.warn('数据库成功关闭！');
	} else {
		// console.warn('数据库关闭失败!');
	}
}

/**
 * 更新数据
 */
export function update() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(LAST_UPDATE_DATE, (err, time) => {
			if (!err) {
				// 如果上一次更新数据的时间是在今天，那么就不执行更新数据的逻辑
				// 否则，就执行更新数据的逻辑
				if (time) {
				// if (false) {
					const lastUpdateDate = new Date(parseInt(time));
					const now = new Date();
					if (lastUpdateDate.getFullYear() === now.getFullYear() && 
						lastUpdateDate.getMonth() == now.getMonth() && 
						lastUpdateDate.getDate() == now.getDate()) {
						// 不需要更新
						resolve();
						return;
					}
				}
				// 更新数据的逻辑
				const dataArr = createTestData();
				createTable(dataArr, resolve, reject);
			}
		});
	});
}

export function findStore(page, count, name) {
	return new Promise((resolve, reject) => {
		if (db) {
			let sql = `SELECT * FROM ${STORE_TABLE} `;
			if (name) {
				sql += `WHERE name LIKE '%${name}%' `
			}
			sql += `LIMIT ${count} OFFSET ${(page - 1) * count};`;
			db.executeSql(sql).then(results => {
				resolve(results[0].rows);
			}).catch(err => {
				reject(err);
			});
		} else {
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
