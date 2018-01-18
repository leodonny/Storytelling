import {
  Component,
  OnInit,
  Inject,
  ViewChildren,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  HostListener
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WindowResizeService } from '../../services/window-resize.service';

import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
import { SlidesService } from '../../services/slides.service';
import { ImagesService } from '../../services/images.service';
import {
  BarChartComponent,
  ForceDirectedGraphComponent,
  LineChartComponent,
  HierarchicalEdgeBundlingComponent
} from '../../../../charts';

import { PageConfig, HALF_HALF_LAYOUT, FULL_LAYOUT} from './pageConfig';

import { slideTransition } from './slide.animation';
import * as screenfull from 'screenfull';
@Component({
  selector: 'app-slides-view',
  templateUrl: './slides-view.component.html',
  styleUrls: ['./slides-view.component.scss'],
  animations: [slideTransition()],
  providers: [WindowResizeService, SlidesService]
})
export class SlidesViewComponent implements OnInit {
  slides: Array<any> = [];
  slideTitle: String;
  slideHeight_style: any = {
    height: '72px'
  };
  contentHeight_style: any = {
    height: '72px'
  };
  slideHeight: number;
  curSlideIndex: number = 0;
  direction: number = 1;
  currentSlide: any;
  gridConfig : any;
  slideNum: number;
  charts: Array<any> = [];
  screenfull: any;
  showFullScreen: boolean = false;
  slideload$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  slideease$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @ViewChildren('chart') chartEle: any;

  @ViewChild('slider', { read: ViewContainerRef })
  slider: ViewContainerRef;

  constructor(
    private windowResizeService: WindowResizeService,
    private slidesService: SlidesService,
    private imagesService: ImagesService,
    @Inject(DOCUMENT) private document: any,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.windowResizeService.height$.subscribe(height => {
      this.slideHeight_style = {
        height: height - 70 + 'px' //70 is the height of header
      };
      this.contentHeight_style = {
        height: height - 70 - 50 + 'px'
      };
      this.slideHeight = height - 70;
    });
    this.screenfull = screenfull;
  }
  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    /* generate and initialize slides*/
    this.slidesService.getSlides(id).subscribe(
      slide => {
        console.log(slide);
        this.slides = slide.slides;
        this.slideNum = this.slides.length;
        this.slideTitle = slide.slidesSetting.title;
      },
      error => {}
    );
    window.scrollTo(0, 0); //scroll to top everytime open the slides
    this.gridConfig = {
      gridType: 'fit',
      compactType: 'none',
      margin: 5,
      outerMargin: true,
      mobileBreakpoint: 640,
      minCols: 10,
      maxCols: 20,
      minRows: 10,
      maxRows: 20,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 25,
      fixedRowHeight: 25,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      draggable: {
        delayStart: 0,
        enabled: false,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: undefined
      },
      resizable: {
        delayStart: 0,
        enabled: false,
        stop: undefined,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      },
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: 'onDrag&Resize',
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

  }

  lastSlide() {
    this.curSlideIndex = this.getCurSlideIndex();
    if (this.curSlideIndex > 0) {
      this.slideease$.next(this.curSlideIndex);
      this.curSlideIndex--;
      this.slideload$.next(this.curSlideIndex);
    }
  }

  nextSlide() {
    this.curSlideIndex = this.getCurSlideIndex();
    if (this.curSlideIndex < this.slideNum) {
      this.slideease$.next(this.curSlideIndex);
      this.curSlideIndex++;
      this.slideload$.next(this.curSlideIndex);
      /*add animation to text content*/
    }
  }

  scroll2Slide(event) {
    let scrollDis = document.body.scrollTop;
    let curIndex = Math.round(scrollDis / this.slideHeight);
    if (curIndex !== this.curSlideIndex) {
      this.slideease$.next(this.curSlideIndex);
      this.slideload$.next(curIndex);
      this.curSlideIndex = curIndex;
    }
  }

  switchSlide(direction: number) {
    let nextIndex = this.curSlideIndex + direction;
    if (nextIndex >= 0 && nextIndex <= this.slideNum) {
      this.curSlideIndex = nextIndex;
      this.currentSlide = this.slides[this.curSlideIndex - 1];
      this.direction = direction;
    }
    //hide full screen
    this.showFullScreen = false;
  }

  animationDone(event: any) {
    //  this.direction = 0; ==> if add this line, will get error:ExpressionChangedAfterItHasBeenCheckedError
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showFullScreen = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.showFullScreen = false;
  }

  staySlideProcess() {}

  onClick() {
    if (this.screenfull.enabled) {
      this.screenfull.toggle(this.slider.element.nativeElement);
    }
  }

  private getCurSlideIndex(): number {
    let scrollDis = document.body.scrollTop;
    let curIndex = Math.round(scrollDis / this.slideHeight);
    return curIndex;
  }

  check() {
    return true;
  }
}