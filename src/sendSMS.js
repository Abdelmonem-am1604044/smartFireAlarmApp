import SendSMS from 'react-native-sms';

//some stuff

export default function sendSMS() {
  SendSMS.send(
    {
      body: 'The default body of the SMS!',
      recipients: ['0123456789'],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true,
    },
    (completed, cancelled, error) => {
      console.log(
        'SMS Callback: completed: ' +
          completed +
          ' cancelled: ' +
          cancelled +
          ' error: ' +
          error
      );
    }
  );
}
