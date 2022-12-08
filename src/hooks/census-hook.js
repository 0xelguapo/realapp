import { useEffect, useState } from "react";

import { CENSUS_VARIABLES, MAPPED_TITLES, MAPPED_TITLES_WITH_CATEGORY } from "../utility/census";

const KEY = "52a1cdb690a176f1610acecf067b4c68f77f5677";

function getACS5SubjectVariables() {
  let allVariables = [];
  for (const property in CENSUS_VARIABLES["subject"]) {
    allVariables.push(
      ...CENSUS_VARIABLES["subject"][property].map((item) => item.variable)
    );
  }
  return allVariables.join(",");
}

function getACS5DetailVariables() {
  let allVariables = [];
  for (const property in CENSUS_VARIABLES["detailed"]) {
    allVariables.push(
      ...CENSUS_VARIABLES["detailed"][property].map((item) => item.variable)
    );
  }
  return allVariables.join(",");
}

export default function useCensus(zipCode) {
  const [isLoading, setIsLoading] = useState(true);
  const [censusData, setCensusData] = useState([]);

  const ACS5_DETAIL = `https://api.census.gov/data/2020/acs/acs5?&get=${getACS5DetailVariables()}&for=zip%20code%20tabulation%20area:${zipCode}&key=${KEY}`;
  const ACS5_SUBJECT = `https://api.census.gov/data/2020/acs/acs5/subject?&get=${getACS5SubjectVariables()}&for=zip%20code%20tabulation%20area:${zipCode}&key=${KEY}`;

  useEffect(() => {
    const grabCensus = async () => {
      let subjectResponse;
      let detailResponse;
      try {
        subjectResponse = await fetch(ACS5_SUBJECT, { method: "GET" });
        detailResponse = await fetch(ACS5_DETAIL, { method: "GET" });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      let parsedSubject = await subjectResponse.json();
      let parsedDetail = await detailResponse.json();
      parsedSubject[0].pop();
      parsedDetail[0].pop();
      parsedSubject[1].pop();
      parsedDetail[1].pop();

      let finalArray = [];
      let finalObj = {}

      // for(let i = 0; i < parsedSubject[0].length; i++) {
      //   const currentVariable = parsedSubject[0][i];
      //   const currentValue = parsedSubject[1][i];

      //   const currentCategory = finalObj[MAPPED_TITLES_WITH_CATEGORY[currentVariable].category];
      //   const currentTitle = MAPPED_TITLES_WITH_CATEGORY[currentVariable].title
      //   if(!currentCategory) {
      //     finalObj[MAPPED_TITLES_WITH_CATEGORY[currentVariable].category] = [{ title: currentTitle, value: currentValue}]
      //   } else {
      //     currentCategory.push({ title: currentTitle, value: currentValue})
      //   }
      // }

      // for(let i = 0; i < parsedDetail[0].length; i++) {
      //   const currentVariable = parsedDetail[0][i];
      //   const currentValue = parsedDetail[1][i];

      //   const currentCategory = finalObj[MAPPED_TITLES_WITH_CATEGORY[currentVariable].category];
      //   const currentTitle = MAPPED_TITLES_WITH_CATEGORY[currentVariable].title
      //   if(!currentCategory) {
      //     finalObj[MAPPED_TITLES_WITH_CATEGORY[currentVariable].category] = [{ title: currentTitle, value: currentValue}]
      //   } else {
      //     currentCategory.push({ title: currentTitle, value: currentValue})
      //   }
      // }

      // console.log(finalObj)

      for (let i = 0; i < parsedSubject[0].length; i++) {
        let subObj = {};
        subObj.value = parsedSubject[1][i];
        subObj.title = MAPPED_TITLES_WITH_CATEGORY[parsedSubject[0][i]].title
        subObj.variable = parsedSubject[0][i];
        subObj.category = MAPPED_TITLES_WITH_CATEGORY[parsedSubject[0][i]].category;
        finalArray.push(subObj);
      }

      for (let i = 0; i < parsedDetail[0].length; i++) {
        let detailObj = {};
        detailObj.category = MAPPED_TITLES_WITH_CATEGORY[parsedDetail[0][i]].category
        detailObj.value = parsedDetail[1][i];
        detailObj.title = MAPPED_TITLES_WITH_CATEGORY[parsedDetail[0][i]].title
        detailObj.variable = parsedDetail[0][i];
        finalArray.push(detailObj);
      }

      console.log(finalArray)
      setCensusData(finalArray);
      return subjectResponse;
    };
    grabCensus();
  }, []);

  return { isLoading, censusData };
}
