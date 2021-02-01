import { Item, Label } from "semantic-ui-react";
import { IProduct } from "../../models/Product";
import { IUser } from "../../models/User";
import AddProductToCart from "./AddProductToCart";

type Props = IProduct & { user?: IUser };

function ProductSummary({
  name,
  mediaUrl,
  _id,
  price,
  sku,
  user
}: Props): JSX.Element {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart productId={_id} user={user} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
