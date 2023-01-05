import { Router, RouterConfiguration, RouteConfig } from "aurelia-router"
import { PLATFORM } from 'aurelia-framework'

// пушк. 56
// алчевских 9/11 (королева)
// площадь конституции возле кукольного театра
// пр. науки 36
/*
*/
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
        route: 'book/:bid/:cid',
        name: 'chapterView',
        moduleId: PLATFORM.moduleName('./features/chapters/presentation/chapter-view'),
        title: "EDIT CHAPTER"
      },
      {
        route: 'book/:bid',
        name: 'bookView',
        moduleId: PLATFORM.moduleName('./features/books/presentation/book/book-view'),
        // nav: true,
        title: "BOOK",
      },
      // {
      //   route: 'book/:bid?/edit',
      //   name: 'bookEditView',
      //   moduleId: PLATFORM.moduleName('./features/books/presentation/book/book-view'),
      //   title: "EDIT BOOK",
      // },
      {
        route: "something/:bid/other/:cid",
        name: "something",
        moduleId: PLATFORM.moduleName('./features/chapters/presentation/chapter-view'),
        title: "EDIT CHAPTER"
      }
    ] as RouteConfig[])
    this.router = router;
  }
}