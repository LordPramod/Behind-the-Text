import { Box, Flex } from "@chakra-ui/react";
import { NavBar } from "./shared/component/navbar";
import HeroSection from "./shared/component/herosection/LandingPage";

export default function Home() {
  return (
    <Box
      borderColor={"red"}
      px={"200px"}
      py={4}
      h={20}
      display={"flex"}
      flexDir={"column"}
      gap={10}
    >
      <Flex boxShadow={"2xl"} borderRadius={"lg"} py={5} px={5}>
        <NavBar />
      </Flex>
      <HeroSection />
    </Box>
  );
}
