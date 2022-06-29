const proxy = [
	{
		context: '/api',
		target: 'https://formspree.io/f/mrgjvrew',
		pathRewrite: { '^/api': '' },
		changeOrigin: true,
		secure: false,
		logLevel: 'debug'
	}
];

module.exports = proxy;
