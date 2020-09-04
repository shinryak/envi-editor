CKEditor 5 custom build for NUXT
========================================

## Documentation

Added a custom image plugin that you can access component

See:

* [Installation](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installation.html) for how to install this package and what it contains.
* [Basic API](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/basic-api.html) for how to create an editor and interact with it.
* [Configuration](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html) for how to configure the editor.
* [Creating custom builds](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html) for how to customize the build (configure and rebuild the editor bundle).

## Quick start

First, install the build from npm:

```bash
npm install --save @shinryak/envi-editor
```

And use it in your website:

```html
<template>
  <div>
    <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" @input="handleInputEvent" />
    <b-modal ref="selectImage" hide-footer @hidden="imageSelected=true">
      <template v-slot:modal-title>
        Select
      </template>
      <div class="d-block text-center">
        <b-form-input
          id="name-input"
          v-model="imageUrl"
          required
        />
      </div>
      <b-button class="mt-3" variant="primary" @click="$refs['selectImage'].hide()">
        Finish
      </b-button>
    </b-modal>
  </div>
</template>

<script>
let ClassicEditor, CKEditor
// this use for nuxt ssr, remove the conditional if using spa mode
if (process.client) {
  ClassicEditor = require('@shinryak/envi-editor')
  CKEditor = require('@ckeditor/ckeditor5-vue')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}

export default {
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imageUrl: '',
      imageSelected: false,
      editor: ClassicEditor,
      editorData: this.value,
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'customImage',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
          ]
        },
        customImage: {
          chooseImage: async () => {
            this.imageUrl = ''
            this.imageSelected = false
            // eslint-disable-next-line dot-notation
            this.$refs['selectImage'].show()
            const selectedImageSrc = new Promise((resolve) => {
              const watcher = this.$watch('imageSelected', (newVal) => {
                resolve(this.imageUrl)
                window.console.log(this.imageUrl)
                watcher() // stop watch;
              })
            })
            return await selectedImageSrc
          }
        },
        image: {
          toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight', 'imageStyle:alignCenter', 'imageStyle:side'],
          styles: [
            'full',
            'side',
            'alignLeft',
            'alignRight',
            'alignCenter'
          ]
        }
        // ...
      }
    }
  },
  methods: {
    handleInputEvent () {
      this.$emit('input', this.editorData)
    }
  }
}
</script>
```
## License

Licensed under the terms of [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html). For full details about the license, please check the `LICENSE.md` file or [https://ckeditor.com/legal/ckeditor-oss-license](https://ckeditor.com/legal/ckeditor-oss-license).
