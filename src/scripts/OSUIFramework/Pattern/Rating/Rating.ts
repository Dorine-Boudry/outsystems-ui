// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSUIFramework.Patterns.Rating {
	/**
	 * Defines the interface for OutSystemsUI Patterns
	 */
	export class Rating extends AbstractPattern<RatingConfig> implements IRating {
		// Store the placholders content
		private _clonedPlaceholders: string;
		// Store current decimal value
		private _decimalValue: number;
		// Store current disable values
		private _disabled: boolean;
		// Store if the rating value is half
		private _isHalfValue: boolean;
		// Store the callback to be used on the OnSelect event
		private _onSelect: any;
		// Store if the rating already has an event added
		private _ratingHasEventAdded: boolean;
		// Store the rating icons html element
		private _ratingIconStatesElem: HTMLElement;
		// Store the input name to be used on clones
		private _ratingInputName: string;
		// Store the fieldset html element
		private _ratingFieldsetElem: HTMLElement;
		// Store current rating value
		private _value: number;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
		constructor(uniqueId: string, configs: any) {
			super(uniqueId, new RatingConfig(configs));

			this._value = this.configs.RatingValue;
			this._disabled = !this.configs.IsEdit;
			this._ratingInputName = 'rating-' + this.uniqueId;
			this._ratingHasEventAdded = false;
			this._onSelect = null;
		}

		// Medthod that will iterate on the RatingScale, to crate an item for each one
		private _createItems(): void {
			for (let i = 0; i <= this.configs.RatingScale; i++) {
				// Store index to be used on the _renderItems method
				this._renderItems(i);
			}
		}

		// Method that handles the placeholders content storage and DOM lifecycle
		private _handlePlaceholders(): void {
			// Store the placholders content to cloned after
			this._clonedPlaceholders = this._ratingIconStatesElem.innerHTML;

			// After it's stored, remove the original content from the DOM
			this._ratingIconStatesElem.remove();
		}

		// Method to manage the click event
		private _manageRatingEvent(): void {
			// Check if a event was already added
			if (this._ratingHasEventAdded) {
				// If true, remove event
				this._selfElem.removeEventListener('click', this._ratingOnClick.bind(this));

				// And set variable as false
				this._ratingHasEventAdded = false;
			} else if (this.configs.IsEdit) {
				// Otherwise, if there is no event already added and the param IsEdit is true, add new event
				this._selfElem.addEventListener('click', this._ratingOnClick.bind(this));
				// And set variable as true
				this._ratingHasEventAdded = true;
			}
		}

		// Method that handles the click event and set the new value, by checking the input:checked
		private _ratingOnClick(e: MouseEvent): void {
			const currentTarget: HTMLElement = e.target as HTMLElement;
			// Remove the is-half when clicking, as a click will never result in a half value
			this._isHalfValue = false;

			// Check if the e.target is a label with the Enum.RatingCssClass.RatingInput class
			const isInput = Helper.Style.ContainsClass(currentTarget, Enum.RatingCssClass.RatingInput);
			if (isInput) {
				// If it is, then get the input:checked value
				this._value = this.getValue();
				// And use that value to set a new Rating Value
				this.setValue(this._value);
			}
		}

		// Method called on createItems() to render the correct HTML structure for each item
		private _renderItems(index: number): void {
			// If first input, whihc is hidden, than also hide the label
			const hideLabelClass: string = index === 0 ? Enum.RatingCssClass.WCAGHideText : '';
			// if not first input, which is hidden, add the html stored form the placeholders
			const labelHTML: any = index !== 0 ? this._clonedPlaceholders : '';
			// Create a unique rating input id, based on the index
			const ratingInputId: string = this.uniqueId + '-rating-' + index;

			// Craete input and label html
			const input = `<input type="radio" class="${Enum.RatingCssClass.RatingInput} ${Enum.RatingCssClass.WCAGHideText}" id=${ratingInputId} name=${this._ratingInputName} value=${index}/>`;
			const label = `<label class='${Enum.RatingCssClass.RatingItem} ${hideLabelClass}' for=${ratingInputId}><span class="${Enum.RatingCssClass.WCAGHideText}">Rating ${index}</span>${labelHTML}</label>`;

			// Append new input + label to fieldset's html
			this._ratingFieldsetElem.innerHTML += input + label;
		}

		// Toggle fieldset disbaled status
		private _setFieldsetDisabledStatus(isDisabled: boolean): void {
			const isFieldsetDisabled = Helper.Attribute.Get(this._ratingFieldsetElem, 'disabled');

			if (isDisabled) {
				Helper.Attribute.Set(this._ratingFieldsetElem, 'disabled', 'true');
			} else if (!isDisabled && isFieldsetDisabled) {
				Helper.Attribute.Remove(this._ratingFieldsetElem, 'disabled');
			}
		}

		// Set the html references that will be used to manage the cssClasses and atribute properties
		private _setHtmlElements(): void {
			this._ratingIconStatesElem = this._selfElem.querySelector('.' + Enum.RatingCssClass.IconStates);
			this._ratingFieldsetElem = this._selfElem.querySelector('fieldset');
		}

		// Set the cssClasses that should be assigned to the element on it's initialization
		private _setInitialCssClasses(): void {
			// Set IsEdit class
			if (this._isHalfValue === true) {
				Helper.Style.AddClass(this._selfElem, Enum.RatingCssClass.IsHalf);
			}

			// Set IsHalf class
			if (this._configs.IsEdit === true) {
				Helper.Style.AddClass(this._selfElem, Enum.RatingCssClass.IsEdit);
			}

			// Set Size class
			if (this._configs.Size !== '') {
				Helper.Style.AddClass(this._selfElem, Enum.RatingCssClass.Size + this._configs.Size);
			}

			// Set default ExtendedClass values
			if (this._configs.ExtendedClass !== '') {
				this.UpdateExtendedClass(this._configs.ExtendedClass, this._configs.ExtendedClass);
			}
		}

		public build(): void {
			super.build();

			this._setHtmlElements();

			this._setInitialCssClasses();

			this._handlePlaceholders();

			this._setFieldsetDisabledStatus(!this._configs.IsEdit);

			this._createItems();

			this._manageRatingEvent();

			this.setValue(this._configs.RatingValue, false);

			this.finishBuild();
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
		public changeProperty(propertyName: string, propertyValue: any): void {
			if (Enum.Rating[propertyName] && this._configs.hasOwnProperty(propertyName)) {
				// Check which property changed and call respective method to update it
				switch (propertyName) {
					case Enum.Rating.ExtendedClass:
						this.UpdateExtendedClass(this._configs.ExtendedClass, propertyValue);

						this._configs.ExtendedClass = propertyValue;

						break;
					case Enum.Rating.RatingValue:
						this.setValue(propertyValue);

						break;
					case Enum.Rating.RatingScale:
						this.setScale(propertyValue);

						break;
					case Enum.Rating.IsEdit:
						this.setIsEdit(propertyValue);

						break;
					case Enum.Rating.Size:
						this.setSize(propertyValue);

						break;
				}
			} else {
				throw new Error(`changeProperty - Property '${propertyName}' can't be changed.`);
			}
		}

		// Destroy the Rating pattern
		public destroy(): void {
			// call super method, which deletes this rating class instance from the RatingMap
			super.destroy();

			// remove event listener if any was added
			if (this._ratingHasEventAdded) {
				this._selfElem.removeEventListener('click', this._ratingOnClick.bind(this));
			}

			// Remove html from the fieldset
			this._ratingFieldsetElem.innerHTML = '';
		}

		public registerCallback(callback: any): void {
			this._onSelect = (param, ...args) => {
				callback(param, ...args);
			};
		}

		// Get the rating decimal value
		public getDecimalValue(value: number): number {
			return Math.round((value - Math.floor(value)) * 100) / 100;
		}

		// Get disabled status
		public getIsDisabled(): boolean {
			return this._disabled;
		}

		// Get if the valie is-half
		public getIsHalfValue(value: number): boolean {
			const decimalValue = this.getDecimalValue(value);
			// If bigger than 0.3 and lower than 0.7 means it should be represented as a half value.
			// This threshold was decided by UX principles
			const isHalf = decimalValue >= 0.3 && decimalValue <= 0.7 ? true : false;

			return isHalf;
		}

		// Get the rating value
		public getValue(): number {
			const inputChecked: any = this._selfElem.querySelector('input:checked');
			return parseInt(inputChecked.value);
		}

		// Set disabled status
		public setIsDisabled(isDisabled: boolean): void {
			this._setFieldsetDisabledStatus(isDisabled);

			this._disabled = isDisabled;
		}

		// Set the IsEdit option
		public setIsEdit(isEdit: any): void {
			// Make sure that the param value is boolean and not a string
			// This needs to be done, for compatibility with OutSystems platform logic
			const IsEditParam = isEdit === 'True' ? true : false;

			// Set the fieldset and input disabled attribute status
			this.setIsDisabled(!IsEditParam);
			// Update the config
			this._configs.IsEdit = IsEditParam;

			// Toggle the is-edit class
			IsEditParam
				? Helper.Style.AddClass(this._selfElem, Enum.RatingCssClass.IsEdit)
				: Helper.Style.RemoveClass(this._selfElem, Enum.RatingCssClass.IsEdit);

			// Review if there's a need to add/remove the click event, accordingly to the IsEdit value
			this._manageRatingEvent();
		}

		// Set a RatingScale
		public setScale(value: number): void {
			// Update configs
			this.configs.RatingScale = value;
			// Call destroy, so that the html is deleted
			this.destroy();
			// Afteer the fieldset html is clean, create the items again
			this._createItems();
			// Set the rating value equal to the value before calling the setScale method
			this.setValue(this._value, false);
		}

		// Set the Rating Size
		public setSize(size: string): void {
			let newSize: string;

			// Reset current class
			if (this.configs.Size !== '') {
				Helper.Style.RemoveClass(this._selfElem, this.configs.Size);
			}

			// If size param is not empty, it means is either 'small' or 'medium', so we can add the class based on the size param
			// This is done, as the Size entity in OutSystems has not a 'base' entity, just a NullIdentifier, which is the default size
			if (size !== '') {
				newSize = Enum.RatingCssClass.Size + size;
				Helper.Style.AddClass(this._selfElem, newSize);
			} else {
				// If it's empty, it means is the default NullIdentifier, whihch corresponds to the 'base' size
				newSize = '';
			}

			// Update the config
			this.configs.Size = newSize;
		}

		// Set a rating value
		public setValue(value: any, triggerEvent: boolean = true): void {
			if (value !== null) {
				// Format value to be of type decimal number
				value = parseFloat(value);
				// Store the new value to be defined
				let newValue: number;
				// Check if passed value is decimal
				this._decimalValue = this.getDecimalValue(value);
				// Check if passed value is half
				this._isHalfValue = this.getIsHalfValue(value);
				// Get all inputs on rating, to properly add the :checked attribute on the correct one
				const ratingItems = this._selfElem.querySelectorAll('input');

				// Reset the is-half class
				if (Helper.Style.ContainsClass(this._selfElem, Enum.RatingCssClass.IsHalf)) {
					Helper.Style.RemoveClass(this._selfElem, Enum.RatingCssClass.IsHalf);
				}

				// If there's only one rating item, then there's no need for further checks, this one will be checked
				if (this.configs.RatingScale === 1) {
					ratingItems[1].checked = true;
					return;
				}

				// Set the newValue const to the correct value
				// If is-half or the decimal value is bigger than 0.7, that means that we will have to apply the :checked attribute on the next input
				// Otherwise, the input :checked will correspond to the one clicked.
				newValue = this._isHalfValue || this._decimalValue > 0.7 ? parseInt(value) + 1 : parseInt(value);

				// Try if the input :checked exists, otherwise throw warn for trying to set a value bigger than the limit
				try {
					ratingItems[newValue].checked = true;
				} catch (e) {
					console.warn(`Value of Rating '${this.uniqueId}' exceeds the scale boundaries`);
					return;
				}

				// If is-half add the appropriate class, otherwise just declare the this.isHalfValue, to complete the if statement
				this._isHalfValue
					? Helper.Style.AddClass(this._selfElem, Enum.RatingCssClass.IsHalf)
					: this._isHalfValue;

				// Update the variables with the new value
				this._configs.RatingValue = this._isHalfValue ? value : newValue;
				this._value = this._configs.RatingValue;

				// Call calbackfor OnSelect event
				if (this._onSelect !== null && triggerEvent) {
					this._onSelect(this._value);
				}
			}
		}
	}
}
