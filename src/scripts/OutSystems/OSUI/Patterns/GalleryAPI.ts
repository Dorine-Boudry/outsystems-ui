// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OutSystems.OSUI.Patterns.GalleryAPI {
	const _galleryMap = new Map<string, OSUIFramework.Patterns.Gallery.IGallery>(); //gallery.uniqueId -> Gallery obj

	/**
	 * Function that will change the property of a given gallery.
	 *
	 * @export
	 * @param {string} galleryId ID of the gallery where the property will be changed.
	 * @param {string} propertyName Property name that will be updated
	 * @param {*} propertyValue Value that will be set to the property
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
	export function ChangeProperty(galleryId: string, propertyName: string, propertyValue: any): void {
		const gallery = GetGalleryById(galleryId);

		gallery.changeProperty(propertyName, propertyValue);
	}
	/**
	 * Create the new gallery instance and add it to the galleryMap
	 *
	 * @export
	 * @param {string} galleryId ID of the Gallery where the instance will be created.
	 * @param {string} configs configurations for the Gallery in JSON format.
	 * @return {*}  {OSUIFramework.Patterns.IGallery}
	 */
	export function Create(galleryId: string, configs: string): OSUIFramework.Patterns.Gallery.IGallery {
		if (_galleryMap.has(galleryId)) {
			throw new Error(`There is already a gallery registered under id: ${galleryId}`);
		}

		const _newGallery = new OSUIFramework.Patterns.Gallery.Gallery(galleryId, JSON.parse(configs));

		_galleryMap.set(galleryId, _newGallery);

		return _newGallery;
	}

	/**
	 * Fucntion that will return the Map with all the gallery instances at the page
	 *
	 * @export
	 * @return {*}  {Map<string, OSUIFramework.Patterns.IGallery>}
	 */
	export function GetAllGalleries(): Array<string> {
		return Array.from(_galleryMap.keys());
	}

	/**
	 * Function that gets the instance of gallery, by a given ID.
	 *
	 * @export
	 * @param {string} galleryId ID of the Gallery that will be looked for.
	 * @return {*}  {OSUIFramework.Patterns.IGallery}
	 */
	export function GetGalleryById(galleryId: string): OSUIFramework.Patterns.Gallery.IGallery {
		let gallery: OSUIFramework.Patterns.Gallery.IGallery;

		//widgetId is the UniqueId
		if (_galleryMap.has(galleryId)) {
			gallery = _galleryMap.get(galleryId);
		} else {
			//Search for WidgetId
			for (const p of _galleryMap.values()) {
				if (p.equalsToID(galleryId)) {
					gallery = p;
					break;
				}
			}
		}

		if (gallery === undefined) {
			throw new Error(`Gallery id:${galleryId} not found`);
		}

		return gallery;
	}

	/**
	 * Function that will initialize the pattern instance.
	 *
	 * @export
	 * @param {string} galleryId ID of the Gallery that will be initialized.
	 * @return {*}  {OSUIFramework.Patterns.GalleryIGallery}
	 */
	export function Initialize(galleryId: string): OSUIFramework.Patterns.Gallery.IGallery {
		const gallery = GetGalleryById(galleryId);

		gallery.build();

		return gallery;
	}
}