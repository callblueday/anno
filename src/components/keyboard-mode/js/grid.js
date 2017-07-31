import GridSelector from './gridSelector';

const extend = ( a, b ) => {
  for( var key in b ) {
    if( b.hasOwnProperty( key ) ) {
      a[key] = b[key];
    }
  }
  return a;
}

class Grid {
  constructor() {
    let self = this;
    this.config = {
      items : Array.prototype.slice.call( document.querySelectorAll( '#gt-grid > div' ) ),
      gridSel : new GridSelector( document.getElementById( 'gt-grid-selector' ), {
        onClick : function() { self.initGrid(); }
      } )
    };

    this.defaults = {
      transition : false,
      speed : 300,
      delay : 0
    };
  }

  init (options) {
    let self = this;
    self.config.options = extend( self.defaults, options );
    self.initGrid();
    if( self.config.options.transition ) {
      setTimeout( function() {
        self.config.items.forEach( function( el, i ) {
          el.style.WebkitTransition = 'all ' + self.config.options.speed + 'ms ' + ( i * self.config.options.delay ) + 'ms';
          el.style.MozTransition = 'all ' + self.config.options.speed + 'ms ' + ( i * self.config.options.delay ) + 'ms';
          el.style.transition = 'all ' + self.config.options.speed + 'ms ' + ( i * self.config.options.delay ) + 'ms';
        } );
      }, 25 );
    }
  }

  initGrid () {
    let self = this;
    var rows = self.config.gridSel.rows,
      columns = self.config.gridSel.columns;

    self.config.items.forEach( function( el, i ) {
      el.style.position = 'absolute';

      var elpos = self.config.items.indexOf( el ),
        current_row = Math.floor( elpos / self.config.gridSel.maxcolumns ),
        current_column = elpos - current_row * self.config.gridSel.maxcolumns,
        width =  100 / columns,
        height = 100 / rows;

      if( current_row < rows && current_column < columns ) {
        //if( Modernizr.csscalc ) {
        //  el.style.width = '-webkit-calc(' + width + '% + 1px)';
        //  el.style.height = '-webkit-calc(' + height + '% + 1px)';
        //  el.style.width = '-moz-calc(' + width + '% + 1px)';
        //  el.style.height = '-moz-calc(' + height + '% + 1px)';
        //  el.style.width = 'calc(' + width + '% + 1px)';
        //  el.style.height = 'calc(' + height + '% + 1px)';
        //}
        //else  {
          el.style.width = width + .5 + '%';
          el.style.height = height + .5 + '%';
        //}

        el.style.left = width * ( current_column ) + '%';
        el.style.top = height * ( current_row ) + '%';

        classie.remove( el, 'gt-hidden' );
        classie.add( el, 'gt-visible' );
      }
      else {
        classie.remove( el, 'gt-visible' );
        classie.add( el, 'gt-hidden' );
      }
    } );
  }
}

export default Grid;