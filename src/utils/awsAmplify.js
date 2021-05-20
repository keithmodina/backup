import Amplify, { Auth } from 'aws-amplify';

import USER_POOL from '../constants/cognito';

Amplify.configure({
  Auth: {

    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: USER_POOL.id,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: USER_POOL.clientId,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});

export {
  Auth
};
