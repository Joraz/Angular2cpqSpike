import { Angular2CpqSpikePage } from './app.po';

describe('angular2-cpq-spike App', function() {
  let page: Angular2CpqSpikePage;

  beforeEach(() => {
    page = new Angular2CpqSpikePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angular2-cpq-spike works!');
  });
});
