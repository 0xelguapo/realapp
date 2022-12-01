import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDeals, selectAllDeals } from "../redux/deals-slice";

const STAGES = ['Qualified', 'In Negotiations', 'Under Contract', 'Closed']

function useDeals() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeals());
  }, []);

  const allDeals = useSelector(selectAllDeals);

  const qualifiedDeals = allDeals.reduce((acc, el) => {
    console.log(el.stage)
    if(el.stage === STAGES[0]) {
      acc.push(el)
    }
  }, [])

  return { allDeals, qualifiedDeals }
}
export default useDeals;
