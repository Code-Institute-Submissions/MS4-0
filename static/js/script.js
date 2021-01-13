// <----- MATERIALIZE TRIGGERS ----->

$(".dropdown-trigger").dropdown();


// <----- FILTER ON REGISTER ----->

// Nett / Gross Switch

$('#costSwitch').click(function () {
  if ($(this).is(':checked')) {
    $('.costGross, .giaGross').removeClass('hideCost');
    $('.costNett, .giaNett').addClass('hideCost');
  }
  else if ($(this).not(':checked')) {
    $('.costGross, .giaGross').addClass('hideCost');
    $('.costNett, .giaNett').removeClass('hideCost');
  }
})

// Accepted Filter
$("#approved").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('A')) {
    $('.changeStatus:contains("A")').parent('tr').removeClass('hideRowStatus')
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('A')) {
    $('.changeStatus:contains("A")').parent('tr').addClass('hideRowStatus');
  }
});

// Pending Filter
$("#pending").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('P')) {
    $('.changeStatus:contains("P")').parent('tr').removeClass('hideRowStatus')
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('P')) {
    $('.changeStatus:contains("P")').parent('tr').addClass('hideRowStatus');
  }
});

// WiP Filter
$("#wip").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('WiP')) {
    $('.changeStatus:contains("WiP")').parent('tr').removeClass('hideRowStatus')
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('P')) {
    $('.changeStatus:contains("WiP")').parent('tr').addClass('hideRowStatus');
  }
});

// Rejected Filter
$("#rejected").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('R')) {
    $('.changeStatus:contains("R")').parent('tr').removeClass('hideRowStatus')
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('R')) {
    $('.changeStatus:contains("R")').parent('tr').addClass('hideRowStatus');
  }
});

// CA Filter
$("#changeCA").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('CA')) {
    $('.changeType:contains("CA")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('CA')) {
    $('.changeType:contains("CA")').parent('tr').addClass('hideRowType');
  }
});

// CR Filter
$("#changeCR").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('CR')) {
    $('.changeType:contains("CR")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('CR')) {
    $('.changeType:contains("CR")').parent('tr').addClass('hideRowType');
  }
});

// DD Filter
$("#changeDD").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('DD')) {
    $('.changeType:contains("DD")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('DD')) {
    $('.changeType:contains("DD")').parent('tr').addClass('hideRowType');
  }
});

// PA Filter
$("#changePA").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('PA')) {
    $('.changeType:contains("PA")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('PA')) {
    $('.changeType:contains("PA")').parent('tr').addClass('hideRowType');
  }
});

// EW Filter
$("#changeEW").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('EW')) {
    $('.changeType:contains("EW")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('P')) {
    $('.changeType:contains("EW")').parent('tr').addClass('hideRowType');
  }
});

// VE Filter
$("#changeVE").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('VE')) {
    $('.changeType:contains("VE")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('VE')) {
    $('.changeType:contains("VE")').parent('tr').addClass('hideRowType');
  }
});


// Period Filter - New in last 30 days

$(document).ready(function () {
  $('tr > .dateAdded').each(function (i) {
    const ISOdate = $('.dateAdded').eq(i).text()
    const ISOdateYear = ISOdate.slice(0, 4);
    const ISOdateMonth = ISOdate.slice(5, 7) - 1;
    const ISOdateDay = ISOdate.slice(8, 10);
    const date = new Date(ISOdateYear, ISOdateMonth, ISOdateDay);
    const today = new Date;
    const ThirtyDaysInSecs = 30 * 24 * 60 * 60 * 60;
    if (today - date < ThirtyDaysInSecs) {
      $('.periodN').eq(i).text("Y")
    }
    else {
      $('.periodN').eq(i).text("N")
    }
  })
})

$('#periodNew').click(function () {
  if ($(this).is(':checked') && $('.periodN').text().match('N')) {
    $('.periodN:contains("N")').parent('tr').addClass('hideNewRow')
  }
  else if ($(this).not(':checked') && $('.periodN').text().match('N')) {
    $('.periodN:contains("N")').parent('tr').removeClass('hideNewRow')
  }
})

// Period Filter - Changed in last 30 days 

$(document).ready(function () {
  $('tr > .dateChanged').each(function (i) {
    const ISOdate = $('.dateChanged').eq(i).text()
    const ISOdateYear = ISOdate.slice(0, 4);
    const ISOdateMonth = ISOdate.slice(5, 7) - 1;
    const ISOdateDay = ISOdate.slice(8, 10);
    const date = new Date(ISOdateYear, ISOdateMonth, ISOdateDay);
    const today = new Date;
    const ThirtyDaysInSecs = 30 * 24 * 60 * 60 * 60;
    if (today - date < ThirtyDaysInSecs) {
      $('.periodC').eq(i).text("Y")
    }
    else {
      $('.periodC').eq(i).text("N")
    }
  })
})

$('#periodChange').click(function () {
  if ($(this).is(':checked') && $('.periodC').text().match('N')) {
    $('.periodC:contains("N")').parent('tr').addClass('hideNewRow')
  }
  else if ($(this).not(':checked') && $('.periodC').text().match('N')) {
    $('.periodC:contains("N")').parent('tr').removeClass('hideNewRow')
  }
})


