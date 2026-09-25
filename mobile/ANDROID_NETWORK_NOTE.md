# Android local development network note

The React Native Android application needs network access for the local Express API.

If your React Native template does not already include it, add this to:

`android/app/src/main/AndroidManifest.xml`

inside the `<manifest>` element:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

For local HTTP development, Android's cleartext traffic policy may also need to be enabled depending on your React Native/Android configuration. Prefer HTTPS in production.

The starter uses:

```text
http://10.0.2.2:5000/api
```

for an Android emulator.

For a physical phone, use your computer's LAN IP and make sure the phone and computer are on the same network.
