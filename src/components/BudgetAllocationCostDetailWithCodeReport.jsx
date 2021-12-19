import { Fragment, useEffect, useState } from "react";
import {
  BudgetAllocationCostDetailWithCode,
  BudgetGetDataWithCode,
} from "../services/budget";
import BudgetAllocationCostDetailWithCodeReportTable from "./BudgetAllocationCostDetailWithCodeReportTable";
import SelectSearchable from "./common/selectSearchable";

const BudgetAllocationCostDetailWithCodeReport = ({ employee }) => {
  const [data, setData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [selectedCode, setSelectedCode] = useState(0);

  useEffect(() => {
    getBudgetCosts();
    getBudgetGetData();
  }, [selectedCode]);
  const getBudgetCosts = async () => {
    const { data } = await BudgetAllocationCostDetailWithCode(selectedCode);
    setData(data);
  };
  const getBudgetGetData = async () => {
    const { data: BudgetData } = await BudgetGetDataWithCode();
    setBudgetData(BudgetData);
  };
  const handleSelectChange = (e) => {
    setSelectedCode(e.value);
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <SelectSearchable
            name="accountCode"
            data={budgetData}
            onChange={handleSelectChange}
            //selectedValue={this.state.selectedOption}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <BudgetAllocationCostDetailWithCodeReportTable
            data={data}
            title="گزارش واحد ها بر اساس سرفصل"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BudgetAllocationCostDetailWithCodeReport;
