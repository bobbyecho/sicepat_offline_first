const networkIssueCode = [
  "ENOTFOUND", // dns could not resolve name
  "ECONNREFUSED",
  "ECONNRESET", // request was reset halfway
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ECONNABORTED",
];

const isNetworkError = (error) => {
  return error.config && networkIssueCode.includes(error?.code ?? "")
}

const offlineHandler = error => handler => {
  if (isNetworkError(error)) {
    return handler(error)
  }
}

const onResponseError = (error) => {
    const enhancedError = Object.assign(error, {
      offlineHandler: offlineHandler(error)
    })

    return Promise.reject(enhancedError);
  };

const onResponse = (config) => {
  return config;
};

const httpClientWithOfflineHandler =
  (httpClient) => {
    // override request interceptor
    httpClient.interceptors.response.use(
      onResponse,
      onResponseError,
    );

    return httpClient;
  };

export default httpClientWithOfflineHandler;
