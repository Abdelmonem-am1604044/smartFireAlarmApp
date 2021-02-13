import call from 'react-native-phone-call';
// import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

export default function initiatePhoneCall() {
  const args = {
    number: '911', // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
  };

  call(args).catch(console.error);
  // RNImmediatePhoneCall.immediatePhoneCall('30936577');
}
