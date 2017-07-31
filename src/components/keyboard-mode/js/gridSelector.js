const extend = function ( a, b ) {
  for( var key in b ) {
    if( b.hasOwnProperty( key ) ) {
      a[key] = b[key];
    }
  }
  return a;
}

class GridSelector {
  constructor(el, options) {
    this.defaults = {
      rows : 5,
      columns : 5,
      maxcolumns : 5,
      onClick : function () { return false; }
    };
    this.el = el;
    this.options = extend( this.defaults, options );
    if(this.el) {
      this.init();
    }
  }

  init () {
    this.trigger =  this.el.querySelector( 'span.gt-grid-icon' );
    this.gridItems = Array.prototype.slice.call( this.el.querySelectorAll( 'div.gt-grid-select > div' ) );
    this.setRowsColumns( this.options.rows, this.options.columns );
    this.maxcolumns = this.options.maxcolumns;
    this.gridItems.forEach( function( el, i ) {
      classie.add( el, 'gt-grid-selected' );
    } );
    this.initEvents();
  }

  initEvents () {
    var self = this;
    if( Modernizr.touch ) {
      this.trigger.addEventListener( 'click', function( ev ) { classie.add( self.el, 'gt-grid-control-open' ); } );
    }

    this.gridItems.forEach( function( el, i ) {
      el.addEventListener( 'mouseover', function(ev) {
        self.highlightGridItems( self.gridItems.indexOf( this ) );
      } );

      el.addEventListener( 'click', function(ev) {
        self.selectGridItems( self.gridItems.indexOf( this ) );
        if( Modernizr.touch ) {
          classie.remove( self.el, 'gt-grid-control-open' );
        }
      } );
    });
  }

  highlightGridItems ( pos ) {
    // item's row and column
    var self = this,
      itemRow = Math.floor( pos / this.options.maxcolumns ),
      itemColumn = pos - itemRow * this.options.maxcolumns;

    this.gridItems.forEach( function( el, i ) {
      // el's row and column
      var elpos = self.gridItems.indexOf( el ),
        elRow = Math.floor( elpos / self.options.maxcolumns ),
        elColumn = elpos - elRow * self.options.maxcolumns;

      if( elRow <= itemRow && elColumn <= itemColumn) {
        classie.add( el, 'gt-grid-hover' );
      }
      else {
        classie.remove( el, 'gt-grid-hover' );
      }
    } );
  }

  selectGridItems ( pos ) {
    var self = this;
    this.gridItems.forEach( function( el, i ) {
      if( classie.has( el, 'gt-grid-hover' ) ) {
        classie.add( el, 'gt-grid-selected' );
      }
      else {
        classie.remove( el, 'gt-grid-selected' );
      }
    } );
    var r = this.rows = Math.floor( pos / this.options.maxcolumns ),
      c = this.columns = pos - this.rows * this.options.maxcolumns;

    this.setRowsColumns( r + 1, c + 1 );
    this.options.onClick();
  }

  setRowsColumns ( rows, columns ) {
    this.rows = rows;
    this.columns = columns;
  }
}

export default GridSelector;
