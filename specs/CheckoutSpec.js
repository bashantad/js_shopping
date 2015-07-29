(function () {
  'use strict';

  describe('Checkout', function () {

    describe('Valid item', function(){
      it('should not throw an exception with valid price', function(){
        expect(function() {
          var item = new Item('mbp', 'MacBook Pro', '1399.99');
        }).not.toThrow();
      });

    });

    describe('Invalid item', function(){

      it('should throw an error with invalid price', function(){
        expect(function() {
          var item = new Item('mbp', 'MacBook Pro', 'Twinty Dollars');
        }).toThrow();
      });

    });

    describe('Item', function() {
      var item;
      beforeEach(function(){
        item = new Item('ipd', 'Super iPad', '549.99');
      });

      it('should initialize code', function () {
        expect(item.code).toEqual('ipd');
      });

      it('should initialize name', function () {
        expect(item.name).toEqual('Super iPad');
      });

      it('should initialize price', function () {
        expect(item.price).toEqual(549.99);
      });

    });

    describe('scan()', function(){
      var co;
      beforeAll(function(){
        co = new Checkout();
      });

      it('When item object is scanned, it should add in cart', function () {
        var ipd = new Item('ipd', 'Super iPad', '549.99');
        expect(function() {
          co.scan(ipd);
        }).not.toThrow();
      });

      it('When non-item object is scanned, it should throw an error', function(){
        expect(function() {
          co.scan('Invalid input')
        }).toThrow();
      });

    });

    describe('total()', function(){
      var ipd, mbp, atv, vga, co, i;

      beforeAll(function(){
        ipd = new Item('ipd', 'Super iPad', '549.99');
        mbp = new Item('mbp', 'MacBook Pro', '1399.99');
        atv = new Item('atv', 'Apple TV', '109.50');
        vga = new Item('vga', 'VGA adapter', '30.00');
      });

      beforeEach(function(){
        co = new Checkout();
      });

      describe('When no items are scanned', function(){

        it('it should not cost anything', function(){
          expect(co.total()).toEqual('$0.00');
        });

      });

      describe('Apple TV', function(){

        it('When 2 TVs are scanned, it should cost price of 2', function () {
          co.scan(atv);
          co.scan(atv);
          expect(co.total()).toEqual('$219.00');
        });

        it('When 3 TVs are scanned, it should cost price of 2 (1 would be free)', function(){
          for (i = 0; i < 3; i++) {
            co.scan(atv);
          }

          expect(co.total()).toEqual('$219.00');
        });

      });

      describe('Super iPad', function(){

        it('When 4 ipads are scanned, it should cost 549.99 * 4', function(){
          for(i = 0; i < 4; i++){
            co.scan(ipd);
          }

          expect(co.total()).toEqual('$2199.96')
        });

        it('When 5 ipads are scanned, it should cost 499 * 5 due to bulk discount', function(){
          for(i = 0; i < 5; i++){
            co.scan(ipd);
          }

          expect(co.total()).toEqual('$2499.95');
        });

      });

      describe('MacBook Pro  and VGA ', function(){
        it('When a macbook pro is scanned, VGA should be free', function(){
          co.scan(mbp);
          co.scan(vga);
          expect(co.total()).toEqual('$1399.99');
        });

        it('When no. of macbook pro < no. of VGA, it should cost  mbp + (no of vga - no of mbp) * cost of vga', function(){
          for(i = 0; i < 2; i++){
            co.scan(mbp);
          }

          for(i = 0; i < 3; i++){
            co.scan(vga);
          }

          expect(co.total()).toEqual('$2829.98');
        });

        it('When no. of VGA < no. of mbp, it should cost price of mbp only', function(){
          for(i = 0; i < 3; i++){
            co.scan(mbp);
          }

          for(i = 0; i < 2; i++){
            co.scan(vga);
          }

          expect(co.total()).toEqual('$4199.97');
        });

      });

      describe('Integration specs', function() {

        it('When atv, atv, atv, vga are scanned, it should cost $249.00', function () {
          var test1 = [atv, atv, atv, vga];
          for (i = 0; i < test1.length; i++) {
            co.scan(test1[i]);
          }

          expect(co.total()).toEqual('$249.00');
        });

        it('When atv, ipd, ipd, atv, ipd, ipd, ipd are scanned, it should cost $2718.95', function(){
          var test2  = [atv, ipd, ipd, atv, ipd, ipd, ipd];
          for (i = 0; i < test2.length; i++) {
            co.scan(test2[i]);
          }

          expect(co.total()).toEqual('$2718.95');
        });

        it('When mbp, vga, ipd are scanned, it should cost $1949.98', function(){
          var test3 = [mbp, vga, ipd];
          for (i = 0; i < test3.length; i++) {
            co.scan(test3[i]);
          }

          expect(co.total()).toEqual('$1949.98');
        });

      });

    });

  });

})();


