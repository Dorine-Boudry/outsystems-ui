// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.OSUI.Patterns.TabsHeaderItem {
	/**
	 * Class that represents the custom configurations received by TabsHeaderItem.
	 *
	 * @export
	 * @class TabsHeaderItemConfig
	 * @extends {AbstractConfiguration}
	 */
	export class TabsHeaderItemConfig extends AbstractConfiguration {
		/** PUBLIC PROPERTIES **/
		public TabItemName: string;
		
		constructor(config: JSON) {
			super(config);
		}
	}
}
