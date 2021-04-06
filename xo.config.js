/**
 * {@see https://eslint.org/docs/user-guide/configuring/rules}
 */
module.exports = {
	extends: ["xo-react", "plugin:prettier/recommended"],
	ignores: ["lib", "public", "*.config.js", "node_modules"],
	plugins: ["prettier"],
	env: ["browser", "node"],
	overrides: [],
	prettier: true,
	rules: {
		"react/prop-types": 0,
	},
};
