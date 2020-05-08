import { SofuPage } from './app.po';

describe('sofu App', () => {
  let page: SofuPage;

  beforeEach(() => {
    page = new SofuPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
