module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' }, loose: true }],
		'@babel/preset-react'
	],
	plugins: [['@babel/plugin-proposal-private-property-in-object', { loose: true }]]
};
