import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Skeleton,
  Spacer,
} from "@chakra-ui/react";
import { format, formatDistanceToNow, subDays } from "date-fns";
import React from "react";
import { useQuery } from "urql";
import { Donation } from "../../utils/types";

type Props = {};

const DonationsQuery = `
query Donations($donationsOrderBy: OrderByParams) {
    donations(orderBy: $donationsOrderBy) {
      id
      count
      email
      displayName
      mobile
      team
      message
      createdAt
    }
  }
`;

const MostRecentItems = (props: Props) => {
  const [result, reexecuteQuery] = useQuery({
    query: DonationsQuery,
    variables: {
      donationsOrderBy: {
        field: "createdAt",
        direction: "desc",
      },
    },
  });

  const { data, fetching, error } = result;
  console.log("data is ", data);

  const DonationItem = ({
    donation,
    props,
  }: {
    donation: Donation;
    props?: any;
  }) => {
    return (
      <Box
        w="100%"
        px={10}
        py={6}
        my={5}
        borderRadius="xl"
        boxShadow="dark-lg"
        rounded="lg"
        style={{ position: "relative" }}
      >
        <Flex minW="80%" p={5} direction="column">
          <Flex alignItems="space-between">
            <Box
              style={{
                position: "absolute",
                left: "-50px",
              }}
            >
              <Avatar
                boxShadow="dark-lg"
                size="xl"
                name="Kent Dodds"
                src="https://bit.ly/kent-c-doddsd"
              />
            </Box>
            <Box mt="1" fontWeight="semibold" as="h4">
              <Heading size="md" color="teal.400">
                #{donation.team}
              </Heading>
              <Heading>{donation.displayName}</Heading>
              <p>{donation.email}</p>
            </Box>
            <Spacer />
            <Box mt="1" textAlign="end" fontWeight="semibold" as="h1">
              <Badge borderRadius="full" px={10} colorScheme="teal">
                <Heading>{donation.count} Pounds</Heading>
              </Badge>
            </Box>
          </Flex>

          <Flex>
            <Box mt="1" fontWeight="semibold" as="h3">
              {donation.message}
            </Box>
            <Spacer />
            <Box mt="1" fontWeight="semibold" as="h2">
              {formatDistanceToNow(new Date(donation.createdAt), {
                addSuffix: true,
              })}
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Box>
      <Heading>MostRecentItems</Heading>

      <Box>
        <Skeleton isLoaded={!fetching}>
          <Box>
            {data?.donations.map((donation: Donation) => {
              return <DonationItem donation={donation} />;
            })}
          </Box>
        </Skeleton>
      </Box>
    </Box>
  );
};

export default MostRecentItems;
