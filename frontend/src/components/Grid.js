import React from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

const Table = styled.table`
  width: 100%;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 900px;
  margin: 20px auto;
  word-break: break-all;
`;

const Thead = styled.thead``;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display:none"}
  }
`;

const Tbody = styled.tbody``;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display:none"}
  }
`;
const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, index) => {
          return (
            <Tr key={index}>
              <Td width="30%">{item.nome}</Td>
              <Td width="30%">{item.email}</Td>
              <Td width="20%" onlyWeb>
                {item.fone}
              </Td>
              <Td alignCenter width="5%">
                <FaEdit
                  onClick={() => {
                    handleEdit(item);
                  }}
                />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
export default Grid;
