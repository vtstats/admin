import {
  Img,
  Link,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

import FormatDate from "../components/FormatDate";
import LoadMore from "../components/LoadMore";
import { fetch } from "../utils/fetch";

type Stream = {
  platformId: string;
  streamId: number;
  title: string;
  platformChannelId: string;
  vtuberId: string;
  thumbnailUrl: string;
  scheduleTime: number;
  startTime: number;
  endTime: number;
  updatedAt: number;
  status: "scheduled" | "live" | "ended";
};

const Streams: React.FC = () => {
  const {
    data: streams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["streams"],
    ({ pageParam }) =>
      fetch<Stream[]>({ url: "/streams", query: { end_at: pageParam } }),
    {
      getNextPageParam: (lastStreams) => lastStreams[23]?.updatedAt,
    }
  );

  return (
    <TableContainer overflowX="unset" overflowY="unset">
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead position="sticky" top="60px" zIndex={1000} bgColor="white">
          <Tr>
            <Th isNumeric>StreamId</Th>
            <Th width="160px">Thumbnail</Th>
            <Th>Status</Th>
            <Th isTruncated>Title</Th>
            <Th isNumeric>Vtuber</Th>
            <Th>Schedule Time</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {streams?.pages.map((streams, index) => (
            <Fragment key={index}>
              {streams.map((stream) => (
                <Tr key={stream.streamId}>
                  <Td isNumeric>{stream.streamId}</Td>
                  <Td width="160px">
                    {stream.thumbnailUrl && (
                      <Img
                        loading="lazy"
                        src={stream.thumbnailUrl}
                        aspectRatio="16/9"
                        minW="100px"
                        borderRadius=".25rem"
                      />
                    )}
                  </Td>
                  <Td>
                    <StreamStatus stream={stream} />
                  </Td>
                  <Td isTruncated>
                    <Link
                      target="_blank"
                      href={"https://youtu.be/" + stream.platformId}
                    >
                      {stream.title}
                    </Link>
                  </Td>
                  <Td isNumeric>{stream.vtuberId}</Td>
                  <Td>
                    <FormatDate>{stream.scheduleTime}</FormatDate>
                  </Td>
                  <Td>
                    <FormatDate>{stream.startTime}</FormatDate>
                  </Td>
                  <Td>
                    <FormatDate>{stream.endTime}</FormatDate>
                  </Td>
                  <Td>
                    <FormatDate>{stream.updatedAt}</FormatDate>
                  </Td>
                </Tr>
              ))}
            </Fragment>
          ))}
        </Tbody>
      </Table>

      {hasNextPage && (
        <LoadMore
          onReach={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        />
      )}
    </TableContainer>
  );
};

const StreamStatus: React.FC<{ stream: Stream }> = ({ stream }) => {
  switch (stream.status) {
    case "scheduled": {
      return <Tag>Scheduled</Tag>;
    }

    case "live": {
      return <Tag colorScheme="red">Live</Tag>;
    }

    case "ended": {
      return <Tag colorScheme="green">Ended</Tag>;
    }

    default:
      return null;
  }
};

export default Streams;
