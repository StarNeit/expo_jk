const ENV = {
  dev: {
    bloomUrl: "https://api.bloom.be/api/",
  },

  prod: {
    bloomUrl: "https://api.bloom.be/api/",
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;
