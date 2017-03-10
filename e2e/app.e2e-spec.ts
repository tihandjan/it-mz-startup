import { ItMzStartupPage } from './app.po';

describe('it-mz-startup App', function() {
  let page: ItMzStartupPage;

  beforeEach(() => {
    page = new ItMzStartupPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
