'use strict';

import Picker from 'react-native-picker';
import * as utils from '../utils';

/**
 * 时间选择器
 */
export default function getPicker(onPickerConfirm, minDate, maxDate) {
	onPickerConfirm = typeof(onPickerConfirm) === 'function' ? onPickerConfirm : (() => {});
	minDate = minDate || new Date(1980, 0, 1);
	maxDate = maxDate || new Date(2030, 11, 31);

	const years = [], months = [], days = [], hours = [], minutes = [];
	for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++) {
		years.push(`${i}年`);
	}
	for (let i = 1; i < 13; i++) {
		months.push(`${i}月`);
	}
	for (let i = 1; i < 32; i++) {
		days.push(`${i}日`);
	}
	for (let i = 0; i < 24; i++) {
		hours.push(`${i}时`);
	}
	for (let i = 0; i < 60; i++) {
		minutes.push(`${i}分`);
	}
	const pickerData = [years, months, days, hours, minutes];
	const date = new Date();
	const selectedValue = [
		`${date.getFullYear()}年`,
		`${date.getMonth() + 1}月`,
		`${date.getDate()}日`,
		`${date.getHours()}时`,
		`${date.getMinutes()}分`
	];
	Picker.init({
		pickerData,
		selectedValue,
		pickerTitleText: '时间选择',
		pickerConfirmBtnText: '确定',
		pickerCancelBtnText: '取消',
		pickerToolBarBg: [211, 235, 233, 1],
		pickerBg: [255, 255, 255, 1],
		pickerFontSize: 20,
		wheelFlex: [2, 1, 1, 1, 1],
		onPickerConfirm,
		onPickerSelect: pickedValue => {
			const targetValue = [...pickedValue];
			for (let i = 0; i < targetValue.length; i++) {
				targetValue[i] = parseInt(utils.removeLast(targetValue[i]));
			}
			if (parseInt(targetValue[1]) === 2) {
				if (targetValue[0] % 4 === 0 && targetValue[2] > 29) {
					targetValue[2] = 29;
				} else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28) {
					targetValue[2] = 28;
				}
			} else if (targetValue[1] in {4: 1, 6: 1, 9: 1, 11: 1} && targetValue[2] > 30) {
				targetValue[2] = 30;
			}
			targetValue[0] += '年';
			targetValue[1] += '月';
			targetValue[2] += '日';
			targetValue[3] += '时';
			targetValue[4] += '分';
			// forbidden some value such as some 2.29, 4.31, 6.31...
			if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
				// android will return String all the time，but we put Number into picker at first
				// so we need to convert them to Number again
				// targetValue.map((v, k) => {
				// 	if (k !== 3) {
				// 		targetValue[k] = parseInt(v);
				// 	}
				// });

				Picker.select(targetValue);
				pickedValue = targetValue;
			}
		}
	});
	return Picker;
}