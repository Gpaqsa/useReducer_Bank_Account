import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  deposit: 0,
  // withdraw: 0,
};
// console.log(initialState);
const reducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "openAccount":
      return { ...initialState, balance: 500, isActive: true };
    case "deposit":
      return {
        ...state,
        deposit: 150,
        isActive: true,
        balance:
          state.balance > 0 ? state.balance + state.deposit : state.balance,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload.withdraw,
      };
    case "requestLoan":
      return {
        ...state,
        balance: state.balance + action.payload.requestLoan,
        loan: state.loan + action.payload.requestLoan,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: state.loan - state.loan,
      };
    case "closeAccount":
      if (state.balance === 0 && state.loan === 0) {
        return { ...initialState };
      }
      return state;
    default:
      throw new Error("Action unkonwn");
  }
};

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      {}
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      {!isActive ? (
        <p>
          {}
          <button
            onClick={() => {
              dispatch({ type: "openAccount" });
            }}
            disabled={false}
          >
            Open account
          </button>
        </p>
      ) : (
        <>
          <p>
            <button
              onClick={() => {
                dispatch({ type: "deposit" });
              }}
              disabled={false}
            >
              Deposit 150
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: "withdraw", payload: { withdraw: 50 } });
              }}
              disabled={false}
            >
              Withdraw 50
            </button>
          </p>

          <p>
            <button
              onClick={() => {
                dispatch({
                  type: "requestLoan",
                  payload: { requestLoan: 5000 },
                });
              }}
              disabled={false}
            >
              Request a loan of 5000
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: "payLoan" });
              }}
              disabled={loan === 0}
            >
              Pay loan
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: "closeAccount" });
              }}
              disabled={false}
            >
              Close account
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
