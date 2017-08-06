'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

export default class DatePicker extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<PopPicker
				datePicker={datePicker}
				transitionName="rmc-picker-popup-slide-fade"
				maskTransitionName="rmc-picker-popup-fade"
				title="Date picker"
				date={date}
				onDismiss={this.onDismiss}
				onChange={this.onChange}
			>
				{
					//<button onClick={this.show}>{date && format(date) || 'open'}</button>
				}
			</PopPicker>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
