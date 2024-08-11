import equationData from "../../../data/equationData.json";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useState } from "react";

import { GoTag } from "react-icons/go";

function EquationMathJax({ content }: { content: string }) {
  return (
    <MathJaxContext>
      <MathJax inline={false}>{content}</MathJax>
    </MathJaxContext>
  );
}

function Equations() {
  const [searchValue, setSearchValue] = useState(":all");
  return (
    <div className="w-full h-screen m-0 bg-gray-500 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent text-white flex flex-row justify-center overflow-auto">
      <div className="w-full p-5 md:w-2/3 lg:w-1/2">
        <div className="w-full flex flex-col md:flex-row justify-between mt-12 md:mt-10">
          <div className="min-w-1/3 w-full md:w-fit text-2xl md:text-4xl font-bold tracking-tight">
            Equation Gallery
          </div>
          <div className="w-full h-10 mt-2 md:mt-0 md:w-2/3 flex flex-row border rounded-md">
            <div className="h-full aspect-square flex items-center justify-center">
              <GoTag />
            </div>
            <input
              className="w-full bg-transparent text-white placeholder:text-muted outline-none"
              type="text"
              placeholder="Search equations..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        {Object.keys(equationData).map((subjectDataKey: any, index1: number) =>
          // @ts-ignore
          Object.keys(equationData[subjectDataKey]).map(
            (levelDataKey: any, index2: number) =>
              // @ts-ignore
              Object.keys(equationData[subjectDataKey][levelDataKey]).map(
                (equationDataKey: any, index3: number) =>
                  (searchValue.includes(`:${subjectDataKey}`) ||
                    searchValue.includes(`:${levelDataKey}`) ||
                    searchValue.includes(`:${equationDataKey}`) ||
                    searchValue.includes(`:all`)) && (
                    <div
                      key={`${index1}-${index2}-${index3}`}
                      className={`flex flex-col w-100 h-fit ${
                        index1 == 0 && index2 == 0 && index3 == 0
                          ? "mt-6"
                          : "mt-36"
                      }`}
                    >
                      <div className="w-full bg-gray-200 text-center text-3xl py-8 rounded-t-md">
                        <EquationMathJax
                          content={`\\(${
                            // @ts-ignore
                            equationData[subjectDataKey][levelDataKey][
                              equationDataKey
                            ].equation
                          }\\)`}
                        />
                      </div>
                      <div className="p-4">
                        <div className="w-full flex flex-row items-center">
                          <div className="text-lg font-bold">
                            {
                              // @ts-ignore
                              equationData[subjectDataKey][levelDataKey][
                                equationDataKey
                              ].title
                            }
                          </div>
                          <div className="ms-4 flex flex-row gap-2">
                            {[subjectDataKey, levelDataKey].map(
                              (tagText: string) => (
                                <button className="bg-gray-300 rounded-md p-2 py-1 text-xs">
                                  {tagText}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                        <div className="whitespace-pre-line mt-2 text-slate-200">
                          <EquationMathJax
                            content={
                              // @ts-ignore
                              equationData[subjectDataKey][levelDataKey][
                                equationDataKey
                              ].description
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
              )
          )
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default Equations;
