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
  if (!state.isActive && action.type !== "openAccount") return state;

  switch (action.type) {
    case "openAccount":
      return { ...initialState, balance: 500, isActive: true };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "requestLoan":
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: action.payload,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };
    case "closeAccount":
      if (state.balance === 0 && state.loan > 0) {
        return { ...initialState };
      }
      break;
    default:
      throw new Error("Action unkonwn");
  }
};

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(isActive);
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
                dispatch({ type: "deposit", payload: 150 });
              }}
              disabled={false}
            >
              Deposit 150
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: "withdraw", payload: 50 });
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
                  payload: 5000,
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
