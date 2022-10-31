const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
const blacklist = require("metro-config/src/defaults/exclusionList");
config.resolver.blacklistRE = blacklist([/#current-cloud-backend\/.*/]);
config.transformer.getTransformOptions.transform = {
  ...config.transformer.getTransformOptions.transform,
  experimentalImportSupport: false,
  inlineRequires: false,
};

module.exports = config;

// module.exports = {
//   resolver: {
//     blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };
