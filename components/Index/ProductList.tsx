import { Card, StrictCardProps } from "semantic-ui-react";
import { IProduct } from "../../models/Product";

type Props = {
  products: IProduct[];
};

function ProductList({ products }: Props): JSX.Element {
  return (
    <Card.Group
      items={mapProductsToItems(products)}
      itemsPerRow="3"
      centered
      stackable
    />
  );
}

function mapProductsToItems(products: IProduct[]): StrictCardProps[] {
  return products.map((product) => ({
    header: product.name,
    image: product.mediaUrl,
    color: "teal",
    fluid: true,
    meta: `$${product.price}`,
    childKey: product._id,
    href: `/product?_id=${product._id}`,
  }));
}

export default ProductList;
