package com.changetheworld3;

import android.app.Application;
import android.content.ComponentName;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

import com.changetheworld3.speech.SpeechPackage;
import com.changetheworld3.speech.SpeechService;
import com.facebook.react.ReactApplication;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication {

    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new RNGoogleSignInPackage(),
              new RNFirebasePackage(),
              new RNFirebaseAuthPackage(),
              new RNFirebaseDatabasePackage(),
              new SpeechPackage()
      );
    }

    public String getJSMainModuleName() {
      return "index";
    }

    @Override
    public boolean isDebug() { return BuildConfig.DEBUG; }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
    }
}