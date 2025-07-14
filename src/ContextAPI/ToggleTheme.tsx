import "./../styles.css";

export const ToggleTheme = () => {
  const toggleTheme = () => {
    const docElement = document.documentElement;
    const currentTheme = docElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    docElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="firstDiv">
      <button className="button" onClick={toggleTheme}>
        Переключить тему
      </button>
    </div>
  );
};
