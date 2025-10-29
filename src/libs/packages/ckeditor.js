class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ default: reader.result });
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        })
    );
  }

  abort() {
    // Tidak perlu implementasi khusus untuk base64
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export const editorConfiguration = {
  extraPlugins: [MyCustomUploadAdapterPlugin],
  removePlugins: ["MediaEmbed"],
};
