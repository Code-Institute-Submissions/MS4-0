// <----- MATERIALIZE TRIGGERS ----->

$(".dropdown-trigger").dropdown();

$(document).ready(function () {
  $('select').formSelect();
  $('.fixed-action-btn').floatingActionButton();

  // validation as per Code Institute Mini Project for Materialize - https://github.com/Code-Institute-Solutions/TaskManagerAuth/blob/main/04-AddingATask-WritingToTheDatabase/02-materialize-select-validation/static/js/script.js
  validateMaterializeSelect();
  function validateMaterializeSelect() {
    let classValid = { "border-bottom": "1px solid #4caf50", "box-shadow": "0 1px 0 0 #4caf50" };
    let classInvalid = { "border-bottom": "1px solid #f44336", "box-shadow": "0 1px 0 0 #f44336" };
    if ($("select.validate").prop("required")) {
      $("select.validate").css({ "display": "block", "height": "0", "padding": "0", "width": "0", "position": "absolute" });
    }
    $(".select-wrapper input.select-dropdown").on("focusin", function () {
      $(this).parent(".select-wrapper").on("change", function () {
        if ($(this).children("ul").children("li.selected:not(.disabled)").on("click", function () { })) {
          $(this).children("input").css(classValid);
        }
      });
    }).on("click", function () {
      if ($(this).parent(".select-wrapper").children("ul").children("li.selected:not(.disabled)").css("background-color") === "rgba(0, 0, 0, 0.03)") {
        $(this).parent(".select-wrapper").children("input").css(classValid);
      } else {
        $(".select-wrapper input.select-dropdown").on("focusout", function () {
          if ($(this).parent(".select-wrapper").children("select").prop("required")) {
            if ($(this).css("border-bottom") != "1px solid rgb(76, 175, 80)") {
              $(this).parent(".select-wrapper").children("input").css(classInvalid);
            }
          }
        });
      }
    });
  }
});



// $('#changeDescription').val('New Text');
//   M.textareaAutoResize($('#changeDescription'));


// <----- DASHBOARD ----->
let arr = []

$(window).on('load', function () {
  $.ajax({
    url: 'filter',
    type: 'POST',
    dataType: 'json',
    async: true,
    success: function (result) {
      for (i = 0; i < result.length; i++) {
        arr[result[i].status] = result[i].changeType
      };
    }
  });
})


let checkedStatus = ["A", "P", "WiP", "R"]
let checkedChanges = ["CA", "CR", "DD", "PA", "EW", "VE"]

// let budgetGross = 10000000
// let budgetGIA = 11000
// let approvedGross
// let approvedNett
// let approvedGIA

// let pendingGross = getTotal("P")

// setTimeout(() => {
//   getTotal('totalGross', 'P');
// }, 1000);


// https://learn.co/lessons/js-looping-and-iteration-traversing-nested-objects-readme

function getTotal(val, stat) {
  let total = 0
  Object.keys(arr).forEach((status) => {
    for (const key1 in newStatus) {
      if (newStatus[key1] === status) {
        Object.keys(arr[status]).forEach((change) => {
          for (const key2 in newChanges) {
            if (newChanges[key2] === change) {
              if (status === stat) {
                total = total + arr[status][change][val]
              }
            }
          }
        })
      }
    }
  })
  return total
};

$('#costSwitch').click(function () {
  if ($(this).is(':checked')) {
    pushValues('Gross')
  }
  else if ($(this).not(':checked')) {
    pushValues('Nett')
  }
})

pushValues()
function pushValues(checkedStatus) {
  setTimeout(() => {
    // Budget Row
    let budgetTotalGross = 20000000
    let budgetTotalNett = 18000000
    let budgetTotal = (function () {
      if (checkedStatus == 'Nett') {
        return budgetTotalNett
      }
      else if (checkedStatus == 'Gross') {
        return budgetTotalGross
      }
      else {
        return budgetTotalNett
      }
    })();
    let budgeTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budgetTotal);
    $('#budgetRow').children('.total').text(budgeTotalDisplay)

    let budgetAreaChange = 0;
    let budgetAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budgetAreaChange);
    $('#budgetRow').children('.areaChange').text(budgetAreaChangeDisplay)

    let budgetAreaTotal = 15000;
    let budgetAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budgetAreaTotal);
    $('#budgetRow').children('.areaTotal').text(budgetAreaTotalDisplay)

    let budgetRate = budgetTotal / budgetAreaTotal;
    let budgetRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budgetRate);;
    $('#budgetRow').children('.rate').text(budgetRateDisplay)

    // Approved Row
    let approvedTotalGross = getTotal('totalGross', 'A');
    let approvedTotalNett = getTotal('totalNett', 'A');
    let approvedTotal = (function () {
      if (checkedStatus == 'Nett') {
        return approvedTotalNett
      }
      else if (checkedStatus == 'Gross') {
        return approvedTotalGross
      }
      else {
        return approvedTotalNett
      }
    })();
    let approvedTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(approvedTotal);;
    $('#approvedRow').children('.total').text(approvedTotalDisplay)

    let approvedAreaChange = getTotal('totalGIA', 'A');
    let approvedAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(approvedAreaChange);
    $('#approvedRow').children('.areaChange').text(approvedAreaChangeDisplay)

    let approvedAreaTotal = budgetAreaTotal + approvedAreaChange;
    let approevedAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(approvedAreaTotal);
    $('#approvedRow').children('.areaTotal').text(approevedAreaTotalDisplay)

    let approvedRate = ((budgetTotal + approvedTotal) / approvedAreaTotal) - budgetRate;
    let approvedRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(approvedRate);;
    $('#approvedRow').children('.rate').text(approvedRateDisplay)

    // Pending Row
    let pendingTotalGross = getTotal('totalGross', 'P');
    let pendingTotalNett = getTotal('totalNett', 'P');
    let pendingTotal = (function () {
      if (checkedStatus == 'Nett') {
        return pendingTotalNett
      }
      else if (checkedStatus == 'Gross') {
        return pendingTotalGross
      }
      else {
        return pendingTotalNett
      }
    })();
    let pendingTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pendingTotal);;
    $('#pendingRow').children('.total').text(pendingTotalDisplay)

    let pendingAreaChange = getTotal('totalGIA', 'P');
    let pendingAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pendingAreaChange);
    $('#pendingRow').children('.areaChange').text(pendingAreaChangeDisplay)

    let pendingAreaTotal = approvedAreaTotal + pendingAreaChange
    let pendingAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pendingAreaTotal);
    $('#pendingRow').children('.areaTotal').text(pendingAreaTotalDisplay)

    let pendingRate = ((budgetTotal + approvedTotal + pendingTotal) / pendingAreaTotal) - budgetRate - approvedRate;
    let pendingRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pendingRate);;
    $('#pendingRow').children('.rate').text(pendingRateDisplay)

    // WiP Row
    let wipTotalGross = getTotal('totalGross', 'WiP');
    let wipTotalNett = getTotal('totalNett', 'WiP');
    let wipTotal = (function () {
      if (checkedStatus == 'Nett') {
        return wipTotalNett
      }
      else if (checkedStatus == 'Gross') {
        return wipTotalGross
      }
      else {
        return wipTotalNett
      }
    })();
    let wipTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(wipTotal);;
    $('#wipRow').children('.total').text(wipTotalDisplay)

    let wipAreaChange = getTotal('totalGIA', 'WiP');
    let wipAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(wipAreaChange);
    $('#wipRow').children('.areaChange').text(wipAreaChangeDisplay)

    let wipAreaTotal = pendingAreaTotal + wipAreaChange
    let wipAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(wipAreaTotal);
    $('#wipRow').children('.areaTotal').text(wipAreaTotalDisplay)

    let wipRate = ((budgetTotal + approvedTotal + pendingTotal + wipTotal) / wipAreaTotal) - budgetRate - approvedRate - pendingRate;
    let wipRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(wipRate);;
    $('#wipRow').children('.rate').text(wipRateDisplay)

    // Revised Estimate Row
    let revisedTotal = budgetTotal + approvedTotal + pendingTotal + wipTotal;
    let revisedTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revisedTotal);;
    $('#revisedRow').children('.total').text(revisedTotalDisplay)

    let revisedAreaChange = approvedAreaChange + pendingAreaChange + wipAreaChange
    let revisedAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revisedAreaChange);
    $('#revisedRow').children('.areaChange').text(revisedAreaChangeDisplay)

    let revisedAreaTotal = budgetAreaTotal + revisedAreaChange
    let revisedAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revisedAreaTotal);
    $('#revisedRow').children('.areaTotal').text(revisedAreaTotalDisplay)

    let revisedRate = revisedTotal / revisedAreaTotal;
    let revisedRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revisedRate);;
    $('#revisedRow').children('.rate').text(revisedRateDisplay)

    // Rejected Total
    let rejectedTotalGross = getTotal('totalGross', 'R');
    let rejectedTotalNett = getTotal('totalNett', 'R');
    let rejectedTotal = (function () {
      if (checkedStatus == 'Nett') {
        return rejectedTotalNett
      }
      else if (checkedStatus == 'Gross') {
        return rejectedTotalGross
      }
      else {
        return rejectedTotalNett
      }
    })();
    let rejectedTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rejectedTotal);;
    $('#rejectedRow').children('.total').text(rejectedTotalDisplay)

    let rejectedAreaChange = getTotal('totalGIA', 'R');
    let rejectedAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rejectedAreaChange);
    $('#rejectedRow').children('.areaChange').text(rejectedAreaChangeDisplay)

    let rejectedAreaTotal = revisedAreaTotal + rejectedAreaChange
    let rejectedAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rejectedAreaTotal);
    $('#rejectedRow').children('.areaTotal').text(rejectedAreaTotalDisplay)

    let rejectedRate = ((revisedTotal + rejectedTotal) / rejectedAreaTotal) - revisedRate;
    let rejectedRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rejectedRate);;
    $('#rejectedRow').children('.rate').text(rejectedRateDisplay)

    $('td').each(function () {
      if ($(this).text().length === 1 && $(this).text() === "0") {
        $(this).text("-")
      }
    })

  }, 1000);
}


// https://stackoverflow.com/questions/30788531/use-checkboxes-to-filter-to-a-new-array-of-objects-javascript

// Status changes

let newStatus = checkedStatus.slice();

function handleChangeStatus() {
  newStatus = checkedStatus.filter(filterByJob);
  pushValues();
}

function filterByJob(e) {
  return document.getElementById(e).checked;
}

// Change Type changes

let newChanges = checkedChanges.slice();

function handleChangeChanges() {
  newChanges = checkedChanges.filter(filterByJob);
  pushValues();
}

function filterByJob(e) {
  return document.getElementById(e).checked;
}




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
$("#A").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('A')) {
    $('.changeStatus:contains("A")').filter(function () { return $(this).text() === 'A' }).parent('tr').removeClass('hideRowStatus')
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('A')) {
    $('.changeStatus:contains("A")').filter(function () { return $(this).text() === 'A' }).parent('tr').addClass('hideRowStatus');
  }
});

// Pending Filter
$("#P").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('P')) {
    $('.changeStatus:contains("P")').filter(function () { return $(this).text() === 'P' }).parent('tr').removeClass('hideRowStatus')
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('P')) {
    $('.changeStatus:contains("P")').filter(function () { return $(this).text() === 'P' }).parent('tr').addClass('hideRowStatus');
  }
});

// WiP Filter
$("#WiP").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('WiP')) {
    $('.changeStatus:contains("WiP")').parent('tr').removeClass('hideRowStatus')
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('WiP')) {
    $('.changeStatus:contains("WiP")').parent('tr').addClass('hideRowStatus');
  }
});

// Rejected Filter
$("#R").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('R')) {
    $('.changeStatus:contains("R")').filter(function () { return $(this).text() === 'R' }).parent('tr').removeClass('hideRowStatus')
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('R')) {
    $('.changeStatus:contains("R")').filter(function () { return $(this).text() === 'R' }).parent('tr').addClass('hideRowStatus');
  }
});

// CA Filter
$("#CA").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('CA')) {
    $('.changeType:contains("CA")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('CA')) {
    $('.changeType:contains("CA")').parent('tr').addClass('hideRowType');
  }
});

// CR Filter
$("#CR").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('CR')) {
    $('.changeType:contains("CR")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('CR')) {
    $('.changeType:contains("CR")').parent('tr').addClass('hideRowType');
  }
});

// DD Filter
$("#DD").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('DD')) {
    $('.changeType:contains("DD")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('DD')) {
    $('.changeType:contains("DD")').parent('tr').addClass('hideRowType');
  }
});

// PA Filter
$("#PA").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('PA')) {
    $('.changeType:contains("PA")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('PA')) {
    $('.changeType:contains("PA")').parent('tr').addClass('hideRowType');
  }
});

// EW Filter
$("#EW").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('EW')) {
    $('.changeType:contains("EW")').parent('tr').removeClass('hideRowType')
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('P')) {
    $('.changeType:contains("EW")').parent('tr').addClass('hideRowType');
  }
});

// VE Filter
$("#VE").click(function () {
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
    const date = new Date($('.dateAdded').eq(i).text());
    const today = new Date;
    const ThirtyDaysInMSecs = 1000 * 60 * 60 * 24 * 30;
    if (today - date < ThirtyDaysInMSecs) {
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
    const date = new Date($('.dateChanged').eq(i).text());
    const today = new Date();
    const ThirtyDaysInMSecs = 1000 * 60 * 60 * 24 * 30;
    if (today - date < ThirtyDaysInMSecs) {
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


// <----- REGISTER TABLE ----->

// Make row a link
// https://electrictoolbox.com/jquey-make-entire-table-row-clickable/
$(document).ready(function () {
  $('tr').click(function () {
    var href = $(this).find('a').attr('href');
    if (href) {
      window.location = href;
    }
  });
});




// <<----- ADD / EDIT ITEMS ----->

// New Item - input today's date (Dated Added + Last Change)
$(document).ready(function () {
  if (window.location.pathname == '/add_change') {
    $('#date_added').val(new Date().toISOString().split('T')[0]);
    $('#date_changed').val(new Date().toISOString().split('T')[0]);
  }
})

// Calculate gross total

function updateTotal() {
  (function calculateGross() {
    let v1 = ((num) => {
      num = $('#cost_nett').val();
      num = +num
      if (Number.isInteger(num)) {
        return num
      }
      else {
        return 0
      }
    })();
    let v2 = ((num) => {
      num = $('#cont_design_total').val();
      num = +num
      if (Number.isInteger(num)) {
        return num
      }
      else {
        return 0
      }
    })();
    let v3 = ((num) => {
      num = $('#cont_const_total').val();
      num = +num
      if (Number.isInteger(num)) {
        return num
      }
      else {
        return 0
      }
    })();
    let v4 = ((num) => {
      num = $('#prelims_total').val();
      num = +num
      if (Number.isInteger(num)) {
        return num
      }
      else {
        return 0
      }
    })();
    let v5 = ((num) => {
      num = $('#ohp_t0tal').val();
      num = +num
      if (Number.isInteger(num)) {
        return num
      }
      else {
        return 0
      }
    })();
    let gross = v1 + v2 + v3 + v4 + v5
    $('#cost_gross').val(gross);
    $('#cost_gross_show').val(gross);
  })()
}

// Calculate gross when Row clicked to view/edit change
$(document).ready(function () {
  updateTotal();
})


// Enable Edit in View Item
$('.btnEdit').on('click', function () {
  $('.enableEdit').prop('disabled', false)
  $('.enableReadOnly').prop('readonly', true)
  $('select').formSelect();
  $('#date_changed').val(new Date().toISOString().split('T')[0]);
  $('.btnHide').show()
})
