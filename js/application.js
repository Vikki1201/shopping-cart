// calculate amount 

var calculateSum = function (ele) {

  var quantityItem = parseFloat($(ele).find('.quantity input').val());
  var priceItem = parseFloat($(ele).find('.price').text().replace(/\$/,""));

  var subTotal = quantityItem * priceItem;
  if (subTotal >= 0) {
    $(ele).find('.quantityPrice').html(`$${parseFloat(Math.round(subTotal * 100) / 100).toFixed(2)}`);
  }
  return subTotal;

};


// calculate total price

var sum = function (acc, x) {
  return acc + x;
};

var updateCart = function () {
  var allSubTotals = [];

  $("tbody tr").each(function (i, ele) {
    var subTotal = calculateSum(ele);
    allSubTotals.push(subTotal || 0); 
  });

  if (allSubTotals.length == 0) {
    $("#totalPrice").html(`--`);
  } else {
    var totalCart = allSubTotals.reduce(sum);
    $("#totalPrice").html(`$${parseFloat(Math.round(totalCart * 100) / 100).toFixed(2)}`);
  }
};

// download page, remove and add items 
$(document).ready(function () {

  updateCart();

  $(document).on('click', '.btn.remove', function(event) {
    $(this).closest('tr').remove();
    updateCart();
  });

  var timeout;
    $("body").on("input", "tr input", function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
      updateCart();
    }, 500);
  });

  $('#addItem').on('submit', function(event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var price = $(this).children('[name=price]').val();
    var quantity = $(this).children('[name=quantity]').val();

    $('tbody').append('<tr>' +
    '<td class="name">' + name + '</td>' +
    '<td class="price"> $' + price + '.00</td>' +
    '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' +
    '<td><button class="btn btn-warning btn-sm remove">remove</button></td>' +
    '<td class="quantityPrice"></td>' +
    '</tr>');

    updateCart();
    $(this).children('[name=name]').val('');
    $(this).children('[name=price]').val('');
    $(this).children('[name=quantity]').val('');
  });
});

  

