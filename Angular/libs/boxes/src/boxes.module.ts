import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  MatTooltipModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatToolbarModule,
  MatDialogModule,
  MatCheckboxModule,
  MatStepperModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  BarChartComponent,
  LineChartComponent,
  ForceDirectedGraphComponent,
  HierarchicalEdgeBundlingComponent,
  PieChartComponent,
  PieGridChartComponent,
  NumberCardComponent,
  GaugeChartComponent,
  AdvancedPieChartComponent,
  DendogramComponent,
  NgGraphComponent,
  TreemapChartComponent,
  ZoomableTreemapChartComponent,
  BubbleChartComponent,
  WordCloudComponent,
  SunburstChartComponent,
  AreaChartComponent
} from '@labdat/charts'

import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import { PieChartModule, GaugeModule, NgxChartsModule } from '@swimlane/ngx-charts';

import { CodemirrorModule } from 'ng4-codemirror/src';
import { DndModule } from 'ng2-dnd';
import { HotTableModule } from 'angular-handsontable';

import "../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js";
// import { SlidesSearchComponent } from './components/slides-list/slides-search/slides-search.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { ChartsBuilderComponent } from './components/charts-builder/charts-builder.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { GraphComponent } from './components/graph/graph.component';
import { GridsterModule } from 'angular-gridster2';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DragulaModule } from 'ng2-dragula';
//import { ToggleFullscreenDirective } from './components/slides-view/toggle-fullscreen.directive';
//import { ValidateOnBlurDirective } from './components/slides-editor-form/slides-setting/validate-on-blur.directive';
import { environment } from '../../../apps/default/src/environments/environment';
import { BoxesGridComponent } from './containers/boxes-grid/boxes-grid.component';
import { ChartsService } from '@labdat/charts/src/services/charts.service';

@NgModule({
    imports: [
      DragulaModule,
      CommonModule,
      MatTooltipModule,
      MatCheckboxModule,
      FormsModule,
      ReactiveFormsModule,
      PieChartModule,
      GaugeModule,
      NgxChartsModule,
      CodemirrorModule,
      FlexLayoutModule,
      DndModule.forRoot(),
      HotTableModule,
      FroalaEditorModule.forRoot(),
      FroalaViewModule.forRoot(),
      MatTooltipModule,
      MatCardModule,
      MatSelectModule,
      MatIconModule,
      MatButtonModule,
      MatChipsModule,
      MatToolbarModule,
      MatInputModule,
      HttpModule,
      MatDialogModule,
      RouterModule,
      GridsterModule,
      MatStepperModule ],
    entryComponents: [
      BarChartComponent,
      LineChartComponent,
      ForceDirectedGraphComponent,
      HierarchicalEdgeBundlingComponent,
      PieChartComponent,
      PieGridChartComponent,
      NumberCardComponent,
      GaugeChartComponent,
      AdvancedPieChartComponent,
      DendogramComponent,
      NgGraphComponent,
      TreemapChartComponent,
      ZoomableTreemapChartComponent,
      BubbleChartComponent,
      WordCloudComponent,
      SunburstChartComponent,
      AreaChartComponent,
      TextEditorComponent,
      ChartsBuilderComponent,
      MenuBarComponent,
      GraphComponent
      ],

    declarations: [
      BoxesGridComponent,
      BarChartComponent,
      ForceDirectedGraphComponent,
      LineChartComponent,
      ChartsBuilderComponent,
      GaugeChartComponent,
      AdvancedPieChartComponent,
      PieChartComponent,
      HierarchicalEdgeBundlingComponent,
      AreaChartComponent,
      PieGridChartComponent,
      NumberCardComponent,
      NgGraphComponent,
      TreemapChartComponent,
      ZoomableTreemapChartComponent,
      DendogramComponent,
      BubbleChartComponent,
      WordCloudComponent,
      SunburstChartComponent,
      GraphComponent,
      TextEditorComponent,
      MenuBarComponent,
    ],
    exports: [
      BoxesGridComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ OverlayContainer, ChartsService ]
    //  SlidesService, SlideService, SlideResolve, ImagesService, ChartsService, ValidService
})
export class BoxesModule {
  public static forRoot() {
    return {
      ngModule: BoxesModule,
      providers: [ OverlayContainer ]
      // , SlidesService, ImagesService, ChartsService, ValidService, SlideResolve
    };
  }
}

@NgModule({
  imports: [BoxesModule]
})
export class RootBoxesModule {}
