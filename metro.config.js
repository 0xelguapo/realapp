// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// module.exports = getDefaultConfig(__dirname);

//above is the default previous code.

const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
