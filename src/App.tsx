import { useState } from "react";
import Product from "./components/ui/Product";
// import Login from "./components/ui/Register/Login";
import Login from "./components/ui/Controller/Login";

function App() {
  const [session, setSession] = useState<string | null>(null);
  return <main className="flex flex-col items-center w-screen min-h-screen gap-4">{session ? <Product setSession={setSession} /> : <Login setSession={setSession} />}</main>;
}

export default App;
