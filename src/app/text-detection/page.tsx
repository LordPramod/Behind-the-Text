"use client";
import { Box, Button, Flex, Grid, Spinner, VStack } from "@chakra-ui/react";
import { FormProvider } from "../shared/component";
import { TextAreaFieldInput } from "../shared/component/input/TextFieldArea";
import { useSendTextToAnalyze, useTextAnalyzeFrom } from "./hooks";
import { useGetMethods } from "./hooks/useGetMethods";
import { ReactSelect } from "../shared/select/ReactSelect";
import { TextDetectionFormTypes } from "./types";

const TextDetection = () => {
  const { methods } = useTextAnalyzeFrom();
  const { mutateAsync, isPending } = useSendTextToAnalyze();
  const onSubmit = (data: TextDetectionFormTypes) => {
    mutateAsync(data);
  };

  const { data: selectOption } = useGetMethods();

  const selectOptionDropdown = selectOption?.map((item) => ({
    label: item?.label,
    value: item?.value,
  }));

  if (isPending) {
    return (
      <Grid placeItems={"center"} h={"100vh"}>
        <Spinner size="xl" />
      </Grid>
    );
  }
  return (
    <Flex boxShadow={"2xl"} p={6} borderRadius={"16px"}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack align={"start"} gap={6}>
          <TextAreaFieldInput
            name="text"
            placeholder="Enter text..."
            isRequired
            label="Enter text to detect"
          />
          <Box display={"flex"} gap={4} flexDirection={"column"}>
            <ReactSelect
              options={selectOptionDropdown ?? []}
              name="method"
              label="Selecte analzying method"
              required
            />
            <Button type="submit">Submit</Button>
          </Box>
        </VStack>
      </FormProvider>
    </Flex>
  );
};
export default TextDetection;
