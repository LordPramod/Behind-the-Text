"use client";
import PromptComponent from "./Test";
import { Icons } from "@/components/icons";

const TextDetection = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
    //   <div className="container mx-auto max-w-2xl pt-20">
    //     <div className="text-center mb-8">
    //       <h1 className="text-4xl font-bold text-white mb-4">Text Detection</h1>
    //       <p className="text-gray-300 text-lg">
    //         Analyze text using AI-powered detection methods
    //       </p>
    //     </div>

    //     <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
    //       <FormProvider methods={methods} onSubmit={onSubmit}>
    //         <div className="flex flex-col items-start gap-6 w-full">
    //           <TextAreaFieldInput
    //             name="text"
    //             placeholder="Enter text..."
    //             isRequired
    //             label="Enter text to detect"
    //           />
    //           <div className="flex flex-col gap-4 w-full">
    //             <ReactSelect
    //               options={selectOptionDropdown ?? []}
    //               name="method"
    //               label="Select analyzing method"
    //               required
    //             />
    //             <button
    //               type="submit"
    //               className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 active:scale-95"
    //             >
    //               Analyze Text
    //             </button>
    //           </div>
    //         </div>
    //       </FormProvider>
    //     </div>
    //   </div>
    // </div>

    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl min-h-120 bg-white/80 backdrop-blur-xl dark:bg-black/90 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 p-6 transition-all duration-300 hover:shadow-3xl">
        <div className="flex flex-col items-center text-center gap-6">
          <Icons.logo className="size-16 h-auto" />
          <h1 className="text-6xl md:text-6xl font-extrabold text-white leading-tight">
            Reveal The True
          </h1>
          <h2 className="text-6xl md:text-6xl font-normal text-gray-400 leading-tight">
            Writer.
          </h2>
        </div>
        <PromptComponent />
      </div>
    </div>
  );
};

export default TextDetection;
