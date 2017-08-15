package org.hongjie;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import org.hongjie.file.FileModule;
import org.hongjie.yunMai.OcrModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by hongjie on 2017/7/10.
 */

public class MyPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules=new ArrayList<>();
        modules.add(new OcrModule(reactContext));
        modules.add(new FileModule(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
//        return Collections.<ViewManager>singletonList(new OcrViewManager());
        return Collections.emptyList();
    }
}
