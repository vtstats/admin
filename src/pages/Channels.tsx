import {
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";

import { fetch } from "../utils/fetch";

type Channel = {
  channel_id: number;
  platform_id: string;
  vtuber_id: string;
  platform: string;
};

const Channels: React.FC = () => {
  const { data: channels = [] } = useQuery(["channels"], () =>
    fetch<Channel[]>("/channels")
  );

  return (
    <TableContainer overflowX="unset" overflowY="unset">
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead position="sticky" top="60px" zIndex={1000} bgColor="white">
          <Tr>
            <Th isNumeric>ID</Th>
            <Th>VTuber Id</Th>
            <Th>Platform</Th>
            <Th>Platform Id</Th>
          </Tr>
        </Thead>
        <Tbody>
          {channels.map((job) => (
            <Tr key={job.channel_id}>
              <Td isNumeric>{job.channel_id}</Td>
              <Td isNumeric>{job.vtuber_id}</Td>
              <Td>
                <PlatformTag>{job.platform}</PlatformTag>
              </Td>
              <Td>{job.platform_id}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const PlatformTag: React.FC<{ children: string }> = ({ children }) => {
  switch (children) {
    case "Youtube": {
      return <Tag colorScheme="red">YouTube</Tag>;
    }

    default: {
      return <Tag>{children}</Tag>;
    }
  }
};

export default Channels;
