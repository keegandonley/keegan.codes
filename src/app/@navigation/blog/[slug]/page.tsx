import MainNavigation from "@/components/MainNavigation";
import { getHasChosenTheme, userTheme } from "@/util/cookies";

export default function NavigationPage() {
  const theme = userTheme();
  const hasChosenTheme = getHasChosenTheme();

  return (
    <div>
      <MainNavigation
        isBlogPage
        initialTheme={theme}
        hasChosenTheme={hasChosenTheme}
      />
    </div>
  );
}
