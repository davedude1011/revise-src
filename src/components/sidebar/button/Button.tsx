function Button({
  icon,
  text,
  content,
  setContent,
  isActive,
  setActiveButton,
  navbarFull,
  setNavbarFull,
}: {
  icon: any;
  text: string;
  content: any;
  setContent: (content: any) => void;
  isActive: boolean;
  setActiveButton: (activeButton: string) => void;
  navbarFull: boolean;
  setNavbarFull: (navbarFull: boolean) => void;
}) {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  return (
    <button
      className={`w-[90%] flex flex-row ${
        navbarFull ? "justify-start" : "justify-center py-3"
      } items-center text-muted p-2 rounded-md ${
        isActive
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "hover:bg-gray-400"
      }`}
      onClick={() => {
        if (content) {
          setContent(content);
          setActiveButton(text);
        }
        if (isMobile) {
          setNavbarFull(false);
        }
      }}
    >
      <span>{icon}</span>
      {navbarFull && <span className="ms-3">{text}</span>}
    </button>
  );
}

export default Button;
