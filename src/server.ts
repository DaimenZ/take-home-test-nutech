import App from "./main";
import InformationRoute from "./routes/information.route";
import MembershipRoute from "./routes/membership.route";
import TransactionRoute from "./routes/transaction.route";

const app = new App([
  new MembershipRoute(),
  new InformationRoute(),
  new TransactionRoute(),
]);

app.listen();
