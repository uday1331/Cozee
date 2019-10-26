import React, { Component } from "react";
import "antd/dist/antd.css";

import { Form, Select, Button, Upload, Icon, Input, InputNumber } from "antd";

const { Option } = Select;

class Create extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    console.log(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
          {getFieldDecorator("display-image", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(
            <Upload
              name="logo"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
            >
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>

        <Form.Item label="Processing Images">
          {getFieldDecorator("processing-images", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(
            <Upload.Dragger
              name="files"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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

export default CreateProduct;
