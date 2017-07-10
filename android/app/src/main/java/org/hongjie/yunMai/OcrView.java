//package org.hongjie.yunMai;
//
//import android.content.Context;
//import android.hardware.Camera;
//import android.os.Handler;
//import android.os.Message;
//import android.view.SurfaceHolder;
//import android.view.SurfaceView;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//
///**
// * Created by hongjie on 2017/7/10.
// */
//
//public class OcrView extends SurfaceView implements SurfaceHolder.Callback {
//
//    private byte[] jpegData = null;
//    private String flashModel = Camera.Parameters.FLASH_MODE_OFF;
//
//    private Handler mHandler = new Handler(){
//
//        public void handleMessage(Message msg) {
//            switch (msg.what) {
//                case 0:
//                    // Toast.makeText(getBaseContext(), "拍照失败", Toast.LENGTH_SHORT).show();
//                    mCameraManager.initPreView();
//                    break;
//                case 1:
//                    jpegData = (byte[]) msg.obj;
//                    if(jpegData != null && jpegData.length > 0){
////                        pb.setVisibility(View.VISIBLE);
////                        new Thread(new Runnable() {
////                            @Override
////                            public void run() {
////                                if((jpegData.length>(1000*1024*5))){
////                                    mHandler.sendMessage(mHandler.obtainMessage(3, getResources().getString(R.string.photo_too_lage)));
////                                    return;
////                                }
////                                String result=null;
////                                boolean isavilable=NetUtil.isNetworkConnectionActive(ACameraActivity.this);
////                                if(isavilable){
////                                    result = Scan(MainActivity.action,jpegData,"jpg");
////                                    Log.d("tag", "<----->>"+result);
////                                    if(result.equals("-2")){
////                                        result="连接超时！";
////                                        mHandler.sendMessage(mHandler.obtainMessage(3, result));
////                                    }else if(HttpUtil.connFail.equals(result)){
////                                        mHandler.sendMessage(mHandler.obtainMessage(3, result));
////                                    }else{
////                                        mHandler.sendMessage(mHandler.obtainMessage(4, result));
////                                    }
////                                }else{
////                                    mHandler.sendMessage(mHandler.obtainMessage(3, "无网络，请确定网络是否连接!"));
////                                }
////                            }
////                        }).start();
//                    }
//                    break;
//                case 3:
////                    pb.setVisibility(View.GONE);
//                    String str=msg.obj+"";
////                    Toast.makeText(getBaseContext(), str, Toast.LENGTH_SHORT).show();
//                    mCameraManager.initPreView();
////                    mShutter.setEnabled(true);
//                    break;
//                case 4:
////                    mShutter.setEnabled(true);
////                    pb.setVisibility(View.GONE);
////                    String result=msg.obj+"";
////                    Intent intent=new Intent();
////                    intent.putExtra("result", result);
////                    setResult(Activity.RESULT_OK,intent);
////                    finish();
//                    break;
//                case 5:
//                    String filePath=msg.obj+"";
//                    byte[] data = getByteFromPath(filePath);
////                    Log.d(tag, "data length:"+data.length);
//                    if(data!=null && data.length>0){
//                        mHandler.sendMessage(mHandler.obtainMessage(1,data));
//                    }else{
//                        mHandler.sendMessage(mHandler.obtainMessage(0));
//                    }
//                    break;
//                case 6:
////                    Toast.makeText(getBaseContext(), "请插入存储卡！", Toast.LENGTH_SHORT).show();
//                    mCameraManager.initPreView();
//                    break;
//            }
//        };
//    };
//
//    private OcrCamera mCameraManager;
//
//    public OcrView(Context context) {
//        super(context);
//
//        mCameraManager = new OcrCamera(mHandler);
//
//        SurfaceHolder surfaceHolder = getHolder();
//        surfaceHolder.addCallback(this);
//        surfaceHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
////        mShutter.setOnClickListener(new OnClickListener() {
////
////            @Override
////            public void onClick(View v) {
////                mCameraManager.requestFocuse();
////                mShutter.setEnabled(false);
////            }
////        });
//    }
//
//    @Override
//    public void surfaceCreated(SurfaceHolder holder) {
//        try {
//            mCameraManager.openCamera(getHolder());
//            if(flashModel ==null || !mCameraManager.isSupportFlash(flashModel)){
//                flashModel = mCameraManager.getDefaultFlashMode();
//            }
//            mCameraManager.setCameraFlashMode(flashModel);
//        }catch(RuntimeException e){
////            Toast.makeText(ACameraActivity.this, R.string.camera_open_error,Toast.LENGTH_SHORT).show();
//        }catch (IOException e) {
////            Toast.makeText(ACameraActivity.this, R.string.camera_open_error,Toast.LENGTH_SHORT).show();
//        }
//    }
//
//    @Override
//    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
//        if(width>height){
//            mCameraManager.setPreviewSize(width, height);
//        }else{
//            mCameraManager.setPreviewSize(height, width);
//        }
//        mCameraManager.initPreView();
//    }
//
//    @Override
//    public void surfaceDestroyed(SurfaceHolder holder) {
//        mCameraManager.closeCamera();
//    }
//
////    public static String Scan(String type,byte[] file,String ext){
////        String xml = HttpUtil.getSendXML(type, ext);
////        return HttpUtil.send(xml, file);
////    }
//
////    @Override
////    public boolean onKeyDown(int keyCode, KeyEvent event) {
////        if(keyCode==KeyEvent.KEYCODE_BACK){
////            setResult(Activity.RESULT_OK);
////            finish();
////            return true;
////        }
////        return super.onKeyDown(keyCode, event);
////    }
//
//    @SuppressWarnings("resource")
//    private static byte[] getByteFromPath(String filePath) {
//        byte[] bytes=null;
//        try {
//            File file = new File(filePath);
//            if(file.length()>Integer.MAX_VALUE){
//                throw new IOException("File is to large :"+file.getName());
//            }
//            if(file.exists()){
//                int offset = 0;
//                int numRead = 0;
//                InputStream is = new FileInputStream(file);
//                bytes=new byte[(int)file.length()];
//                while(offset < bytes.length &&
//                        (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0){
//                    offset += numRead;
//                }
//                if (offset < bytes.length) {
//                    throw new IOException("Could not completely read file "
//                            + file.getName());
//                }
//                is.close();
//                return bytes;
//            }
//        }catch(Exception e) {
//            e.printStackTrace();
//            bytes=null;
//        }
//        finally{
//            bytes = null;
//        }
//
//        return null;
//    }
//}
