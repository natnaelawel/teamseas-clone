import {
  Box,
  Button,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMultiStyleConfig,
  useTab,
} from "@chakra-ui/react";
import React, { Ref, useRef } from "react";
import MostRecentItems from "./MostRecentItems.component";
import MostTrees from "./MostTrees.component";

type Props = {};

function LeaderboardLayout({}: Props) {
  const reff: any = useRef();
  const CustomTab = React.forwardRef((props, ref: any) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig("Tabs", tabProps);

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box as="span" mr="2">
          {isSelected ? "😎" : "😐"}
        </Box>
        {tabProps.children}
      </Button>
    );
  });

  return (
    <Box minW="70%" >
      <Tabs>
        <TabList>
          <CustomTab key={1}></CustomTab>
          <CustomTab key={2}></CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MostRecentItems />
          </TabPanel>
          <TabPanel>
            <MostTrees />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default LeaderboardLayout;
