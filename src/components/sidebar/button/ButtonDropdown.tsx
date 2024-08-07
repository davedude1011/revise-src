import { useState } from "react";

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

function Button({
  icon,
  text,
  dropdownData,
  useContentFunction,
  setActiveButton,
  navbarFull,
  setNavbarFull,
}: {
  icon: any;
  text: string;
  dropdownData: any;
  useContentFunction: (content: any) => void;
  setActiveButton: (activeButton: string) => void;
  navbarFull: boolean;
  setNavbarFull: (navbarFull: boolean) => void;
}) {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;

  const [activeDropdownIds, setActiveDropdownIds] = useState([] as string[]);
  const [activeMain, setActiveMain] = useState("");

  function toggleDropdown(id: string) {
    if (activeDropdownIds.includes(id)) {
      setActiveDropdownIds(
        activeDropdownIds.filter((dropdownId) => dropdownId !== id)
      );
    } else {
      setActiveDropdownIds([...activeDropdownIds, id]);
    }
  }

  function recursiveDropdown(
    data: any,
    parentId: string = "base",
    isTip: boolean = false
  ) {
    return (
      <div
        className={`${isTip ? "w-[90%]" : "w-[95%]"} flex flex-col items-end`}
      >
        {Object.keys(data).map((dataKey: any, index: number) => (
          <>
            <button
              key={index}
              className={`w-[95%] flex flex-row justify-between items-center text-muted py-2 px-2 rounded-md text-start ${
                activeDropdownIds.includes(`${parentId}-${dataKey}`) &&
                "text-white"
              } ${
                activeMain == `${parentId}-${dataKey}`
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "hover:bg-gray-400"
              }`}
              onClick={() => {
                if (Array.isArray(data[dataKey])) {
                  useContentFunction([dataKey, data[dataKey]]);
                  setActiveMain(`${parentId}-${dataKey}`);
                  setActiveButton("");
                  if (isMobile) {
                    setNavbarFull(false);
                  }
                } else {
                  toggleDropdown(`${parentId}-${dataKey}`);
                }
              }}
            >
              <span className="ms-3">{dataKey}</span>
              <span>
                {activeDropdownIds.includes(`${parentId}-${dataKey}`) && (
                  <IoIosArrowDown size={16} />
                )}
              </span>
            </button>
            {activeDropdownIds.includes(`${parentId}-${dataKey}`) &&
              recursiveDropdown(data[dataKey], `${parentId}-${dataKey}`)}
          </>
        ))}
      </div>
    );
  }

  return (
    <>
      <button
        className={`w-[90%] flex flex-row ${
          navbarFull ? "justify-between" : "justify-center py-3"
        } items-center text-muted p-2 hover:bg-gray-400 rounded-md ${
          activeDropdownIds.includes("-1") && "text-white"
        }`}
        onClick={() => {
          toggleDropdown("-1");
          setNavbarFull(true);
        }}
      >
        <div className={`flex flex-row items-center`}>
          <span>{icon}</span>
          {navbarFull && <span className="ms-3">{text}</span>}
        </div>
        {navbarFull && (
          <span>
            {activeDropdownIds.includes("-1") ? (
              <IoIosArrowDown size={16} />
            ) : (
              <IoIosArrowForward size={16} />
            )}
          </span>
        )}
      </button>
      {activeDropdownIds.includes("-1") && navbarFull && (
        <>{recursiveDropdown(dropdownData, "root", true)}</>
      )}
    </>
  );
}

export default Button;
