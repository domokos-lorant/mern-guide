import { Input } from "semantic-ui-react";

type Props = {
  productId: any;
};

function AddProductToCart(_props: Props): JSX.Element {
  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantity"
      value={1}
      action={{ color: "orange", content: "Add to ,Cart", icon: "plus cart" }}
    />
  );
}

export default AddProductToCart;
