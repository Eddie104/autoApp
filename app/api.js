'use strict';

import { SERVER_HOST, SERVER_PORT } from './config';

/**
 * url前缀
 */
function createPrefixUrl() {
	return `${SERVER_HOST}:${SERVER_PORT}/ikuijiaapp/app/scandata/`;
}

/**
 * 身份证
 */
export function idData() {
	return `${createPrefixUrl()}iddata.do`;
}

/**
 * 驾驶证
 */
export function driverData() {
	return `${createPrefixUrl()}driverdata.do`;
}

/**
 * 行驶证
 */
export function carData() {
	return `${createPrefixUrl()}cardata.do`;
}