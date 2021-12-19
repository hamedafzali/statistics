import { Fragment, useEffect, useState } from "react";
import {
  BudgetAllocationCostDetail,
  BudgetGetDataWithCode,
  getBudgetUnits,
} from "../services/budget";
import BudgetAllocationCostDetailReportTable from "./BudgetAllocationCostDetailReportTable";
import BudgetAllocationCostDetailWithCodeReportTable from "./BudgetAllocationCostDetailWithCodeReportTable";
import Select from "./common/select";

const BudgetAllocationCostDetailReport = ({ employee }) => {
  const [data, setData] = useState([]);
  const [budgetUnits, setBudgetUnits] = useState([]);
  const [selectedCode, setSelectedCode] = useState(0);

  useEffect(() => {
    getBudgetCosts();
    handleBudgetUnits();
  }, [selectedCode]);
  const getBudgetCosts = async () => {
    const { data } = await BudgetAllocationCostDetail(selectedCode);
    setData(data);
  };
  const handleBudgetUnits = async () => {
    const { data } = await getBudgetUnits();
    setBudgetUnits(data);
  };
  const handleSelectChange = (e) => {
    setSelectedCode(e.currentTarget.value);
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <Select
            onChange={handleSelectChange}
            name="destinationCode"
            label="واحد مقصد"
            error=""
            options={budgetUnits}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <BudgetAllocationCostDetailReportTable
            data={data}
            title="گزارش واحد ها بر اساس سرفصل"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BudgetAllocationCostDetailReport;
