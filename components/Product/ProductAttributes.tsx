import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { IProduct } from "../../models/Product";
import { IUser } from "../../models/User";
import baseUrl from "../../utils/baseUrl";

type Props = IProduct & { user?: IUser };

function ProductAttributes({ description, _id, user }: Props): JSX.Element {
  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const handleDelete = useCallback(() => setModal(true), [setModal]);
  const handleCancel = useCallback(() => setModal(false), [setModal]);
  const handleConfirmDelete = useCallback(async () => {
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/");
  }, []);

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      {isRootOrAdmin &&
        <>
          <Button
            icon="trash alternate outline"
            color="red"
            content="Delete Product"
            onClick={handleDelete}
          />
          <Modal open={modal} dimmer="blurring">
            <Modal.Header>Confirm Delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure you wan to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" onClick={handleCancel} />
              <Button
                negative
                icon="trash"
                labelPosition="right"
                content="Delete"
                onClick={handleConfirmDelete}
              />
            </Modal.Actions>
          </Modal>
        </>}
    </>
  );
}

export default ProductAttributes;
