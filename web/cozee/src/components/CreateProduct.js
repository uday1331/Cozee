import React, { Component } from "react";
import "antd/dist/antd.css";
import { FirebaseDB } from "../constants/firebase";
import { connect } from "react-redux";
import {uploadFile, uploadProduct} from "../store/actions/products";

import { Form, Select, Button, Upload, Icon, Input, InputNumber, message } from "antd";

const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading:false
    };
  }

handleChange = info => {
    if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                imageUrl,
                loading: false,
            }),
        );
    }
};
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.uploadFile(this.state.imageUrl, values);
            }
        });
    };

  render() {
    const { getFieldDecorator } = this.props.form;
      const uploadButton = (
          <div>
              <Icon type={this.state.loading ? 'loading' : 'upload'} />
              <div className="ant-upload-text">Upload</div>
          </div>
      );
      const { imageUrl } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Title">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input your name"
              }
            ]
          })(<Input placeholder="Please input your name" />)}
        </Form.Item>
        <Form.Item label="Price">
          {getFieldDecorator("price", {
            rules: [
              {
                message: "Enter product price",
                required: true
              }
            ]
          })(<InputNumber placeholder="Price" />)}
        </Form.Item>
          <Form.Item label="Company">
              {getFieldDecorator("company", {
                  rules: [
                      {
                          required: false,
                          message: "Please input your name"
                      }
                  ],
                  initialValue:'Idea'
              })(<Input placeholder="Idea"/>)}
          </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator("description", {
            rules: [
              {
                message: "Please input your name"
              }
            ]
          })(<Input placeholder="Describe your product" />)}
        </Form.Item>
        <Form.Item label="Categories">
          {getFieldDecorator("categories", {
            rules: [
              {
                required: true,
                message: "Please select categories for your product",
                type: "array"
              }
            ]
          })(
            <Select
              mode="multiple"
              placeholder="Please select categories for your product"
            >
              <Option value="Living">Living</Option>
              <Option value="Dining">Dining</Option>
              <Option value="Bedroom">Bedroom</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Display Image">
          {getFieldDecorator("displayImage", {
          })(
              <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
              >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
          )}
        </Form.Item>

        <Form.Item label="Processing Images">
          {getFieldDecorator("processingImages", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(
            <Upload.Dragger
              name="files"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const CreateProduct = Form.create()(Create);
const mapStateToProps = state => {
  return {
    ...state
  };
};
export default connect(
  mapStateToProps,
  { uploadFile }
)(CreateProduct);
