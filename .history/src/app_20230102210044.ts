import { Router, RouterConfiguration, RouteConfig } from "aurelia-router"
import { PLATFORM } from 'aurelia-framework'

// пушк. 56
// алчевских 9/11 (королева)
// площадь конституции возле кукольного театра
// пр. науки 36
/*
1. Нужно отображать названия глав. 
Кому нахуй нужны главы если нет книги?
1. Добавлять / редактировать главу. 
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
        route: 'book/:bid',
        name: 'bookView',
        moduleId: PLATFORM.moduleName('./features/books/presentation/book/book-view'),
        // nav: true,
        title: "BOOK",
      },
      {
        route: 'book/:bid/edit',
        name: 'bookEditView',
        moduleId: PLATFORM.moduleName('./features/books/presentation/book/book-view'),
        title: "EDIT BOOK"
      },

      {
        route: 'book/:bid/chapters/:cid',
        name: 'chapter',
        moduleId: PLATFORM.moduleName('./features/chapters/presentation/chapter/chapter-view')
      }
    ] as RouteConfig[])
    this.router = router;
  }
}