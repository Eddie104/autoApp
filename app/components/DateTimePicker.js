'use strict';

import Picker from 'react-native-picker';

/**
 * 时间选择器
 */
export default function getPicker(onPickerConfirm, minDate, maxDate) {
	onPickerConfirm = typeof(onPickerConfirm) === 'function' ? onPickerConfirm : (() => {});
	minDate = minDate || new Date(1980, 0, 1);
	maxDate = maxDate || new Date(2030, 11, 31);

	const years = [], months = [], days = [], hours = [], minutes = [];
	for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++) {
		years.push(i);
	}
	for (let i = 1; i < 13; i++) {
		months.push(i);
		hours.push(i);
	}
	for (let i = 1; i < 32; i++) {
		days.push(i);
	}
	for (let i =1; i < 61; i++) {
		minutes.push(i);
	}
	const pickerData = [years, months, days, ['上午', '下午'], hours, minutes];
	const date = new Date();
	const selectedValue = [
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
		date.getHours() <= 11 ? '上午' : '下午',
		date.getHours() === 12 ? 12 : date.getHours() % 12,
		date.getMinutes()
	];
	Picker.init({
		pickerData,
		selectedValue,
		pickerTitleText: '时间选择',
		pickerConfirmBtnText: '确定',
		pickerCancelBtnText: '取消',
		pickerFontSize: 20,
		wheelFlex: [2, 1, 1, 2, 1, 1],
		onPickerConfirm,
		onPickerSelect: pickedValue => {
			const targetValue = [...pickedValue];
			if (parseInt(targetValue[1]) === 2) {
				if (targetValue[0] % 4 === 0 && targetValue[2] > 29) {
					targetValue[2] = 29;
				} else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28) {
					targetValue[2] = 28;
				}
			} else if (targetValue[1] in {4: 1, 6: 1, 9: 1, 11: 1} && targetValue[2] > 30) {
				targetValue[2] = 30;
			}
			// forbidden some value such as some 2.29, 4.31, 6.31...
			if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
				// android will return String all the time，but we put Number into picker at first
				// so we need to convert them to Number again
				targetValue.map((v, k) => {
					if (k !== 3) {
						targetValue[k] = parseInt(v);
					}
				});
				Picker.select(targetValue);
				pickedValue = targetValue;
			}
		}
	});
	return Picker;
}