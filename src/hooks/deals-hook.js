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

  const filteredDeals = allDeals.reduce(
    (acc, el) => {
      acc[el.stage].data.push(el);
      acc[el.stage].amount =
        acc[el.stage].amount + parseInt(el.amount || 0);
      return acc;
    },
    {
      Qualified: { data: [], amount: 0 },
      Negotiations: { data: [], amount: 0 },
      Contract: { data: [], amount: 0 },
      Closed: { data: [], amount: 0 },
    }
  );

  return {
    allDeals,
    filteredDeals,
  };
}
export default useDeals;
