import { Route, Routes } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Home from "@/pages/Home";
import MainPage from "@/pages/MainPage";
import Dashboard from "@/pages/Dashboard";
import Chart from "@/pages/Chart";
import Statistic from "@/pages/Statistic";
import History from "@/pages/History";
const Routing = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <section className={`${theme} bg-background text-foreground`}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/chart" element={<Chart />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </section>
  );
};

export default Routing;
