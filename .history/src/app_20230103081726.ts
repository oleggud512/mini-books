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
        route: 'books/:bid',
        name: 'bookView',
        moduleId: PLATFORM.moduleName('./features/books/presentation/book/book-view'),
        // nav: true,
        title: "BOOK",
      },
      {
        route: 'books/:bid/edit',
        name: 'bookEditView',
        moduleId: PLATFORM.moduleName('./features/books/presentation/book/book-view'),
        title: "EDIT BOOK",
        // navModel: {
        //   settings: {
        //     isEdit: true
        //   }
        // }
      },
      {
        route: 'books/add',
        name: 'bookAddView',
        moduleId: PLATFORM.moduleName('./features/books/presentation/book/book-view'),
        title: "ADD BOOK"
      },

      {
        route: 'books/:bid/chapters/:cid',
        name: 'chapterView',
        moduleId: PLATFORM.moduleName('./features/chapters/presentation/chapter-view'),
        title: "EDIT CHAPTER"
      },
      // {
      //   route: 'book/:bid/:cid/edit',
      //   name: 'chapterView',
      //   moduleId: PLATFORM.moduleName('./features/chapters/presentation/chapter-view'),
      //   title: "EDIT CHAPTER"
      // },
    ] as RouteConfig[])
    this.router = router;
  }
}