import { Button, Header } from "semantic-ui-react";
import { IProduct } from "../../models/Product";

function ProductAttributes({ description }: IProduct): JSX.Element {
  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
      />
    </>
  );
}

export default ProductAttributes;
