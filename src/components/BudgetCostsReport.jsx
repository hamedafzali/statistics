import { useEffect, useState } from "react";
import { BudgetCosts } from "../services/budget";
import BudgetCostsReportTable from "./BudgetCostsReportTable";

const BudgetCostsReport = ({ employee }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getBudgetCosts();
  }, []);
  const getBudgetCosts = async () => {
    const { data } = await BudgetCosts(employee.BranchCode);
    setData(data);
  };
  return <BudgetCostsReportTable data={data} title="گزارش هزینه های ثبت شده" />;
};

export default BudgetCostsReport;
