import { Box, Text, Flex, Button, Input, createStandaloneToast, Link } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { validateFileSize, validateFileType } from './services/filevalidatorServices';
import FileService from './services/fileService';
import { Container, Form, FormGroup, Label } from 'reactstrap';
import { error } from 'console';
import ErrorText from '../errortext';
import SuccessText from '../successtext';
import Header from '../header';

function FileUpload() {
    const [isFileTypesModalOpen, setIsFilesTypeModalOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [saving, setSaving] = useState<boolean>(false);
    const [uploadFormError, setUploadFormError] = useState<string>('');

    const handleFileUpload = async (element: HTMLInputElement) => {
        const file = element.files;
        if (!file) {
            return;
        }
        if (title == '') {
            setUploadFormError('Title field is empty');
            return;
        }

        const validFileSize = await validateFileSize(file[0].size);
        const validFileType = await validateFileType(FileService.getFileExtension(file[0].name));

        if (!validFileSize.isValid) {
            setUploadFormError(validFileSize.errorMessage);

            return;
        }

        if (!validFileType.isValid) {
            setUploadFormError(validFileType.errorMessage);
            return;
        }

        if (uploadFormError && validFileSize.isValid) {
            setUploadFormError('');
            setFile(file[0]);
        }
    };
    const handleSubmit = async () => {
        if (title == '') {
            setUploadFormError('Title field is empty');
            return;
        }
        if (!file) {
            setUploadFormError('File not selected');
            return;
        }
        const fileService = new FileService(file, title);
        const fileUploadResponse = await fileService.uploadFile();

        // element.value = '';

        const toast = createStandaloneToast();

        toast({
            title: fileUploadResponse.success ? 'File Uploaded' : 'Upload Failed',
            description: fileUploadResponse.message,
            status: fileUploadResponse.success ? 'success' : 'error',
            duration: 3000,
            isClosable: true
        });
    };

    return (
        <Container className="mt-5 mb-5">
            <Header
                image="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
                title="Add Pictures"
                name=""
            />
            {/* <ErrorText error={error} /> */}
            <Form>
                <FormGroup>
                    <Label for="picture">Picture</Label>
                    <Input
                        type="file"
                        name="picture"
                        // value={picture}
                        id="year"
                        accept=".png, .jpg, .jpeg"
                        placeholder="Picture"
                        disabled={saving}
                        // onChange={handleImageChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        value={title}
                        id="title"
                        placeholder="Enter a title"
                        disabled={saving}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </FormGroup>

                <FormGroup>{/* <SuccessText success={success} /> */}</FormGroup>
                <FormGroup>
                    <Button
                        style={{ backgroundColor: '#222454' }}
                        block
                        // onClick={() => {
                        //     if (_id !== '') {
                        //         // editSightSound();
                        //     } else {
                        //         createSightSound();
                        //     }
                        // }}
                        disabled={saving}
                    >
                        <i className="fas fa-save mr-1"></i>
                        Upload
                    </Button>
                    {/* {_id !== '' && (
                        <Button block color="success" tag={Link} to={`/sight`}>
                            Go to Picture post!
                        </Button>
                    )} */}
                </FormGroup>
            </Form>

            {/* <ErrorText error={error} /> */}
        </Container>
        // <Box width="75%" m="150px auto" padding="2" shadow="base">
        //     <Flex direction="column" alignItems="center" mb="5" mt="50px">
        //         <Text fontSize="2xl" mb="4">
        //             Upload a Picture
        //         </Text>
        //         <Button size="sm" colorScheme="blue" onClick={() => setIsFilesTypeModalOpen(true)}>
        //             Accepted File Types
        //         </Button>
        //         {uploadFormError && (
        //             <Text mt="5" color="red">
        //                 {uploadFormError}
        //             </Text>
        //         )}
        //         <Box mt="10" ml="24">
        //             <FormGroup>
        //                 <Label for="title">Title</Label>
        //                 <Input
        //                     type="text"
        //                     name="title"
        //                     value={title}
        //                     id="title"
        //                     placeholder="Enter a title"
        //                     disabled={saving}
        //                     onChange={(event) => {
        //                         setTitle(event.target.value);
        //                     }}
        //                 />
        //             </FormGroup>
        //             {/* <Input type="file" variant="unstyled" onChange={(e: SyntheticEvent) => handleFileUpload(e.currentTarget as HTMLInputElement)} /> */}
        //         </Box>
        //         <Box mt="10" ml="24">
        //             <Input type="file" variant="unstyled" onChange={(e: SyntheticEvent) => handleFileUpload(e.currentTarget as HTMLInputElement)} />
        //         </Box>
        //         <Button mt="10" size="lg" colorScheme="red" onClick={() => handleSubmit()}>
        //             <i className="fas fa-save mr-1"></i> Upload
        //         </Button>
        //     </Flex>

        // </Box>
    );
}
export default FileUpload;
