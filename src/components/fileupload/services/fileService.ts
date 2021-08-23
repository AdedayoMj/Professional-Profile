
import config from '../../../config/config';

interface UploadFileResponse {
    success: boolean;
    message: string;
}

class FileService {
    private file: File;
    private title: string;

    constructor(file: File, title: string) {
        this.file = file;
        this.title = title;
    }

    static getFileExtension(fileName: string): string {
        const fileNames: Array<string> = fileName.split('.');

        if (fileNames.length === 0) {
            return '';
        }

        return fileNames[fileNames.length - 1];
    }

    async uploadFile(): Promise<UploadFileResponse> {
  
        const uploadResponse = await fetch(`${config.server.url}api/sighsound/create`, {
            method: 'POST',
            body: this.getFormData()
        });

        const responseJson = await uploadResponse.json();

        if (responseJson.success === false) {
            return {
                success: false,
                message: responseJson.message
            };
        }
        
        return {
            success: true,
            message: 'Uploaded Successfully',
            
        };
        
    }

    private getFormData(): FormData {
        const formData = new FormData();
        formData.append('picture', this.file);
        formData.append('title', this.title);
        return formData;
    }
}

export default FileService;
