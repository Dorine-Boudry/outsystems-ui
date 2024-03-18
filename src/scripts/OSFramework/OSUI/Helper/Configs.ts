// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.OSUI.Helper {
	/**
	 * Method used to return a list of properties that needs a redraw
	 *
	 * @param value Text to be sanitized
	 * @returns
	 */
	export function CheckConfigs(
		newPatternConfigs: JSON,
		oldPatternConfigs: object,
		configsNeedsRedraw: string[]
	): string {
		const updateConfigs = [];

		for (const configName in newPatternConfigs) {
			if (oldPatternConfigs.hasOwnProperty(configName)) {
				const oldConfigs = JSON.stringify(oldPatternConfigs[configName]);
				const newConfigs = JSON.stringify(newPatternConfigs[configName]);
				const propertyConfig = {
					configName: configName,
					needsRedraw: false,
				};

				// Add the configName into the array only if the value is different
				if (oldConfigs !== newConfigs && configsNeedsRedraw.indexOf(configName) > -1) {
					propertyConfig.needsRedraw = true;
				}
				updateConfigs.push(propertyConfig);
			}
		}

		console.log('CheckConfigs method!', updateConfigs);

		return JSON.stringify(updateConfigs);
	}

	/**
	 * Method used to check if a configName exists in a given array of properties
	 * This needs to be changed when we create the typification on the configs (configsToBeUpdated: any)
	 *
	 * @export
	 * @param {*} configsToBeUpdated
	 * @param {string} hasConfigName
	 * @return {*}  {string}
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export function ConfigNameExists(configsToBeUpdated: any, hasConfigName: string): string {
		return configsToBeUpdated.filter((config) => {
			return config.configName === hasConfigName ? hasConfigName : '';
		});
	}

	/**
	 * Method used to return if a pattern needs a redraw based on a given array of properties
	 * This needs to be changed when we create the typification on the configs (configsToBeUpdated: any)
	 *
	 * @export
	 * @param {*} configsToBeUpdated
	 * @return {*}  {boolean}
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export function PatternNeedsRedraw(configsToBeUpdated: any): boolean {
		const needsRedraw = configsToBeUpdated.filter((config) => {
			return config.needsRedraw === true;
		});
		return needsRedraw.length > 0;
	}
}
