"use client";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Logo } from "../../assets/img";
import {
  ColorModeButton,
  useColorMode,
} from "college-project/components/ui/color-mode";

export const NavBar = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex align={"center"} justifyContent={"space-between"} w={"full"}>
      <HStack gap={4}>
        <Image src={Logo} alt="logo" width={`${50}`} />
        <Text fontWeight={"bolder"} fontSize={"24px"} fontFamily={"monospace"}>
          Behind The Text
        </Text>
      </HStack>
      <Box>
        <ColorModeButton onClick={toggleColorMode} />
      </Box>
    </Flex>
  );
};
