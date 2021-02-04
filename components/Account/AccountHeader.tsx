import { Header, Icon, Label, Segment } from "semantic-ui-react";
import { IUser } from "../../models/User";
import formatDate from "../../utils/formatDate";

type Props = IUser & {
}

function AccountHeader({ role, email, name, createdAt }: Props): JSX.Element {
  return (
    <Segment secondary inverted color="violet">
      <Label
        color="teal"
        ribbon
        size="large"
        icon="privacy"
        style={{ textTransform: "capitalize" }}
        content={role}
      />
      <Header
        inverted
        textAlign="center"
        as="h1"
        icon
      >
        <Icon name="user" />
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined {formatDate(createdAt)}</Header.Subheader>
      </Header>
    </Segment>
  );
}

export default AccountHeader;
