interface ValidatorResponse {
    isValid: boolean;
    errorMessage: string;
}

const fileTypes = ['jpg', 'png', 'doc','jpeg', 'docx'];

async function validateFileSize(fileSize: number): Promise<ValidatorResponse> {
    const documentFileSizeValidator = (await import('../validator/documentFileSizeValidator')).default;

    const validator = new documentFileSizeValidator(fileSize);
    const isValid = validator.validateFileSize();

    return {
        isValid,
        errorMessage: isValid ? '' : validator.getErrorMessage()
    };
}

async function validateFileType(fileType: string): Promise<ValidatorResponse> {
    const fileTypeValidator = (await import('../validator/fileTypeValidators')).default;

    const validator = new fileTypeValidator(fileType, fileTypes);
    const isValid = validator.validateFileType();

    return {
        isValid,
        errorMessage: isValid ? '' : validator.getErrorMessage()
    };
}

export { validateFileSize, validateFileType };
