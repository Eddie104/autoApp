package org.hongjie.file;

import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import org.apache.commons.httpclient.ConnectTimeoutException;
import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.ByteArrayRequestEntity;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.hongjie.utils.FileUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.UUID;

public class FileModule extends ReactContextBaseJavaModule {

	public FileModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void uri2Path(final String uri, final Callback cb) {
    	String path = FileUtil.getRealFilePath(this.getCurrentActivity(), Uri.parse(uri));
    	WritableMap response = Arguments.createMap();
        response.putString("path", path);
        cb.invoke(response);
    }

    @Override
    public String getName() {
        return "FileModule";
    }
}