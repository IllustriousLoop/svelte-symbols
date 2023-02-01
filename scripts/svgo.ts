import svgo from 'svgo';

const SVG_Optimized = (Str: string): string => {
	const { data } = svgo.optimize(Str, {
		multipass: true,
		plugins: [
			{
				name: 'preset-default',
				params: {
					overrides: {
						removeViewBox: false
					}
				}
			},
			{
				name: 'removeAttrs',
				params: {
					attrs: ['class', 'width', 'height', 'fill']
				}
			},
			{
				name: 'addAttributesToSVGElement',
				params: {
					attributes: [
						{ width: '{size}' },
						{ height: '{size}' },
						{ fill: "{color ? color: 'currentColor' }" }
					]
				}
			}
		]
	});

	// Add props customizing by user
	const svg = data.replace(/\s/, ' {...$$$restProps} ');

	return svg;
};

export default SVG_Optimized;
