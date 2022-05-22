# Build Types

- Build Android APK
  - eas build -p android --profile androidAPK
- Build IOS IPA for Simulator
  - eas build -p ios --profile iosSimulator
- Build IOS IPA / Andriod AAB for development
  - eas build --profile development
- Build IOS IPA / Andriod AAB for preview
  - eas build --profile preview
- Build IOS IPA / Andriod AAB for production
  - eas build --profile production

BUILD AND SUBMIT TO GOOGLE PLAY
eas build -p android --profile production --auto-submit-with-profile=internal
