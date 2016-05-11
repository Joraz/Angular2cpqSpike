export class Angular2CpqSpikePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-cpq-spike-app h1')).getText();
  }
}
