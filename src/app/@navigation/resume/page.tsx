import MainNavigation from "@/components/MainNavigation";
import { getHasChosenTheme, userTheme } from "@/util/cookies";

export default function Page() {
  const theme = userTheme();
  const hasChosenTheme = getHasChosenTheme();

  return (
    <div>
      <MainNavigation
        isResume
        initialTheme={theme}
        hasChosenTheme={hasChosenTheme}
      />
    </div>
  );
}
