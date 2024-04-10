import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Form, Input, Row, Space, Upload, message, Table, Tag } from "antd";
import { LoadingOutlined, PlusOutlined, CloseOutlined, FolderAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import CategoryService from "../../redux/service/CategoryService";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategory } from "../../redux/slices/CategorySlice";
import { setAllAuthor } from "../../redux/slices/AuthorSlice";
import AuthorServises from "../../redux/service/AuthorService";
import UploadService from "../../redux/service/UploadService";

const CreateNewAuthorComponent = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm(); // Create a form instance
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [titleform, settitleform] = useState("Create New Author");
    const [required, setRequired] = useState(true);
    const [imageUrl, setImageUrl] = useState();

    // res data
    const resauthor = useSelector((state) => state.author.allAuthors);

    // Form data state
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        quote: '',
        image: ''
    });
    console.log(formData)
    // Function to set form values for editing
    const setFormValues = (record) => {
        setFormData({
            id: record.id,
            name: record.name,
            description: record.description,
            quote: record.quote,
            image: record.image // Make sure to include the image field here if needed
        });
        console.log("record", record);
    };

    // Fetch categories and authors on component mount


    // Fetch all categories
    const handleGetCategory = () => {
        CategoryService.getAllCategory().then((res) => {
            dispatch(setAllCategory(res.data));
        });
    };

    // Fetch all authors
    const handleGetAuthor = () => {
        AuthorServises.getAllAuthor(1, currentPageSize).then((res) => {
            setCurrentPageSize(res.totalElements);
            dispatch(setAllAuthor(res.body.data));
            console.log("auth", res);
        });
    };

    // Function to handle form submission
    const onFinish = (values) => {
        const data = {
            name: values.name,
            quote: values.quote,
            description: values.description,
            image: imageUrl,
        };
        console.log("value", formData);

        // Check if it's an edit or add operation
        if (formData.id) {
            // Edit operation
            AuthorServises.edit(formData.id, formData).then((res) => {
                console.log(res, "res");
                message.success("Author updated successfully");
                form.resetFields(); // Reset form fields
                setImageUrl(""); // Clear image URL
                setFormData({
                    id: '',
                    name: '',
                    description: '',
                    quote: '',
                    image: ''
                }); // Reset form data state
                settitleform("Create New Author"); // Change title form back to default
                handleGetAuthor();
            }).catch((error) => {
                message.error("Failed to update author");
            });
        } else {
            // Add operation
            AuthorServises.addAuthor(formData).then((res) => {
                console.log(res, "res");
                message.success("Author added successfully");
                form.resetFields(); // Reset form fields
                setImageUrl(""); // Clear image URL
                setFormData({
                    id: '',
                    name: '',
                    description: '',
                    quote: '',
                    image: ''
                }); // Reset form data state
                settitleform("Create Item"); // Change title form back to default
                handleGetAuthor();
            }).catch((error) => {
                message.error("Failed to add author");
            });
        }
    };
    // Function to handle edit button click
    const handleEdit = (record) => {
        setFormValues(record);
        settitleform("Edit Item");
        setImageUrl(record.image)
        setRequired(false)
    };

    // Function to handle delete button click
    const handleDelete = (record) => {
        try {
            // Implement logic to delete the entry with the given id
            // NewsServises.deleteNews(record.id);
            // handleGetAllNews();
        } catch (error) {
            console.error("Error deleting entry:", error);
            // Handle error as needed (e.g., show a message to the user)
        }
    };
    // State and function for image upload
    const [loading, setLoading] = useState(false);

    const handleChange = async (info) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const uploadButton = (
        <button className="w-40 h-40  border-dashed border-2 rounded-md" type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    function CustomDescription({ description }) {
        const style = {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
            maxHeight: '3em',
            whiteSpace: 'pre-line'
        };

        return (
            <div style={style}>
                {description}
            </div>
        );
    }

    // Table columns definition
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (text) => <a>{text}</a>,
            width: '7%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
        },
        {
            title: 'Quote',
            dataIndex: 'quote',
            key: 'quote',
            width: '20%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
            render: (_, record) => <CustomDescription description={record.description} />,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '15%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}><EditOutlined /></a>
                    <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];

    // Data for the table
    const data = resauthor && resauthor.map((item, index) => ({
        id: item.id, // Assuming you want the id as the key
        no: index + 1,
        name: item.name,
        quote: item.quote,
        description: item.description,
        date: item.date, // You can set this value accordingly
        image: item.image
    }));
    useEffect(() => {
        handleGetCategory();
        handleGetAuthor();
    }, []);
    useEffect(() => {
        handleGetAuthor();
    }, [currentPageSize])
    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                // initialValues={formData}
                className="shadow-lg rounded-lg p-5 pt-2 pb-10"
            >
                <Divider orientation="left">{titleform}</Divider>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="flex items-start justify-center">
                        <Upload
                            className="w-52"
                            customRequest={async ({ file, onSuccess, onError }) => {
                                try {
                                    const imageUrl = await UploadService.upload(file);
                                    onSuccess();
                                    console.log("Image URL:", imageUrl);
                                    setImageUrl(imageUrl.body.data);
                                    setFormData({ ...formData, image: imageUrl.body.data });
                                } catch (error) {
                                    onError(error);
                                }
                            }}
                            onChange={handleChange}
                        >
                            {imageUrl ? (
                                <img
                                    className="w-52 rounded-md"
                                    src={imageUrl}
                                    alt="bookCover"
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </div>
                    <div>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: required }]}
                        >
                            <Input
                                size="large"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({ ...formData, name: e.target.value })
                                    setRequired(e.target.value.trim() === "");
                                }}
                            />
                            <p onChange={(e) => setFormData({ ...formData, name: e.target.value })}></p>
                        </Form.Item>
                        <Form.Item
                            label="Quote"
                            name="quote"
                            rules={[{ required: required }]}
                        >
                            <Input
                                size="large"
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                            />
                            <p onChange={(e) => setFormData({ ...formData, quote: e.target.value })}></p>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: required }]}
                        >
                            <TextArea
                                showCount
                                maxLength={2999}
                                placeholder="disable resize"
                                rows={8}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <p onChange={(e) => setFormData({ ...formData, description: e.target.value })}></p>
                        </Form.Item>
                        <Space className="mt-5">
                            <Button size="large" icon={<CloseOutlined />} block danger onClick={() => navigate("/dashboard", { state: { previousPath: pathname } })}>Cancel</Button>
                            <Button size="large" icon={<FolderAddOutlined />} block style={{ border: 0, backgroundColor: "#3A53A4", color: "#fff" }} htmlType="submit">Save</Button>
                        </Space>
                    </div>
                </div>
            </Form>
            <Table
                className="shadow-lg mt-10"
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 10,
                }}
                scroll={{
                    y: 240,
                }}
            />
        </>
    )
}

export default CreateNewAuthorComponent;
