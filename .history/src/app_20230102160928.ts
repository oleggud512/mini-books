import { Router, RouterConfiguration, RouteConfig } from "aurelia-router"
import { PLATFORM } from 'aurelia-framework'

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Set from App!"
    config.options.pushState = true
    config.options.root = '/'
    config.map([
      { 
        route: '', 
        name: 'home', 
        moduleId: PLATFORM.moduleName('./features/books/presentation/books/book-list'), 
        nav: true,
        title: 'BOOKS' 
      },
      {
        route: 'book/:id',
        name: 'bookView',
        moduleId: PLATFORM.moduleName('./features/books/presentation/book/book-view'),
        // nav: true,
        title: "BOOK",
      }
    ] as RouteConfig[])
    
    this.router = router;
  }
}