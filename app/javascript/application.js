// Configure your import map in config/importmap.rb.
// Read more: https://github.com/rails/importmap-rails
import { DirectUpload } from '@rails/activestorage'
import * as FilePond from 'filepond'

// Get the input element
const input = document.querySelector('.filepond')
const directUploadUrl = input.dataset.directUploadUrl

// Initialize FilePond
FilePond.create(input)

// Set FilePond settings
FilePond.setOptions({
  server: {
    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
      const uploader = new DirectUpload(file, directUploadUrl, {
        directUploadWillStoreFileWithXHR: (request) => {
          request.upload.addEventListener(
            'progress',
            event => progress(event.lengthComputable, event.loaded, event.total)
          )
        }
      })
      uploader.create((errorResponse, blob) => {
        if (errorResponse) {
          error(`Something went wrong: ${errorResponse}`)
        } else {
          const hiddenField = document.createElement('input')
          hiddenField.setAttribute('type', 'hidden')
          hiddenField.setAttribute('value', blob.signed_id)
          hiddenField.name = input.name
          document.querySelector('form').appendChild(hiddenField)
          load(blob.signed_id)
        }
      })

      return {
        abort: () => abort()
      }
    },
    fetch: {
      url: './filepond/fetch',
      method: 'POST',
      onload: (response) => {
        console.log(response)
        return response
      },
      ondata: (response) => {
        console.log(response)
        return response
      }
    },
    revert: {
      url: './filepond/remove'
    },
    headers: {
      'X-CSRF-Token': document.head.querySelector("[name='csrf-token']").content
    }
  }
})
