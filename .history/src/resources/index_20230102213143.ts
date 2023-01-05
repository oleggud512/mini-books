import { HttpClient } from 'aurelia-fetch-client';
import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
  //config.globalResources([]);
  config.container.registerSingleton(HttpClient, () => {
    return new HttpClient().configure(conf => {
      conf.baseUrl = "http://localhost:5000/"
    })
  })
}
