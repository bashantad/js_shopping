// An Item class
var Item = function( code, name, price ) {
  this.code  = code;
  this.name  = name;
  if(isNaN(price)){
    throw "Price should be number";
  }

  this.price = Number(price);
};

var Checkout = function(){
  var totalPrice  = 0,
  basket      = {},

  //private methods
  _getNoOfItemsByCode =  function(itemCode){
    if(basket[itemCode] == undefined){
      return 0;
    }

    return basket[itemCode].length;
  },

  _getNoOfItemsByCode =  function(itemCode){
    if(basket[itemCode] == undefined){
      return 0;
    }

    return basket[itemCode].length;
  },

  _getItemPriceByCode = function(itemCode){
    if(basket[itemCode] == undefined){
      return 0;
    }

    return basket[itemCode][0].price;
  },

  _getItemPriceByCode = function(itemCode){
    if(basket[itemCode] == undefined){
      return 0;
    }

    return basket[itemCode][0].price;
  },

  _totalPriceOfAppleTv = function(){
    var noOfAppleTv  = _getNoOfItemsByCode("atv");
    return _getItemPriceByCode("atv") * (noOfAppleTv - Math.floor(noOfAppleTv/3));
  },

  _totalPriceOfIpad = function(){
    var noOfIpad      = _getNoOfItemsByCode("ipd");
    var ipadPrice     =  noOfIpad > 4 ? 499.99 : _getItemPriceByCode("ipd");
    return noOfIpad * ipadPrice;
  },

  _totalPriceOfMacBook = function(noOfMacbook){
    return noOfMacbook * _getItemPriceByCode("mbp");
  },

  _totalPriceOfVGA = function(noOfMacbook){
    var noOfVGA = _getNoOfItemsByCode("vga");

    if(noOfVGA > noOfMacbook){
      return (noOfVGA - noOfMacbook ) * _getItemPriceByCode("vga");
    }

    return 0;
  };

  //public methods
  this.scan = function(item){
    if(true != (item instanceof Item)){
      throw "can't add non-item object";
    }

    if (basket[item.code] == undefined) {
      basket[item.code] = []
    }
    basket[item.code].push(item);
  }

  this.total = function()
  {
    var noOfMacbook  = _getNoOfItemsByCode("mbp");
    totalPrice = _totalPriceOfAppleTv() + _totalPriceOfIpad() + _totalPriceOfMacBook(noOfMacbook) + _totalPriceOfVGA(noOfMacbook);
    return '$' + totalPrice.toFixed(2);
  }
};
