import { useRouter } from "next/router";
import { useCallback } from "react";
import { Accordion, Button, Header, Icon, Image, Label, List, Segment } from "semantic-ui-react";
import { IOrderPopulatedDocument } from "../../models/Order";
import formatDate from "../../utils/formatDate";
import { Routes } from "../../utils/routes";

type Props = {
  orders: IOrderPopulatedDocument[]
}

function AccountOrders({ orders }: Props): JSX.Element {
  const router = useRouter();
  const handleViewProducts = useCallback(
    () => router.push(Routes.Home),
    []);
  const mapOrdersToPanels = useCallback(
    (orders: IOrderPopulatedDocument[]) => {
      return orders.map(order => ({
        key: order._id,
        title: {
          content: <Label color="blue" content={formatDate(order.createdAt)} />
        },
        content: {
          content: (
            <>
              <List.Header as="h3">
                Total: ${order.total}
                <Label
                  content={order.email}
                  icon="mail"
                  basic
                  horizontal
                  style={{ marginLeft: "1em" }}
                />
              </List.Header>
              <List>
                {order.products.map(p => (
                  <List.Item>
                    <Image avatar src={p.product.mediaUrl} />
                    <List.Content>
                      <List.Header>{p.product.name}</List.Header>
                      <List.Description>
                        {p.quantity} x ${p.product.price}
                      </List.Description>
                    </List.Content>
                    <List.Content floated="right">
                      <Label tag color="red" size="tiny">
                        {p.product.sku}
                      </Label>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </>
          )
        }
      }));
    }, []);

  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
        Order history
      </Header>
      {orders.length === 0 ?
        (<Segment
          inverted
          tertiary
          color="grey"
          textAlign="center"
        >
          <Header icon>
            <Icon name="copy outline" />
            No past orders
          </Header>
          <div>
            <Button onClick={handleViewProducts} color="orange">
              View Products
            </Button>
          </div>
        </Segment>) : (
          <Accordion
            fluid
            styled
            exclusive={false}
            panels={mapOrdersToPanels(orders)}
          />
        )
      }
    </>
  );
}

export default AccountOrders;
