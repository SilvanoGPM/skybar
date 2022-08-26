declare module 'use-file-upload' {
  type FileUpload = {
    source: string;
    name: string;
    size: number;
    file: File;
  };

  type Callback = (file: FileUpload) => void;

  const useFileUpload: () => [
    FileUpload,
    ({ accept: string, multiple: boolean }, callback: Callback) => void,
  ];
}

interface Paginated<T> {
  content: T[];
  totalElements: number;
}
