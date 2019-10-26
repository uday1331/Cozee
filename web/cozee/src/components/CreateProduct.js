import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { Form, Select, Button, Upload, Icon, Input } from "antd";

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
        <Form.Item label="Title" {...formItemLayout}>
          <Input placeholder="Product Title" />
        </Form.Item>
        <Form.Item label="Description" {...formItemLayout}>
          <Input placeholder="Describe your product" />
        </Form.Item>
        <Form.Item label="Categories">
          {getFieldDecorator("select-multiple", {
            rules: [
              {
                required: true,
                message: "Please select your favourite colors!",
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
          {getFieldDecorator("upload", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile,
            rules: [{ required: true }]
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>

        <Form.Item label="Processing Images">
          {getFieldDecorator("dragger", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile,
            rules: [{ required: true }]
          })(
            <Upload.Dragger name="files" action="/upload.do">
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
