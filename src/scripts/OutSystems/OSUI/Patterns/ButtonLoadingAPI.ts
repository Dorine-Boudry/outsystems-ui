// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OutSystems.OSUI.Patterns.ButtonLoadingAPI {
	const _buttonsLoadingMap = new Map<string, OSUIFramework.Patterns.ButtonLoading.IButtonLoading>(); //buttonLoading.uniqueId -> ButtonLoading obj

	/**
	 * Function that will change the property of a given ButtonLoading.
	 *
	 * @export
	 * @param {string} ButtonLoadingId ID of the ButtonLoading where the property will be changed.
	 * @param {string} propertyName Property name that will be updated
	 * @param {*} propertyValue Value that will be set to the property
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
	export function ChangeProperty(buttonLoadingId: string, propertyName: string, propertyValue: any): void {
		const ButtonLoading = GetButtonLoadingById(buttonLoadingId);

		ButtonLoading.changeProperty(propertyName, propertyValue);
	}

	/**
	 * Create the new ButtonLoading instance and add it to the buttonsLoadingMap
	 *
	 * @export
	 * @param {string} ButtonLoadingId ID of the ButtonLoading where the instance will be created.
	 * @param {string} configs configurations for the ButtonLoading in JSON format.
	 * @return {*}  {OSUIFramework.Patterns.IButtonLoading}
	 */
	export function Create(
		buttonLoadingId: string,
		configs: string
	): OSUIFramework.Patterns.ButtonLoading.IButtonLoading {
		if (_buttonsLoadingMap.has(buttonLoadingId)) {
			throw new Error(
				`There is already a ${OSUIFramework.GlobalEnum.PatternsNames.ButtonLoading} registered under id: ${buttonLoadingId}`
			);
		}

		const _newButtonLoading = new OSUIFramework.Patterns.ButtonLoading.ButtonLoading(
			buttonLoadingId,
			JSON.parse(configs)
		);

		_buttonsLoadingMap.set(buttonLoadingId, _newButtonLoading);

		return _newButtonLoading;
	}

	/**
	 * Function that will destroy the instance of the given ButtonLoading
	 *
	 * @export
	 * @param {string} ButtonLoadingId
	 */
	export function Destroy(buttonLoadingId: string): void {
		const buttonLoading = GetButtonLoadingById(buttonLoadingId);

		buttonLoading.dispose();

		_buttonsLoadingMap.delete(buttonLoading.uniqueId);
	}

	/**
	 * Function that will return the Map with all the ButtonLoading instances at the page
	 *
	 * @export
	 * @return {*}  {Map<string, OSUIFramework.Patterns.ButtonLoading.IButtonLoading>}
	 */
	export function GetAllButtonsLoading(): Array<string> {
		return OSUIFramework.Helper.MapOperation.ExportKeys(_buttonsLoadingMap);
	}

	/**
	 * Function that gets the instance of ButtonLoading, by a given ID.
	 *
	 * @export
	 * @param {string} ButtonLoadingId ID of the ButtonLoading that will be looked for.
	 * @return {*}  {OSUIFramework.Patterns.ButtonLoading.IButtonLoading}
	 */
	export function GetButtonLoadingById(buttonLoadingId: string): OSUIFramework.Patterns.ButtonLoading.IButtonLoading {
		return OSUIFramework.Helper.MapOperation.FindInMap(
			'ButtonLoading',
			buttonLoadingId,
			_buttonsLoadingMap
		) as OSUIFramework.Patterns.ButtonLoading.IButtonLoading;
	}

	/**
	 * Function that will initialize the pattern instance.
	 *
	 * @export
	 * @param {string} ButtonLoadingId ID of the ButtonLoading that will be initialized.
	 * @return {*}  {OSUIFramework.Patterns.ButtonLoading.IButtonLoading}
	 */
	export function Initialize(buttonLoadingId: string): OSUIFramework.Patterns.ButtonLoading.IButtonLoading {
		const buttonLoading = GetButtonLoadingById(buttonLoadingId);

		buttonLoading.build();

		return buttonLoading;
	}
}