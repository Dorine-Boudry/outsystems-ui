// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSUIFramework.Patterns.Progress {
	export abstract class AbstractProgress<C extends ProgressConfiguration>
		extends AbstractPattern<C>
		implements IProgress
	{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
		constructor(uniqueId: string, configs: C) {
			super(uniqueId, configs);

			console.log(`AbstractProgress Constructor - '${uniqueId}'`);
		}

		// Set default Accessibility properties
		private _setAccessibilityProps(): void {
			Helper.Attribute.Set(this._selfElem, 'tabindex', '0');
			Helper.Attribute.Set(this._selfElem, 'role', 'progressbar');
			Helper.Attribute.Set(this._selfElem, 'aria-valuemin', '0');
			Helper.Attribute.Set(this._selfElem, 'aria-valuemax', '100');
		}

		// Update valuenow Accessibility property and CssVariable that will be used to set the progress value into pattern
		protected updateValueNow(progressValue: string): void {
			Helper.Attribute.Set(this._selfElem, 'aria-valuenow', progressValue);

			Helper.Style.SetStyleAttribute(
				this._selfElem,
				ProgressEnum.InlineStyleProp.ProgressValue,
				progressValue + '%'
			);
		}

		public build(): void {
			super.build();

			this._setAccessibilityProps();

			this.finishBuild();
		}

		// Implement the _addInitialAnimation method since a transitionend event must be added, this must be implemented at childs level
		protected abstract addInitialAnimation(): void;
	}
}