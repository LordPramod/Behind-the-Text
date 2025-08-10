"use client";
import { FormProvider } from "../shared/component";
import { TextAreaFieldInput } from "../shared/component/input/TextFieldArea";
import { useSendTextToAnalyze, useTextAnalyzeFrom } from "./hooks";
import { useGetMethods } from "./hooks/useGetMethods";
import { ReactSelect } from "../shared/select/ReactSelect";
import { TextDetectionFormTypes } from "./types";
import { SelectOptionType } from "../shared/types/form/select";

const TextDetection = () => {
  const { methods } = useTextAnalyzeFrom();
  const { mutateAsync, isPending } = useSendTextToAnalyze();
  const onSubmit = (data: TextDetectionFormTypes) => {
    mutateAsync(data);
  };

  const { data: selectOption } = useGetMethods();

  const selectOptionDropdown = selectOption?.map((item: SelectOptionType) => ({
    label: item?.label,
    value: item?.value,
  }));

  if (isPending) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="container mx-auto max-w-2xl pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Text Detection</h1>
          <p className="text-gray-300 text-lg">
            Analyze text using AI-powered detection methods
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <div className="flex flex-col items-start gap-6 w-full">
              <TextAreaFieldInput
                name="text"
                placeholder="Enter text..."
                isRequired
                label="Enter text to detect"
              />
              <div className="flex flex-col gap-4 w-full">
                <ReactSelect
                  options={selectOptionDropdown ?? []}
                  name="method"
                  label="Select analyzing method"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 active:scale-95"
                >
                  Analyze Text
                </button>
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default TextDetection;
