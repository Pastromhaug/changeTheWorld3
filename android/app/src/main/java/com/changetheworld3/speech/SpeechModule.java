package com.changetheworld3.speech;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SpeechModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    private ReactContext mReactContext;


    public SpeechModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;

        final ServiceConnection mServiceConnection = new ServiceConnection() {

            @Override
            public void onServiceConnected(ComponentName componentName, IBinder binder) {
                mSpeechService = SpeechService.from(binder);
                mSpeechService.addListener(mSpeechServiceListener);
            }

            @Override
            public void onServiceDisconnected(ComponentName componentName) {
                mSpeechService = null;
            }

        };

        final Activity currentActivity = this.getCurrentActivity();
        Intent speechServiceIntent = new Intent(currentActivity, SpeechService.class);
        currentActivity.bindService(speechServiceIntent, mServiceConnection, Context.BIND_AUTO_CREATE);
    }

    @Override
    public String getName() {
        return "SpeechModule";
    }

    private SpeechService mSpeechService;

    private VoiceRecorder mVoiceRecorder;
    private final VoiceRecorder.Callback mVoiceCallback = new VoiceRecorder.Callback() {

        @Override
        public void onVoiceStart() {
            if (mSpeechService != null) {
                mSpeechService.startRecognizing(mVoiceRecorder.getSampleRate());
            }
        }

        @Override
        public void onVoice(byte[] data, int size) {
            if (mSpeechService != null) {
                Log.i("data", data.toString());
                mSpeechService.recognize(data, size);
            }
        }

        @Override
        public void onVoiceEnd() {
            if (mSpeechService != null) {
                mSpeechService.finishRecognizing();
            }
        }
    };

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
    }

    private final SpeechService.Listener mSpeechServiceListener = new SpeechService.Listener() {
        @Override
        public void onSpeechRecognized(final String text, final boolean isFinal) {
            Log.i("speech", text);
            WritableMap params = Arguments.createMap();
            params.putString("text", text);
            params.putBoolean("isFinal", isFinal);
            sendEvent(mReactContext, "speechReceived", params);
        }
    };

    @ReactMethod
    private void startVoiceRecorder() {
        if (mVoiceRecorder != null) {
            mVoiceRecorder.stop();
        }
        mVoiceRecorder = new VoiceRecorder(mVoiceCallback);
        mVoiceRecorder.start();
    }

    @ReactMethod
    private void stopVoiceRecorder() {
        if (mVoiceRecorder != null) {
            mVoiceRecorder.stop();
            mVoiceRecorder = null;
        }
    }
}