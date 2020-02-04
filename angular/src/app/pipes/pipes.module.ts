import { NgModule } from "@angular/core";

// Pipes
import { DotizePipe } from "./dotize.pipe";

@NgModule({
  declarations: [DotizePipe],
  imports: [],
  exports: [DotizePipe]
})
export class PipesModule {}
