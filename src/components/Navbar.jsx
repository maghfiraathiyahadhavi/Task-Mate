import { CheckSquare } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <CheckSquare size={25} />
        <h2>TaskMate</h2>
      </div>
    </nav>
  );
}

export default Navbar;
