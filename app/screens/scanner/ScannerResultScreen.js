'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Image,
	ScrollView
} from 'react-native';

import RNFS from 'react-native-fs';
import TopBar from '../../components/TopBar';
import * as utils from '../../utils';
import * as api from '../../api';
import * as net from '../../net';

/**
 * 扫描结果场景的父类
 */
export default class ScannerResultScreen extends PureComponent {

	static propTypes = {
		data: PropTypes.object,
		imgPath: PropTypes.string
	};

	constructor(props) {
		super(props);

		this.state = {
			imgBase64: 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==',
			...props.data
		};

		this._onOK = this.onOK.bind(this);
		this._onBack = this.onBack.bind(this);
	}

	componentDidMount() {
		const { imgPath } = this.props;
		// substring(7) -> to remove the file://
		RNFS.readFile(utils.isIOS() ? imgPath : imgPath.substring(7), "base64").then(imgBase64 => this.setState({
			imgBase64
		}));
	}

	render() {
		const { imgBase64 } = this.state;
		const { imgPath } = this.props;
		return (
			<View style={styles.container}>
				<TopBar title={ this.getTitle() } showMoreBtn={false} />
				<ScrollView style={{flex: 1}}>
					{
						this.renderKeyItemRow()
					}
					<Text style={{}}>
						{ imgPath }
					</Text>
					<Image style={{width: utils.toDips(720), height: utils.toDips(1280)}} source={{ uri: `data:image/jpeg;base64,${imgBase64}` }} />
					{
						// 通过和拒绝两个按钮
					}
					<View style={styles.btnContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onOK}
							style={styles.btn}
						>
							<Text style={styles.btnText}>
								确定
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onBack}
							style={[styles.btn, {marginLeft: utils.toDips(82), backgroundColor: '#e54c65'}]}
						>
							<Text style={styles.btnText}>
								重新识别
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}

	getTitle() {
		return '扫描结果';
	}

	renderKeyItemRow() {
		return null;
	}

	onOK() {
		utils.toast(JSON.stringify(this.state));
		net.post(this.getAPI(), this.state, result => {
			// console.warn(result);
			// utils.toast(result.status.toString());
			utils.toast(utils.obj2Str(result));
			// console.warn(utils.obj2Str(result));
		}, err => {
			console.warn(err);
		});
	}

	onBack() {
		global.nav.pop();
	}

	getAPI() {
		return api.idData();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	btnContainer: {
		width: utils.screenWidth(),
		height: utils.toDips(208),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	btn: {
		width: utils.toDips(260),
		height: utils.toDips(90),
		backgroundColor: '#3e8ed7',
		borderRadius: utils.toDips(10),
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnText: {
		color: 'white',
		fontSize: utils.getFontSize(28),
		backgroundColor: 'transparent'
	}
});
