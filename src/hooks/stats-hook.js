import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getUserStreak } from "../graphql/customQueries";

export default function useStats(user) {
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    let streakResponse;
    let streakDate;

    const getStreak = async () => {
      streakResponse = await API.graphql(
        graphqlOperation(getUserStreak, { id: user.attributes.sub })
      );
      setStreakCount(parseInt(streakResponse.data.getUser.streakCount));
      streakDate = new Date(streakResponse.data.getUser.streakDate);
      setStreakDate(streakDate);
      return streakResponse.data.getUser;
    };
    getStreak();
  }, []);

  
}
