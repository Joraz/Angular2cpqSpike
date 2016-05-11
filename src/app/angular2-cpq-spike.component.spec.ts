import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2CpqSpikeAppComponent } from '../app/angular2-cpq-spike.component';

beforeEachProviders(() => [Angular2CpqSpikeAppComponent]);

describe('App: Angular2CpqSpike', () => {
  it('should create the app',
      inject([Angular2CpqSpikeAppComponent], (app: Angular2CpqSpikeAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular2-cpq-spike works!\'',
      inject([Angular2CpqSpikeAppComponent], (app: Angular2CpqSpikeAppComponent) => {
    expect(app.title).toEqual('angular2-cpq-spike works!');
  }));
});
