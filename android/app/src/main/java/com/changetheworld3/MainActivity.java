package com.changetheworld3;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

import com.changetheworld3.speech.SpeechService;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "changeTheWorld3";
    }

    private SpeechService mSpeechService;
    private final SpeechService.Listener mSpeechServiceListener = new SpeechService.Listener() {
        @Override
        public void onSpeechRecognized(final String text, final boolean isFinal) {
            Log.i("speech", text);
        }
    };
    private final ServiceConnection mServiceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder binder) {
            Log.i("--------------", "1111onServiceConnected: mSpeechService connected");
            mSpeechService = SpeechService.from(binder);
            mSpeechService.addListener(mSpeechServiceListener);
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            Log.i("----------------", "1111mSpeechService disconnected");
            mSpeechService = null;
        }
    };

    @Override
    protected void onStart() {
        super.onStart();
        boolean bound = bindService(new Intent(this, SpeechService.class), mServiceConnection, BIND_AUTO_CREATE);
        Log.i("--------------", "1111try to bind to service: " + bound);

    }
}
