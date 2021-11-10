import Login from "./components/login";
import MainPage from "./components/main";
import Password from "./components/password";
import PersonsLocation from "./components/personsLocation";
import Messages from "./components/messages";
import ResetPassword from "./components/resetPassword";
import NotFound from "./components/notFound";
import RelocationCommit from "./components/relocationCommit";
import CEOCommit from "./components/CEOCommit";
import ManagerCommit from "./components/managerCommit";
import UnderConstruction from "./components/underConstruction";
import PersonsDetail from "./components/personsDetail";
import PersonelReport from "./components/personelReport";
import AdditionRegForm from "./components/additionForm";
import KaranehAccess from "./components/karanehAccess";
import KaranehManagersPage from "./components/karanehManagersPage";
import CEOConfirm from "./components/ceoConfirm";
import PersonsList from "./components/PersonsList";
import Product from "./components/product";
import ThreeOf1000 from "./components/ThreeOf1000";
import Payesh from "./components/payesh";
import CEOCommitNew from "./components/CEOCommitNew";
import BudgetTitle from "./components/budgetTitle";
import BudgetAllocation from "./components/budgetAllocation";
import MessageNew from "./components/messageNew";
import PdfReader from "./components/pdfReader";
import BudgetReport from "./components/budgetReport";
import BudgetCommit from "./components/budgetCommit";
import BudgetPrint from "./components/budgetPrint";
import BudgetRequest from "./components/budgetRequest";
import KaranehReport from "./components/karanehReport";
import TasksComment from "./components/tasksComment";
import BudgetTotalReg from "./components/budgetTotalReg";
import LoginAs from "./components/loginAs";
import BudgetSummaryReport from "./components/BudgetSummaryReport";
import BudgetRCommit from "./components/BudgetRCommit";
import BudgetRequests from "./components/BudgetRequests";
import BudgetRequestToDocument from "./components/BudgetRequestToDocument";
import KaranehSummaryReport from "./components/KaranehSummaryReport";
import BudgetRegCost from "./components/BudgetRegCost";
import BajeManabeUpload from "./components/BajeManabeUpload";
import BajeDehyariUpload from "./components/BajeDehyariUpload";
export const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/mainpage",
    component: MainPage,
  },
  {
    path: "/password",
    component: Password,
  },
  {
    path: "/personslocation",
    component: PersonsLocation,
  },
  {
    path: "/messages",
    component: Messages,
  },
  {
    path: "/messagesnew",
    component: MessageNew,
  },
  {
    path: "/pdf",
    component: PdfReader,
  },
  {
    path: "/personsdetail",
    component: PersonsDetail,
  },
  {
    path: "/personslist",
    component: PersonsList,
  },
  {
    path: "/karanehaccess",
    component: KaranehAccess,
  },
  {
    path: "/ceoconfirm",
    component: CEOConfirm,
  },
  {
    path: "/resetpassword",
    component: ResetPassword,
  },

  {
    path: "/pishtazan",
    component: ThreeOf1000,
  },
  {
    path: "/payesh",
    component: Payesh,
  },
  {
    path: "/taskscomment",
    component: TasksComment,
  },
  {
    path: "/personelreport",
    component: PersonelReport,
  },
  {
    path: "/addition",
    component: AdditionRegForm,
  },
  {
    path: "/relocationcommit",
    component: RelocationCommit,
  },
  {
    path: "/kmanagers",
    component: KaranehManagersPage,
  },
  {
    path: "/ceocommit",
    component: CEOCommit,
  },
  {
    path: "/ceocommitnew",
    component: CEOCommitNew,
  },
  {
    path: "/karanehreport",
    component: KaranehReport,
  },
  {
    path: "/managercommit",
    component: ManagerCommit,
  },
  {
    path: "/budgettitle",
    component: BudgetTitle,
  },
  {
    path: "/budgetreport",
    component: BudgetReport,
  },
  {
    path: "/budgetprint",
    component: BudgetPrint,
  },
  {
    path: "/budgetcommit",
    component: BudgetCommit,
  },
  {
    path: "/budgetrequest",
    component: BudgetRequest,
  },
  {
    path: "/budgettotalreg",
    component: BudgetTotalReg,
  },
  {
    path: "/budgetallocation",
    component: BudgetAllocation,
  },
  {
    path: "/not-found",
    component: NotFound,
  },
  {
    path: "/underconstruction",
    component: UnderConstruction,
  },
  {
    path: "/loginas",
    component: LoginAs,
  },
  {
    path: "/budgetsummary",
    component: BudgetSummaryReport,
  },
  {
    path: "/budgetrcommit",
    component: BudgetRCommit,
  },
  {
    path: "/budgetnewrequests",
    component: BudgetRequests,
  },
  {
    path: "/budgetrequesttodocument",
    component: BudgetRequestToDocument,
  },
  {
    path: "/karanehsummary",
    component: KaranehSummaryReport,
  },
  {
    path: "/budgetcost",
    component: BudgetRegCost,
  },
  {
    path: "/mbaje",
    component: BajeManabeUpload,
  },
  {
    path: "/dehyari",
    component: BajeDehyariUpload,
  },
];
