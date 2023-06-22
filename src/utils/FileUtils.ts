// utils/FileUtils.ts
export const downloadFile = (url: string, filename: string) => {
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = filename;
    anchorElement.click();
  };
  