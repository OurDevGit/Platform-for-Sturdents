import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from "@angular/core";
import { MenuModel } from "./menu-model";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "px-gdn-multimenu",
  templateUrl: "./multimenu.component.html",
  styleUrls: ["./multimenu.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MultimenuComponent implements OnInit {
  // Model with menu items
  @Input()
  menuModel: MenuModel[];
  // Set true for compact mode
  @HostBinding("class.small-menu")
  isSmallMenu;
  // Store the items, that has pointer near it
  pointedMenuItem;
  // Query with menu item elements
  @ViewChildren("menuItem")
  pointedListItem: QueryList<any>;
  // Pointer element reference
  @ViewChild("pointer", { static: false })
  pointer: ElementRef;
  // Temporary stores states of items while menu is collapsed in compact mode
  openStates;
  // Informs when menu collapses
  @Output()
  collapse: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    let firstCall = true;
    let onNavigation = () => {
      this.menuModel.forEach(d => this.checkSelection(d));
      this.menuModel.forEach(d => this.findPointedMenuItem(d, true));
      this.movePointer();
      if (firstCall) {
        this.onMouseLeave();
        firstCall = false;
      }
    };
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        onNavigation();
      }
    });
    setTimeout(() => onNavigation());
  }

  /**
   * Set selected flag to model if any of children is selected.
   * @param {MenuModel} item
   */
  checkSelection(item: MenuModel) {
    item.selected =
      item.routerUrl && this.router.isActive(item.routerUrl, true);
    let childrenSelected = false;
    if (item.children) {
      childrenSelected = item.children.reduce((accumulator, item) => {
        this.checkSelection(item);
        return item.selected || accumulator;
      }, false);
      item.selected = item.selected || childrenSelected;
    }
    if (item.selected) {
      item.opened = true;
    }
  }

  /**
   * Opens menu and moves pointer
   * @param item
   */
  toggleOpen(item) {
    item.opened = !item.opened;
    this.menuModel.forEach(d => this.findPointedMenuItem(d, true));
    this.movePointer();
  }

  /**
   * Finds menu items, that is selected
   * @param item
   * @param parentOpened
   */
  findPointedMenuItem(item, parentOpened) {
    if (item.selected && parentOpened) {
      this.pointedMenuItem = item;
    }
    if (item.opened && item.children) {
      item.children.forEach(d => this.findPointedMenuItem(d, item.opened));
    }
  }

  /**
   * Moves pointer to selected item
   */
  movePointer() {
    let moveFunction = () => {
      let killer = this.pointedListItem['_results']
      let pointed = killer.find((item, index) => 
        killer[31].nativeElement.classList.contains("pointed")?
          index === 31
          :
          killer[32].nativeElement.classList.contains("pointed")?
            index === 32
            :
            item.nativeElement.classList.contains("pointed")
      ).nativeElement;
      if(pointed.offsetTop===50 && pointed.firstElementChild.children[1].innerText!=='Academic Group')
        this.pointer.nativeElement.style.top = (pointed.offsetTop+750) + "px";
      else if(pointed.offsetTop===100 && pointed.firstElementChild.children[1].innerText!=='Calendar')
        this.pointer.nativeElement.style.top = (pointed.offsetTop+750) + "px";
      else this.pointer.nativeElement.style.top = pointed.offsetTop + "px";
    };
    // Move pointer 2 times - before open animation and after
    setTimeout(moveFunction, 0);
    setTimeout(moveFunction, 350);
  }

  /**
   * Changes menu mode
   * @param value
   */
  @Input()
  set smallMenu(value) {
    if (value) {
      this.isSmallMenu = value;
      this.onMouseLeave();
    } else {
      this.onMouseEnter();
      this.isSmallMenu = value;
    }
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    if (this.isSmallMenu) {
      this.menuModel.forEach((item, i) => {
        item.opened = this.openStates[i];
      });
      this.menuModel.forEach(d => this.findPointedMenuItem(d, true));
      this.movePointer();
      this.openStates = null;
      this.collapse.emit(false);
    }
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    if (this.isSmallMenu) {
      this.openStates = this.menuModel.map(item => {
        let state = item.opened;
        item.opened = false;
        return state;
      });
      this.menuModel.forEach(d => this.findPointedMenuItem(d, true));
      this.movePointer();
      this.collapse.emit(false);
    }
  }
}
