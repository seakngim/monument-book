import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Upload,
  message,
  Select,
  Tag,
  Table,
  Popconfirm,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
  FolderAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import UploadService from "../../redux/service/UploadService";
import BookService from "../../redux/service/BookService";
import { useSelector } from "react-redux";
import { setAllBook, setAllImport } from "../../redux/slices/BookSlice";
import { useDispatch } from "react-redux";
import { Column } from "@ant-design/plots";
import ColumnGroup from "antd/es/table/ColumnGroup";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ImportBook = (props) => {
  const { isbn, price, qty, vendor, setData } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [required, setRequired] = useState(true);
  const getAllBookService = () => {
    BookService.getAllBook(1, 500)
      .then((res) => {
        console.log("res", res);
        dispatch(setAllBook(res.data));
      })
      .catch((error) => {
        console.error("Error fetching all books:", error);
        // Handle the error as needed (e.g., show an error message to the user)
      });
  };
  const [formData, setFormData] = useState({
    id: "",
    isbn: "",
    qty: "",
    price: "",
    vendor: "",
  });

  const resAllBook = useSelector((state) => state.book.allBook);
  const rdata = useSelector((state) => state.book.bookImport);
  const [initialFormData, setInitialFormData] = useState({});
  const options = resAllBook.map((resitem) => ({
    label: resitem.title,
    value: resitem.id,
    emoji: "📚",
    desc: resitem.isbn,
  }));
  // get all import book
  const handlegetAllBook = () => {
    BookService.getImport(1, 50).then((res) => {
      dispatch(setAllImport(res.data));
    });
  };

  const dataSource = rdata.map((item) => ({
    key: item.id,
    name: item.name,
    book: item.book.title, // Assuming item.book is an object with a 'title' property
    price: item.price,
    qty: item.qty,
    date: item.date,
  }));

  // Function to handle edit button click
  const handleEdit = (record) => {
    console.log(record);
    setFormValue(record);
    setRequired(false);
  };

  const setFormValue = (record) => {
    BookService.getImportById(record.key).then((res) => {
      console.log(res);
      setFormData({
        id: res.data.id,
        isbn: res.data.book.id,
        qty: res.data.qty,
        price: res.data.price,
        vendor: res.data.name,
      });
    });
  };
  const onFinish = (values) => {
    // setData(values);
    console.log(values);
    // navigate("/list", { state: { previousPath: pathname } })
    const data = {
      qty: formData.qty,
      cost: formData.price,
      vendor: formData.vendor, 
    };
    // formData.qty && formData.price && formData.vendor != null ? setRequired(false): setRequired(true)
    console.log(formData, "formdata");
    if (formData.id) {
      BookService.updateInput(formData.id, formData.isbn, data).then(() => {
        handlegetAllBook();
        setFormData({
          id: "",
          isbn: "",
          bookId:"",
          qty: "",
          price: "",
          vendor: "",
        });
      });
    } else {
      BookService.importbook(data, formData.isbn).then(() => {
        handlegetAllBook();
        setFormData({
          id: "",
          isbn: "",
          bookId:"",
          qty: "",
          price: "",
          vendor: "",
        });
      });
    }
  };
  // Function to handle delete button click
  const handleDelete = (record) => {
    console.log(record);
    try {
      BookService.delImport(record.key).then((res) => {
        message.success("delete successful!");
        handlegetAllBook();
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      // Handle error as needed (e.g., show a message to the user)
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Book",
      dataIndex: "book",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "QTY",
      dataIndex: "qty",
    },
    {
      title: "DATE",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "date",
      render: (_, record) => (
        <Space size="middle">
          {dataSource.length >= 1 ? (
            <a onClick={() => handleEdit(record)}>
              <EditOutlined />
            </a>
          ) : null}
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record)}
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getAllBookService();
    handlegetAllBook();
  }, []);
  const checkFormDataChanges = () => {
    const requiredFields = ['qty', 'price', 'vendor']; // Add the names of required fields here
    for (const field of requiredFields) {
      if (!formData[field]) {
        setRequired(true);
        return;
      }
    }
    setRequired(false);
  }
  
  useEffect(() => {
    checkFormDataChanges();
  }, [formData]);

  return (
    <>
      <div className="shadow-lg grid grid-cols-3">
        <div className="">
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={formData}
            className="rounded-lg p-5 pt-2 pb-10"
          >
            <Divider orientation="left">Import Book </Divider>
            <Row gutter={24}>
              <Col span={24} className="lg:pr-20">
                <Form.Item
                  label="ISBN"
                  name="isbn"
                  rules={[{ required: required }]}
                >
                  <Select
                    size="large"
                    mode="single" // Change mode to "single"
                    placeholder="Please select ISBN"
                    style={{ flex: 1 }}
                    showSearch={true}
                    value={formData.isbn}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(value, option) => {
                      const selectedBook = resAllBook.find(
                        (book) => book.id === value
                      );
                      if (selectedBook) {
                        setFormData({
                          ...formData,
                          isbn: value,
                        });
                      }
                    }}
                  >
                    {resAllBook.map((book) => (
                
                      <Select.Option key={book.id} value={book.id}>
                        {book.isbn}
                      </Select.Option>
                    ))}
                  </Select>
                  <p
                    onChange={(e) => {
                      setFormData({ ...formData, isbn: e.target.value });
                      // setRequired(e.target.value.trim() === "");
                    }}
                  ></p>
                </Form.Item>

                <Form.Item
                  label="Quantity"
                  name="qty"
                  rules={[{ required: required }]}
                >
                  <Input
                    size="large"
                    value={formData.qty}
                    onChange={(e) => {
                      setFormData({ ...formData, qty: e.target.value });
                      // setRequired(e.target.value.trim() === "");
                    }}
                  />
                  <p
                    onChange={(e) => {
                      setFormData({ ...formData, qty: e.target.value });
                      // setRequired(e.target.value.trim() === "");
                    }}
                  ></p>
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: required }]}
                >
                  <Input
                    size="large"
                    value={formData.price}
                    onChange={(e) => {
                      setFormData({ ...formData, price: e.target.value });
                      // setRequired(e.target.value.trim() === "");
                    }}
                  />
                  <p
                    onChange={(e) => {
                      setFormData({ ...formData, price: e.target.value });
                      // setRequired(e.target.value.trim() === "");
                    }}
                  ></p>
                </Form.Item>
                <Form.Item
                  label="Preferred Vendor"
                  name="vendor"
                  rules={[{ required: required }]}
                >
                  <Input
                    size="large"
                    value={formData.vendor}
                    onChange={(e) => {
                      setFormData({ ...formData, vendor: e.target.value });
                      // setRequired(e.target.value.trim() === "");
                    }}
                  />
                  <p
                    onChange={(e) => {
                      setFormData({ ...formData, vendor: e.target.value });
                      // setRequired(e.target.value.trim() === "");
                    }}
                  ></p>
                </Form.Item>
                <Space className="mt-4">
                  <Button
                    icon={<CloseOutlined />}
                    size="large"
                    block
                    danger
                    // onClick={() =>
                    //   navigate("dashboard", {
                    //     state: { previousPath: pathname },
                    //   })
                    // }
                  >
                    Cancel
                  </Button>
                  <Button
                    icon={<FolderAddOutlined />}
                    size="large"
                    block
                    style={{
                      border: 0,
                      backgroundColor: "#3A53A4",
                      color: "#fff",
                    }}
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="col-span-2">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default ImportBook;
