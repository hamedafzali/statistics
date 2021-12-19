import { Fragment, useEffect, useState } from "react";
import { BudgetAllocationCost } from "../services/budget";
import BudgetAllocationCostReportTable from "./BudgetAllocationCostReportTable";

const BudgetAllocationCostReport = ({ employee }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBudgetCosts();
  }, []);
  const getBudgetCosts = async () => {
    const { data } = await BudgetAllocationCost();
    setData(data);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <BudgetAllocationCostReportTable
            data={data}
            title="گزارش ابلاغ به واحد ها"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BudgetAllocationCostReport;
