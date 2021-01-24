import { useCallback, useState } from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Image,
  Input,
  Message,
  TextArea,
} from "semantic-ui-react";

type State = {
  name: string;
  price: number;
  media: File | null;
  description: string;
};

const defaultState: State = {
  name: "",
  price: 0.0,
  media: null,
  description: "",
};

function CreateProduct(): JSX.Element {
  const [product, setProduct] = useState(defaultState);
  const [mediaPreview, setMediaPreview] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = event.target;

      if (name === "media") {
        const file = files && files[0];
        setProduct((prev) => ({ ...prev, media: file }));
        setMediaPreview(window.URL.createObjectURL(file));
      } else {
        setProduct((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      console.log(product);
      setProduct(defaultState);
      setSuccess(true);
    },
    [product]
  );

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success"
          content="Your product has been posted!"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            value={product.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="price"
            placeholder="Price"
            value={product.price}
            min="0.00"
            step="0.01"
            type="number"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;