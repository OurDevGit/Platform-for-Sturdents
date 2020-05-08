import {
  animate,
  query,
  style,
  transition,
  trigger
} from "@angular/animations";
// Page change animation
export const routerTransition = trigger("routerTransition", [
  transition("* => *", [
    query(":enter", [
      // css styles at start of transition
      style({ opacity: 0 }),
      // animation and styles at end of transition
      animate(".3s", style({ opacity: 1 }))
    ])
  ])
]);
