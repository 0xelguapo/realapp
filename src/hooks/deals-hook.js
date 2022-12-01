import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDeals, selectAllDeals } from "../redux/deals-slice";

const STAGES = ["Qualified", "Negotiations", "Contract", "Closed"];

function useDeals() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeals());
  }, []);

  const allDeals = useSelector(selectAllDeals);

  const qualifiedDeals = allDeals.reduce((acc, el) => {
    if (el.stage === STAGES[0]) {
      acc.push(el);
    }
    return acc;
  }, []);

  const negotiationsDeals = allDeals.reduce((acc, el) => {
    if (el.stage === STAGES[1]) {
      acc.push(el);
    }
    return acc;
  }, []);

  const contractDeals = allDeals.reduce((acc, el) => {
    if (el.stage === STAGES[2]) {
      acc.push(el);
    }
    return acc;
  }, []);

  const closedDeals = allDeals.reduce((acc, el) => {
    if(el.stage === STAGES[3]) {
      acc.push(el)
    }
     return acc
  }, [])

  return { allDeals, qualifiedDeals, negotiationsDeals, contractDeals, closedDeals};
}
export default useDeals;
