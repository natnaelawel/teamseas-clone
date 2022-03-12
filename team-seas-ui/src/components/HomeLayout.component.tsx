import { Box, Grid, Heading, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useSubscription } from "urql";
import { Counter } from "../widgets/Counter";
import { Logo } from "../widgets/Logo";
import DonationWizardLayout from "./DonationWizard/DonationWizard.component";
import LeaderboardLayout from "./Leaderboard/Leaderboard.component";

const TotalUpdatedQuery = `
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`;

const TotalDonationsQuery = `
query Query {
  totalDonations
}
`;

const handleSubscription = (previous: any, newTotal: any) => {
  return newTotal?.totalUpdated?.total;
};

function HomeLayout() {
  // const [result, reExecuteQuery] = useQuery({ query: TotalDonationsQuery });
  const [result] = useQuery({ query: TotalDonationsQuery });
  console.log(result, " is result");
  const { data, fetching, error } = result;

  const [res] = useSubscription(
    { query: TotalUpdatedQuery },
    handleSubscription
  );

  return (
    <Box minW="100vw">
      <Grid minH="100vh" minW="100%" p={3}>
        <VStack spacing={8}>
          <Logo />
          <Heading>JOIN THE MOVEMENT!</Heading>
          <Text size="" fontWeight="light">
            The team is growing everyday and scoring wins <br /> Remove trash
            with us and track our progress.
          </Text>
          <Skeleton isLoaded={!fetching}>
            <Heading as="h2" size="4xl">
              <Counter
                from={0}
                to={res.data || (data ? data.totalDonations : 0)}
              />
            </Heading>
          </Skeleton>
          <Box my={2}>
            <DonationWizardLayout />
          </Box>

          <LeaderboardLayout />
        </VStack>
      </Grid>
      <Box textAlign="center"></Box>
    </Box>
  );
}

export default HomeLayout;
