"use client";
import * as React from "react";
import { Container, Stack, Text, Button, Box } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log("test");
    router.push("/text-detection");
  };
  return (
    <Container p={{ base: 8, sm: 16 }}>
      <Stack direction="column" gap={6} alignItems="center">
        <Text
          fontSize={{ base: "4xl", sm: "5xl" }}
          fontWeight="bold"
          textAlign="center"
          maxW="430px"
        >
          Behind the text An Ai {""}
          <Box
            as={"span"}
            color="teal"
            bg="linear-gradient(transparent 50%, #83e9e7 50%)"
          >
            text detector
          </Box>
        </Text>
        <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
          Discover the truth behind the words. Our cutting-edge AI reveals who
          really wrote the content.
        </Text>
        <Stack
          direction={{ base: "column", sm: "row" }}
          w={{ base: "100%", sm: "auto" }}
          gap={5}
        >
          <Button
            colorScheme="teal"
            variant="outline"
            rounded="md"
            size="lg"
            height="3.5rem"
            fontSize="1.2rem"
            onClick={handleClick}
          >
            Get Started
          </Button>
          <Button
            colorScheme="gray"
            variant="outline"
            rounded="md"
            size="lg"
            height="3.5rem"
            fontSize="1.2rem"
            onClick={() =>
              window.open("https://github.com/LordPramod/Behind-the-Text")
            }
          >
            <FaGithub /> Github
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HeroSection;
