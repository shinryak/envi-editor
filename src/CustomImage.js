/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import isPromise from 'is-promise';

export default class CustomImage extends Plugin {
	init() {
		const editor = this.editor;
		const config = editor.config._config.customImage || {};
		editor.ui.componentFactory.add( 'customImage', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert image',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', async () => {
				let imageUrl = '';
				const handle = config.chooseImage();
				if ( typeof ( handle ) == 'string' ) {
					imageUrl = handle;
				}
				else if ( isPromise( handle ) ) {
					imageUrl = await handle;
				}
				editor.model.change( writer => {
					if ( imageUrl ) {
						const imageElement = writer.createElement( 'image', {
							src: imageUrl
						} );

						// Insert the image in the current selection location.
						editor.model.insertContent( imageElement, editor.model.document.selection );
					}
				} );
			} );

			return view;
		} );
	}
}
