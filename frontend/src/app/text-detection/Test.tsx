"use client";
import React, { useState, useEffect, useRef } from "react";

import { ChevronDown, ArrowUp, Brain } from "lucide-react";
import { useGetMethods } from "./hooks";
import { SelectOptionType } from "../shared/types/form/select";
import { UseFormReturn } from "react-hook-form";
import { TextDetectionFormTypes } from "./types";

type PropsType = {
  methods: UseFormReturn<TextDetectionFormTypes>;
};

const PromptComponent = ({ methods }: PropsType) => {
  const { data: selectOption } = useGetMethods();
  const selectOptionDropdown =
    selectOption?.map((item: SelectOptionType) => ({
      label: item?.label,
      value: item?.value,
    })) ?? [];

  const [, setAddPopupOpen] = useState(false);
  const [isModelOpen, setModelOpen] = useState(false);

  const addPopupRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addPopupRef.current &&
        !addPopupRef.current.contains(event.target as Node)
      ) {
        setAddPopupOpen(false);
      }
      if (
        modelRef.current &&
        !modelRef.current.contains(event.target as Node)
      ) {
        setModelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // if (isPending) {
  //   return (
  //     <div className="grid place-items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  //     </div>
  //   );
  // }
  console.log(methods.watch("method"));
  useEffect(() => {
    if (methods.watch("method") === undefined)
      methods.setValue("method", "perplexity");
  }, [methods]);

  return (
    <div className="w-full max-w-2xl p-4">
      <div className="bg-white/80 backdrop-blur-xl dark:bg-black/90 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 p-6 transition-all duration-300 hover:shadow-3xl">
        <textarea
          className="w-full p-3 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none text-base font-medium leading-relaxed"
          rows={2}
          placeholder="Enter or paste your text here"
          {...methods.register("text", { required: true })}
        />

        <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4 md:gap-0">
          {/* Left side controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative" ref={modelRef}>
              <button
                type="button"
                onClick={() => setModelOpen(!isModelOpen)}
                className="flex items-center justify-center h-12 px-4 lg:px-5 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30 hover:from-blue-100 hover:to-indigo-200 dark:hover:from-blue-800/40 dark:hover:to-indigo-700/40 text-gray-800 dark:text-gray-200 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-200/50 dark:border-blue-700/30"
              >
                <Brain size={18} className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold ml-2 hidden lg:block">
                  {methods.watch("method") ||
                    selectOptionDropdown[0]?.label ||
                    "Select method"}
                </span>
                <ChevronDown size={16} className="ml-2 hidden lg:block" />
              </button>
              {isModelOpen && (
                <div className="absolute bottom-full left-0 mb-3 w-64 bg-white/95 backdrop-blur-xl dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-10">
                  <ul>
                    {selectOptionDropdown.length > 0
                      ? selectOptionDropdown.map((option) => (
                          <li
                            key={option.value}
                            onClick={() => {
                              methods.setValue("method", option.value, {
                                shouldValidate: true,
                              });
                              setModelOpen(false);
                            }}
                            className="p-4 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 cursor-pointer font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                          >
                            {option.label}
                          </li>
                        ))
                      : "No Modules "}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!methods.watch("text") || !methods.watch("method")}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl ${
                methods.watch("text") && methods.watch("method")
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white"
                  : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              <ArrowUp size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptComponent;
