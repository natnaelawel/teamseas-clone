import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

function BaseLayout() {
  return (
    <Flex
      width="100%"
      justifyContent="center"
    >
      {/* <ColorModeSwitcher /> */}
      <Outlet />
    </Flex>
  );
}

export default BaseLayout;
