import { LayoutDashboard, ListTodo } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard">
        <LayoutDashboard size={20} />
        Dashboard
      </NavLink>

      <NavLink to="/tasks">
        <ListTodo size={20} />
        My Tasks
      </NavLink>
    </aside>
  );
}

export default Sidebar;
