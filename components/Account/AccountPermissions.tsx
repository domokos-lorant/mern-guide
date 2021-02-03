import axios from "axios";
import { IUser } from "../../models/User";
import baseUrl from "../../utils/baseUrl";
import { ApiRoutes } from "../../utils/routes";
import cookie from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox, Header, Icon, Table } from "semantic-ui-react";

type Props = {
  currentUserId: any
}

function AccountPermissions({ currentUserId }: Props): JSX.Element {
  const [users, setUsers] = useState<IUser[]>([]);
  const token = cookie.get("token");

  useEffect(() => {
    const getUsers = async () => {

      if (!token) {
        setUsers([]);
      }

      const url = `${baseUrl}/${ApiRoutes.Users}`;
      const payload = { headers: { Authorization: token } };
      const response = await axios.get<IUser[]>(url, payload);
      setUsers(response.data);
    };
    getUsers();
  }, []);

  return (
    <div style={{ margin: "2em 0" }}>
      <Header as="h2">
        <Icon name="settings" />
        User Permissions
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => (
            <UserPermission token={token} key={user._id} {...user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function UserPermission(
  { _id, name, email, createdAt, updatedAt, role, token }: IUser & { token?: string })
  : JSX.Element {
  const [admin, setAdmin] = useState(role === "admin");
  const handleChangePermission = useCallback(
    () => setAdmin(prevState => !prevState)
    , []);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    updatePermission(token, _id, admin);
  }, [_id, token, admin]);

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox checked={admin} toggle onChange={handleChangePermission} />
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.HeaderCell>{email}</Table.HeaderCell>
      <Table.HeaderCell>{createdAt}</Table.HeaderCell>
      <Table.HeaderCell>{updatedAt}</Table.HeaderCell>
      <Table.HeaderCell>{admin ? "admin" : "user"}</Table.HeaderCell>
    </Table.Row>
  );
}

const updatePermission = async (token: string | undefined, userId: any, isAdmin: boolean): Promise<void> => {
  const url = `${baseUrl}/${ApiRoutes.Account}`;
  const payload = { _id: userId, role: isAdmin ? "admin" : "user" };
  await axios.put(url, payload, { headers: { Authorization: token } });
};

export default AccountPermissions;
