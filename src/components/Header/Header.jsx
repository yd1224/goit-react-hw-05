import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { forwardRef } from "react";
import css from "./Header.module.css";
export const Header = forwardRef((props, ref) => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div ref={ref} className={css.headerBox}>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to="/movies">
        Movies
      </NavLink>
    </div>
  );
});
