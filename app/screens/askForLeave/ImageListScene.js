'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	CameraRoll,
	Image,
	Text,
	InteractionManager,
	ScrollView,
	TouchableOpacity,
	ListView,
	RefreshControl
} from 'react-native';

import * as utils from '../../utils';
import TopBar from '../../components/TopBar';
import ImageListRow from './ImageListRow';

/**
 * 展示相册里图片的场景
 */
export default class ImageListScene extends PureComponent {
	
	componentDidMount() {
		InteractionManager.runAfterInteractions(async () => {
			await this.fetchImage(true)
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			numSelected: global.imagesSelected.length,
			isRefreshing: false,
			dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
		};

		this._fetchImageParams = {
			// The number of photos wanted in reverse order of the photo application
			first: 99
		};
		// 是否获取了所有的图片了
		this._isFetchedAllImages = false;
		if (utils.isIOS()) {
			this._fetchImageParams.groupTypes = 'All';
		}

		this._listViewDataArr = [];
		this._imageListRowArr = [];
		this._updateImageCellBadge = this.updateImageCellBadge.bind(this);

		this._onLoadMore = this.loadMore.bind(this);
		this._renderRow = this.renderRow.bind(this);
		this._onRefresh = this.onRefresh.bind(this);
		this._onBack = this.onBack.bind(this);
	}

	render() {
		const { numSelected, isRefreshing, dataSource } = this.state;
		return (
			<View style={styles.container}>
				<TopBar title={'相册'} showMoreBtn={false} beforeBack={this._onBack} />
				{
					// 图片列表
				}
				<ListView
					pageSize={10}
					onEndReached={this._onLoadMore}
					onEndReachedThreshold={5}
					style={styles.container}
					removeClippedSubviews={true}
					dataSource={dataSource}
					renderRow={this._renderRow}
					refreshControl={
						<RefreshControl
							onRefresh={this._onRefresh}
							refreshing={isRefreshing}
						/>
					}
					canCancelContentTouches={true}
					scrollEnabled={true}
					automaticallyAdjustContentInsets={false}
					enableEmptySections={true}
					keyboardDismissMode={'on-drag'}
				/>
				<View style={{width: utils.toDips(750), height: utils.toDips(90), justifyContent: 'center', alignItems: 'flex-end'}}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => global.nav.pop()}
						style={{
							width: utils.toDips(168),
							height: utils.toDips(68),
							backgroundColor: '#364153',
							borderRadius: utils.toDips(6),
							alignItems: 'center',
							justifyContent: 'center',
							marginRight: utils.toDips(30)
						}}
					>
						<Text style={{color: 'white', fontSize: utils.getFontSize(26)}}>{numSelected}/9 完成</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	renderRow(rowData, sectionID, rowID) {
		return <ImageListRow imageArr={rowData} updateImageCellBadge={this._updateImageCellBadge} ref={c => this._imageListRowArr[rowID] = c} />;
	}

	onRefresh() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this._listViewDataArr),
			isRefreshing: false
		});
	}

	loadMore() {
		this.fetchImage();
	}

	async fetchImage(updateImageCellBadge, groupName) {
		if (!this._isFetchedAllImages) {
			this.setState({
				isRefreshing: true
			});
			const params = {...this._fetchImageParams, after: this._after || null, groupName};
			const imageObj = await CameraRoll.getPhotos(params);
			this._isFetchedAllImages = !imageObj.page_info.has_next_page;
			this._after = !this._isFetchedAllImages ? imageObj.page_info.end_cursor : null;

			const imageArr = [];
			for (let i = 0; i < imageObj.edges.length; i++) {
				/*
				node:Object
					group_name:"Screenshots"
					image:Object
						height:1920
						uri:"content://media/external/images/media/3842"
						width:1080
					timestamp:1486621404.787
					type:"image/png"
				 */
				imageArr[i] = imageObj.edges[i].node.image;
			}

			const imageDataArr = this._listViewDataArr.slice();
			while(imageArr.length > 3) {
				imageDataArr.push(imageArr.splice(0, 3));
			}
			if(imageArr.length > 0) {
				imageDataArr.push(imageArr);
			}
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(imageDataArr),
				isRefreshing: false
			});
			this._listViewDataArr = imageDataArr;

			if (updateImageCellBadge) {
				this.updateImageCellBadge();
			}
		}
	}

	updateImageCellBadge() {
		for (let i = 0; i < this._imageListRowArr.length; i++) {
			this._imageListRowArr[i] && this._imageListRowArr[i].updateCellBadge();
		}
		this.setState({
			numSelected: global.imagesSelected.length
		});
	}

	onBack() {
		global.imagesSelected.length = 0;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6'
	}
});
