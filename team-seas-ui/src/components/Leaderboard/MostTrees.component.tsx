import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Spacer,
} from "@chakra-ui/react";
import { format, formatDistanceToNow, subDays } from "date-fns";
import { useQuery } from "urql";
import { Donation } from "../../utils/types";
import { Counter } from "../../widgets/Counter";

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

const MostTrees = (props: Props) => {
  const [result, reexecuteQuery] = useQuery({
    query: DonationsQuery,
    variables: {
      donationsOrderBy: {
        field: "count",
        direction: "desc",
      },
    },
  });

  const { data, fetching, error } = result;

  const DonationItem = ({
    donation,
    props,
  }: {
    donation: Donation;
    props?: any;
  }) => {
    return (
      <Skeleton isLoaded={!fetching}>
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
                  <Heading>
                    <HStack>
                      <Counter from={0} to={donation.count} />
                      <p>Pounds</p>
                    </HStack>
                  </Heading>
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
      </Skeleton>
    );
  };

  return (
    <Box>
      <Heading>MostTrees</Heading>

      <Box>
        <Box>
          {data?.donations.map((donation: Donation) => {
            return <DonationItem donation={donation} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default MostTrees;
