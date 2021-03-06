package com.smartfirealarm;

import com.facebook.react.ReactActivity;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import android.content.Intent; // <-- include if not already there
import com.tkporter.sendsms.SendSMSPackage;
public class MainActivity extends ReactActivity {

@Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        RNImmediatePhoneCallPackage.onRequestPermissionsResult(requestCode, permissions, grantResults); // very important event callback
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    } 


@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    //probably some other stuff here
    SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
}
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "smartFireAlarm";
  }
}
