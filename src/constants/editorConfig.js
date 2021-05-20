const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  placeholder: 'Content *',
  minHeight: 400,
  height: 500,
  disablePlugins: 'about, video, image, copy-format, file, resizer',
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  cleanHTML: {
    fillEmptyParagraph: false,
    removeEmptyElements: true,
    replaceNBSP: false
  },
  controls: {
    font: {
      list: {
        '': 'SamsungOne', // default
        SamsungSharp: 'SamsungSharp'
      }
    }
  }
};

export default config;
