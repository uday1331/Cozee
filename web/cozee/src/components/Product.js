import React from "react";
import { Card, Tag, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;

class Product extends React.Component {
  render() {
    const { product } = this.props;
    const title = () => {
      return (
        <Text>
          {product.title} &nbsp; <Tag>{product.category}</Tag>
        </Text>
      );
    };
    return (
      <Card
        hoverable
        style={{ width: 240, margin: "5px", maxHeight: 300 }}
        cover={
          //image is always 240*150
          <img
            alt={product.title}
            src={product.img}
            style={{
              height: "150px"
            }}
          />
        }
      >
        <Meta title={title()} description={product.description} />
        <Text>Price: {product.price}</Text>
      </Card>
    );
  }
}

export default Product;
