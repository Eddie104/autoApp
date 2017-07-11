package org.hongjie.yunMai;

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

/**
 * Created by hongjie on 2017/7/10.
 */

public class OcrModule extends ReactContextBaseJavaModule {

    // 获取版本号
    private static String OSVersion = android.os.Build.VERSION.RELEASE;
    // 获取手机型号
    private static String mxh = android.os.Build.MODEL;

    //访问服务器地址
    private static String ENGINE_URL = "http://www.yunmaiocr.com/SrvXMLAPI";

    private static final String connFail = "确认网络连接是否正常！";

    public OcrModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void tryToSend(final String yunMaiUserName, final String yunMaiPassword, String imgPath, final Callback cb){
        imgPath = FileUtil.getRealFilePath(this.getCurrentActivity(), Uri.parse(imgPath));
        final byte[] jpegData =  FileUtil.getByteFromPath(imgPath);
        if(jpegData != null && jpegData.length > 0){
            new Thread(new Runnable() {
                @Override
                public void run() {
//                    if((jpegData.length>(1000*1024*5))){
//                        mHandler.sendMessage(mHandler.obtainMessage(3, getResources().getString(R.string.photo_too_lage)));
//                        return;
//                    }
                    String result = send(yunMaiUserName, yunMaiPassword, jpegData);
                    WritableMap response = Arguments.createMap();
                    response.putString("data", result);
                    cb.invoke(response);
                }
            }).start();
        } else {
            WritableMap response = Arguments.createMap();
            response.putString("data", "error");
            cb.invoke(response);
        }
    }

    private String send(String yunMaiUserName, String yunMaiPassword, byte[] file) {
        String xml = createSendXML(yunMaiUserName, yunMaiPassword);
        byte[] dest = new byte[xml.getBytes().length + file.length + "<file></file>".getBytes().length];
        int pos = 0;
        System.arraycopy(xml.getBytes(), 0, dest, pos, xml.getBytes().length);
        pos += xml.getBytes().length;
        System.arraycopy("<file>".getBytes(), 0, dest, pos, "<file>".getBytes().length);
        pos += "<file>".getBytes().length;
        System.arraycopy(file, 0, dest, pos, file.length);
        pos += file.length;
        System.arraycopy("</file>".getBytes(), 0, dest, pos, "</file>".getBytes().length);
        try {
            return httpClient(ENGINE_URL, dest);
        } catch (IOException e) {
             return "-1";
        }
    }

    private String createSendXML(String yunMaiUserName, String yunMaiPassword){
        String action = "idcard.scan";
        ArrayList<String[]> arr = new ArrayList<String[]>();
        String key = UUID.randomUUID().toString();
        String time = String.valueOf(System.currentTimeMillis());
        String verify = MD5(action + yunMaiUserName+key+time+yunMaiPassword);
        arr.add(new String[] { "action", action});
        arr.add(new String[] { "client", yunMaiUserName});
        arr.add(new String[] { "system", OSVersion + mxh});
        arr.add(new String[] { "password", MD5(yunMaiPassword)});
        arr.add(new String[] { "key", key });
        arr.add(new String[] { "time",time});
        arr.add(new String[] { "verify", verify });
        arr.add(new String[] { "ext", "jpg" });
        return createXML(arr, false);
    }

    private static String createXML(ArrayList<String[]> arr, boolean IsUpper) {
        if (arr == null || arr.size() == 0)
            return "";
        StringBuffer sb = new StringBuffer();
        String tag= "";
        for (int idx = 0; idx < arr.size(); idx++) {
            tag=arr.get(idx)[0];
            if(IsUpper){
                tag=tag.toUpperCase();
            }
            sb.append("<");
            sb.append(tag);
            sb.append(">");
            sb.append(arr.get(idx)[1]);
            //sb.append(XMLFunctions.code(arr.get(idx)[1]));
            sb.append("</");
            sb.append(tag);
            sb.append(">");
        }
        return sb.toString();
    }

    @SuppressWarnings("finally")
    private String httpClient(String url,byte[] content) throws IOException{
        HttpClient httpClient = new HttpClient();
        HttpClientParams httparams = new HttpClientParams();
        httpClient.setParams(httparams);
        httpClient.setConnectionTimeout(10000);
        httpClient.setTimeout(10000);

        PostMethod method = new PostMethod(url);
        RequestEntity requestEntity = new ByteArrayRequestEntity(content);
        method.setRequestEntity(requestEntity);
        String responseBody = null;
        try {
            method.getParams().setContentCharset("utf-8");
            method.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());
            int statusCode = httpClient.executeMethod(method);
            if (statusCode != HttpStatus.SC_OK) {
                System.out.println("\r\nMethod failed: " + method.getStatusLine() + ",url:\r\n" + url + "\r\n");
            }
            StringBuffer resultBuffer = new StringBuffer();
            BufferedReader in = new BufferedReader(new InputStreamReader(method.getResponseBodyAsStream(),
                    method.getResponseCharSet()));
            String inputLine = null;
            while ((inputLine = in.readLine()) != null) {
                resultBuffer.append(inputLine);
                resultBuffer.append("\r\n");
            }
            in.close();
            responseBody = resultBuffer.toString().trim();
        }catch(ConnectTimeoutException ex){
            responseBody = connFail;
        }catch(SocketTimeoutException e){
            responseBody = connFail;
        }catch(UnknownHostException e){
            responseBody = connFail;
        }catch (Exception e) {
            System.out.println(">>> http请求异常，url=" + url);
            Log.d("tag", "-->"+e);
            e.printStackTrace();
            responseBody = "-2";
        } finally {
            if (method != null) {
                method.releaseConnection();
                method = null;
            }
            return responseBody;
        }

    }

    @Override
    public String getName() {
        return "OcrModule";
    }

    private final static String MD5(String pwd) {
        //用于加密的字符
        char md5String[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F' };
        try {
            byte[] btInput = pwd.getBytes();

            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            mdInst.update(btInput);
            byte[] md = mdInst.digest();
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {   //  i = 0
                byte byte0 = md[i];  //95
                str[k++] = md5String[byte0 >>> 4 & 0xf];    //    5
                str[k++] = md5String[byte0 & 0xf];   //   F
            }
            return new String(str);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
