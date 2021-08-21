import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import IPageProps from '../interfaces/pages';
import UserContext from '../context/user';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import logging from '../config/loggin';
import LoadingComponent from '../components/loading_components';
import { Container, Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ErrorText from '../components/errortext';
import Header from '../components/header';
import SuccessText from '../components/successtext';
import ISight from '../interfaces/sight';

import FileUpload from '../components/fileupload';
import { validateFileSize, validateFileType } from '../components/fileupload/services/filevalidatorServices';
import FileService from '../components/fileupload/services/fileService';
import { createStandaloneToast } from '@chakra-ui/react';

const SightEditPage: React.FunctionComponent<IPageProps & RouteComponentProps<any>> = (props) => {
    const [_id, setId] = useState<string>('');
    const [isFileTypesModalOpen, setIsFilesTypeModalOpen] = useState<boolean>(false);
    const [picture, setPicture] = useState<File>();
    const [title, setTitle] = useState<string>('');
    const acceptedFileTypes: string[] = ['jpeg', 'png', 'jpg', 'gif'];
    const [saving, setSaving] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { user } = useContext(UserContext).userState;
    useEffect(() => {
        setLoading(false);
        // let articleID = props.match.params.articleID;

        // if (articleID) {
        //     setId(articleID);
        //     // getArticle(articleID);
        // } else {
        //     setLoading(false);
        // }

        // eslint-disable-next-line
    }, []);
    const handleFileUpload = async (element: HTMLInputElement) => {
        const file = element.files;
        if (!file) {
            return;
        }

        const validFileSize = await validateFileSize(file[0].size);
        const validFileType = await validateFileType(FileService.getFileExtension(file[0].name));

        if (!validFileSize.isValid) {
            setError(validFileSize.errorMessage);

            return;
        }

        if (!validFileType.isValid) {
            setError(validFileType.errorMessage);
            return;
        }

        if (error && validFileSize.isValid) {
            setError('');
            setPicture(file[0]);
        }
    };
    const handleSubmit = async () => {
        console.log(picture);

        if (title == '') {
            setError('Title field is empty');
            return;
        }
        if (!picture) {
            setError('Picture not selected');
            return;
        }

        if (error && picture) {
            setError('');
        }
        const fileService = new FileService(picture, title);
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

    if (loading) return <LoadingComponent />;

    return (
        <Container fluid className="p-0">
            <Header
                image="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
                title="Add Pictures"
                name=""
            />
            <Container className="mt-5 mb-5">
                <ErrorText error={error} />
                <Form style={{ marginTop: '40px' }}>
                    <Button onClick={() => setIsFilesTypeModalOpen(true)} style={{ backgroundColor: 'green', marginBottom: '20px' }}>
                        Accepted File Types
                    </Button>
                    <FormGroup>
                        <Label for="picture">Picture</Label>
                        <Input
                            type="file"
                            name="picture"
                            id="year"
                            accept=".png, .jpg, .jpeg, .gif"
                            placeholder="Picture"
                            disabled={saving}
                            onChange={(e: SyntheticEvent) => handleFileUpload(e.currentTarget as HTMLInputElement)}
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

                    <FormGroup>
                        <SuccessText success={success} />
                    </FormGroup>
                    <FormGroup>
                        <Button style={{ backgroundColor: '#222454' }} block disabled={saving} onClick={handleSubmit}>
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
                <Modal isOpen={isFileTypesModalOpen}>
                    <ModalBody>{acceptedFileTypes.join(', ')}</ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => {
                                setIsFilesTypeModalOpen(false);
                            }}
                        >
                            Ok
                        </Button>
                    </ModalFooter>
                </Modal>

                <ErrorText error={error} />
            </Container>
        </Container>
    );
};
export default withRouter(SightEditPage);
