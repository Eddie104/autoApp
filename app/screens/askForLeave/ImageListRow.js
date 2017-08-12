'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
import ImageListRowCell from './ImageListRowCell';

export default class ImageListRow extends PureComponent {
	
	static propTypes = {
		imageArr: PropTypes.array.isRequired,
		updateImageCellBadge: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { imageArr, updateImageCellBadge } = this.props;
		const l = imageArr.length;
		if (l > 0) {
			return (
				<View style={styles.container}>
					<ImageListRowCell ref={c => this._leftCell = c} image={imageArr[0]} updateImageCellBadge={updateImageCellBadge} />
					{
						l > 1 && <ImageListRowCell ref={c => this._centerCell = c} image={imageArr[1]} style={{marginLeft: utils.toDips(8)}} updateImageCellBadge={updateImageCellBadge} />
					}
					{
						l > 2 && <ImageListRowCell ref={c => this._rightCell = c} image={imageArr[2]} style={{marginLeft: utils.toDips(8)}} updateImageCellBadge={updateImageCellBadge} />
					}
				</View>
			);
		}
	}

	updateCellBadge() {
		this._leftCell.updateBadge();
		this._centerCell && this._centerCell.updateBadge();
		this._rightCell && this._rightCell.updateBadge();
	}
}

const styles = StyleSheet.create({
	container: {
		width: utils.screenWidth(),
		marginTop: utils.toDips(8),
		paddingLeft: utils.toDips(8),
		paddingRight: utils.toDips(8),
		flexDirection: 'row'
	}
});
