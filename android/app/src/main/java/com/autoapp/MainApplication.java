package com.autoapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.actionsheet.ActionSheetPackage;
import com.beefe.picker.PickerViewPackage;
import com.remobile.toast.RCTToastPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.rnfs.RNFSPackage;
import org.hongjie.MyPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import org.pgsqlite.SQLitePluginPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RCTToastPackage(),
          new RCTSplashScreenPackage(),
          new BaiduMapPackage(getApplicationContext()),
          new RCTCameraPackage(),
          new RNFSPackage(),
          new SQLitePluginPackage(),
          new ActionSheetPackage(),
          new PickerViewPackage(),
          new MyPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
