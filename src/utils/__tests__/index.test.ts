import { returnIconNameByScreen, returnScreenNameByRouteName, Screens } from "..";

test('Should return a icon name', () => {
    expect(returnIconNameByScreen[Screens.Home]).toBe('movie');
  });
  