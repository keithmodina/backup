const samsungPrivacyApiBaseUrl = 'http://dev-api.sdap-cms.samsungph.net/api/v1';
// const samsungPrivacyApiBaseUrl = 'http://localhost:8000/api/v1';
const isLocal = window.location.hostname === 'localhost';

const config = {
  PRIVACY_POLICY_API_URL: `${samsungPrivacyApiBaseUrl}/privacypolicy`,
  USER_API_URL: `${samsungPrivacyApiBaseUrl}/user`,
  SERVER_BASE_URL: samsungPrivacyApiBaseUrl,
  CLIENT_BASE_URL: isLocal ? 'http://localhost:8000/' : 'http://dev.sdap-cms.samsungph.net/'
};

export default config;
