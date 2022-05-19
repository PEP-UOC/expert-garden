import chalk from 'chalk';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import colorize from 'json-colorizer';

const consola = async (type, content) => {
	const debug = Constants.manifest.extra.debug;

	const ctx = new chalk.Instance({ level: 3 });

	const normal = Platform.OS !== 'web' ? ctx.whiteBright : ctx.black.bgWhite;
	const bold = Platform.OS !== 'web' ? ctx.bold.whiteBright : ctx.bold.black.bgWhite;
	const warning = ctx.bold.blue.bgWhite;
	const error = ctx.bold.whiteBright.bgRed;

	const checkIsObject = (content) => {
		if (typeof content === 'object' && content !== null) {
			return true;
		} else {
			return false;
		}
	};

	return debug
		? type === 'normal'
			? checkIsObject(content)
				? console.log(normal(colorize(content, { pretty: true })))
				: console.log(normal(content))
			: type === 'bold'
			? checkIsObject(content)
				? console.log(bold(colorize(content, { pretty: true })))
				: console.log(bold(content))
			: type === 'warning'
			? checkIsObject(content)
				? console.log(warning(colorize(content, { pretty: true })))
				: console.log(warning(content))
			: type === 'error'
			? checkIsObject(content)
				? console.log(error(colorize(content, { pretty: true })))
				: console.log(error(content))
			: checkIsObject(content)
			? console.log(normal(colorize(content, { pretty: true })))
			: console.log(normal(content))
		: null;
};

export default consola;
