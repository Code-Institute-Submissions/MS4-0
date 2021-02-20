/*jshint esversion: 10*/

// <----- MATERIALIZE TRIGGERS ----->
// The following jQuery scipts are required to implement some of the Materialize functionality and styling, and are provided as part of the guidance at https://materializecss.com/

$(".dropdown-trigger").dropdown({ constrainWidth: false });

$(document).ready(function () {
  $('select').formSelect();
  $('.fixed-action-btn').floatingActionButton();
  $('.modal').modal();
  $('.sidenav').sidenav();

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



// <----- SNACKBAR POP-UP ----->
// Inspired and adapted from: https://www.w3schools.com/howto/howto_js_snackbar.asp

// Flash messages from Python are inserted into the base.html template
function closeSnack() {
  $('#snackbar').hide('slow');
}


// <----- PAGE:  LOGIN / REGISTRATION ----->

// Function checks if passwords match
// Submit button activates if passwords match, so that Registration can't be submitted if they don't match
$('#password2').on('keyup', function () {
  const var1 = $('#password1').val();
  const var2 = $('#password2').val();
  if (var2 == '') {
    $('.passwordMatch').html("");
  }
  else if (var1 == var2) {
    $('.passwordMatch').html("Password match!");
    $('#btnReg').prop('disabled', false);
  }
  else {
    $('.passwordMatch').html("Password does not match");
  }
});


// <----- PAGE:  DASHBOARD ----->

// Javascript arrays are used in functions which follow on the DASHBOARD page
let checkedStatus = ["A", "P", "WiP", "R"];
let checkedChanges = ["CA", "CR", "DD", "PA", "EW", "VE"];
let budget = []; // Ajax call to Python - returns 'budget' collection information on MongoDB
let arr = []; //Ajax call to Python - returns 'register' collection information - which has been processed - on MongoDB

// Steps to determine current Filter settings of Status and Change Type
// Adpated from: https://stackoverflow.com/questions/30788531/use-checkboxes-to-filter-to-a-new-array-of-objects-javascript

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

// Function to iterate through 'arr' to return the value, dependent upon filters selected.
// Adapted from: https://learn.co/lessons/js-looping-and-iteration-traversing-nested-objects-readme

function getTotal(val, stat) {
  let total = 0;
  Object.keys(arr).forEach((status) => {
    for (const key1 in newStatus) {
      if (newStatus[key1] === status) {
        Object.keys(arr[status]).forEach((change) => {
          for (const key2 in newChanges) {
            if (newChanges[key2] === change) {
              if (status === stat) {
                total = total + arr[status][change][val];
              }
            }
          }
        });
      }
    }
  });
  return total;
}

// To determine checked status of 'Cost' Filter
$('#costSwitch').click(function () {
  if ($(this).is(':checked')) {
    pushValues('Gross');
  }
  else if ($(this).not(':checked')) {
    pushValues('Nett');
  }
});

// Ajax calls to get cost information to populate the Dashboard
// Utilised Ajax in lieu of Jinja so that page is responsive without having to reload to get data
$(document).ready(function () {
  if (window.location.pathname == '/dashboard') {
    $.ajax({
      url: 'filter',
      type: 'GET',
      dataType: 'json',
      async: true,
      success: function (result) {
        for (i = 0; i < result.length; i++) {
          arr[result[i].status] = result[i].changeType;
        }
      }
    });
    $.ajax({
      url: 'getbudget',
      type: 'GET',
      dataType: 'json',
      async: 'true',
      success: function (results) {
        budget = results;
      }
    });
    pushValues();
  }
});

// Function to populate the Dashboard - the above functions / arrays are called within this function
function pushValues(checkedStatus) {
  setTimeout(() => {
    // Budget Row
    let budgetTotalGross = budget[0].cost_gross;
    let budgetTotalNett = budget[0].cost_nett;
    let budgetTotal = (function () {
      if (checkedStatus == 'Nett') {
        return budgetTotalNett;
      }
      else if (checkedStatus == 'Gross') {
        return budgetTotalGross;
      }
      else {
        return budgetTotalNett;
      }
    })();
    let budgeTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budgetTotal);
    $('#budgetRow').children('.total').text(budgeTotalDisplay);

    let budgetAreaChange = 0;
    let budgetAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budgetAreaChange);
    $('#budgetRow').children('.areaChange').text(budgetAreaChangeDisplay);

    let budgetAreaTotal = budget[0].GIA_ft2
    let budgetAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budgetAreaTotal);
    $('#budgetRow').children('.areaTotal').text(budgetAreaTotalDisplay);

    let budgetRate = (function () {
      if (budgetTotal === 0 && budgetAreaTotal === 0) {
        return 0
      }
      else {
        return budgetTotal / budgetAreaTotal
      }
    })();
    let budgetRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budgetRate);
    $('#budgetRow').children('.rate').text(budgetRateDisplay);

    // Approved Row
    let approvedTotalGross = getTotal('totalGross', 'A');
    let approvedTotalNett = getTotal('totalNett', 'A');
    let approvedTotal = (function () {
      if (checkedStatus == 'Nett') {
        return approvedTotalNett;
      }
      else if (checkedStatus == 'Gross') {
        return approvedTotalGross;
      }
      else {
        return approvedTotalNett;
      }
    })();
    let approvedTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(approvedTotal);
    $('#approvedRow').children('.total').text(approvedTotalDisplay);

    let approvedAreaChange = getTotal('totalGIA', 'A');
    let approvedAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(approvedAreaChange);
    $('#approvedRow').children('.areaChange').text(approvedAreaChangeDisplay);

    let approvedAreaTotal = (function () {
      if (approvedAreaChange === 0 && approvedTotal === 0) {
        return 0
      }
      else {
        return budgetAreaTotal + approvedAreaChange;
      }
    })();
    let approevedAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(approvedAreaTotal);
    $('#approvedRow').children('.areaTotal').text(approevedAreaTotalDisplay);

    let approvedRate = ((budgetTotal + approvedTotal) / (budgetAreaTotal + approvedAreaChange)) - budgetRate;
    let approvedRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(approvedRate);
    $('#approvedRow').children('.rate').text(approvedRateDisplay);

    // Pending Row
    let pendingTotalGross = getTotal('totalGross', 'P');
    let pendingTotalNett = getTotal('totalNett', 'P');
    let pendingTotal = (function () {
      if (checkedStatus == 'Nett') {
        return pendingTotalNett;
      }
      else if (checkedStatus == 'Gross') {
        return pendingTotalGross;
      }
      else {
        return pendingTotalNett;
      }
    })();
    let pendingTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pendingTotal);
    $('#pendingRow').children('.total').text(pendingTotalDisplay);

    let pendingAreaChange = getTotal('totalGIA', 'P');
    let pendingAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pendingAreaChange);
    $('#pendingRow').children('.areaChange').text(pendingAreaChangeDisplay);

    let pendingAreaTotal = (function () {
      if (pendingAreaChange === 0 && pendingTotal === 0) {
        return 0
      }
      else {
        return budgetAreaTotal + approvedAreaChange + pendingAreaChange;
      }
    })();
    let pendingAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pendingAreaTotal);
    $('#pendingRow').children('.areaTotal').text(pendingAreaTotalDisplay);

    let pendingRate = ((budgetTotal + approvedTotal + pendingTotal) / (budgetAreaTotal + approvedAreaChange + pendingAreaChange)) - budgetRate - approvedRate;
    let pendingRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pendingRate);
    $('#pendingRow').children('.rate').text(pendingRateDisplay);

    // WiP Row
    let wipTotalGross = getTotal('totalGross', 'WiP');
    let wipTotalNett = getTotal('totalNett', 'WiP');
    let wipTotal = (function () {
      if (checkedStatus == 'Nett') {
        return wipTotalNett;
      }
      else if (checkedStatus == 'Gross') {
        return wipTotalGross;
      }
      else {
        return wipTotalNett;
      }
    })();
    let wipTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(wipTotal);
    $('#wipRow').children('.total').text(wipTotalDisplay);

    let wipAreaChange = getTotal('totalGIA', 'WiP');
    let wipAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(wipAreaChange);
    $('#wipRow').children('.areaChange').text(wipAreaChangeDisplay);

    let wipAreaTotal = (function () {
      if (wipAreaChange === 0 && wipTotal === 0) {
        return 0
      }
      else {
        return budgetAreaTotal + approvedAreaChange + pendingAreaChange + wipAreaChange;
      }
    })();
    let wipAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(wipAreaTotal);
    $('#wipRow').children('.areaTotal').text(wipAreaTotalDisplay);

    let wipRate = ((budgetTotal + approvedTotal + pendingTotal + wipTotal) / (budgetAreaTotal + approvedAreaChange + pendingAreaChange + wipAreaChange)) - budgetRate - approvedRate - pendingRate;
    let wipRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(wipRate);
    $('#wipRow').children('.rate').text(wipRateDisplay);

    // Revised Estimate Row
    let revisedTotal = budgetTotal + approvedTotal + pendingTotal + wipTotal;
    let revisedTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revisedTotal);
    $('#revisedRow').children('.total').text(revisedTotalDisplay);

    let revisedAreaChange = approvedAreaChange + pendingAreaChange + wipAreaChange;
    let revisedAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revisedAreaChange);
    $('#revisedRow').children('.areaChange').text(revisedAreaChangeDisplay);

    let revisedAreaTotal = budgetAreaTotal + revisedAreaChange;
    let revisedAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revisedAreaTotal);
    $('#revisedRow').children('.areaTotal').text(revisedAreaTotalDisplay);

    let revisedRate = revisedTotal / revisedAreaTotal;
    let revisedRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(revisedRate);
    $('#revisedRow').children('.rate').text(revisedRateDisplay);

    // Rejected Total
    let rejectedTotalGross = getTotal('totalGross', 'R');
    let rejectedTotalNett = getTotal('totalNett', 'R');
    let rejectedTotal = (function () {
      if (checkedStatus == 'Nett') {
        return rejectedTotalNett;
      }
      else if (checkedStatus == 'Gross') {
        return rejectedTotalGross;
      }
      else {
        return rejectedTotalNett;
      }
    })();
    let rejectedTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rejectedTotal);
    $('#rejectedRow').children('.total').text(rejectedTotalDisplay);

    let rejectedAreaChange = getTotal('totalGIA', 'R');
    let rejectedAreaChangeDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rejectedAreaChange);
    $('#rejectedRow').children('.areaChange').text(rejectedAreaChangeDisplay);

    let rejectedAreaTotal = (function () {
      if (rejectedAreaChange === 0 && rejectedTotal === 0) {
        return 0
      }
      else {
        return revisedAreaTotal + rejectedAreaChange;
      }
    })();
    let rejectedAreaTotalDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rejectedAreaTotal);
    $('#rejectedRow').children('.areaTotal').text(rejectedAreaTotalDisplay);

    let rejectedRate = ((revisedTotal + rejectedTotal) / (revisedAreaTotal + rejectedAreaChange)) - revisedRate;
    let rejectedRateDisplay = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rejectedRate);
    $('#rejectedRow').children('.rate').text(rejectedRateDisplay);

    $('td').each(function () {
      if ($(this).text().length === 1 && $(this).text() === "0") {
        $(this).text("-");
      }
    });
  }, 1000);
}


// Hide Period/Changes Filter on Dashboard
// Further development required to be able to filter Period on Dashboard

$(document).ready(function () {
  if (window.location.pathname == '/dashboard') {
    $('#period').hide();
  }
});


// <----- PAGE: REGISTER ----->

// Operation of Filter on the Register by showing / hiding rows/columns dependent upon checked status of filters

// Nett / Gross Switch (hides/shows relevant column)
$('#costSwitch').click(function () {
  if ($(this).is(':checked')) {
    $('.costGross, .giaGross').removeClass('hideCost');
    $('.costNett, .giaNett').addClass('hideCost');
  }
  else if ($(this).not(':checked')) {
    $('.costGross, .giaGross').addClass('hideCost');
    $('.costNett, .giaNett').removeClass('hideCost');
  }
});

// Accepted Filter
$("#A").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('A')) {
    $('.changeStatus:contains("A")').filter(function () { return $(this).text() === 'A' }).parent('tr').removeClass('hideRowStatus');
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('A')) {
    $('.changeStatus:contains("A")').filter(function () { return $(this).text() === 'A' }).parent('tr').addClass('hideRowStatus');
  }
});

// Pending Filter
$("#P").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('P')) {
    $('.changeStatus:contains("P")').filter(function () { return $(this).text() === 'P' }).parent('tr').removeClass('hideRowStatus');
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('P')) {
    $('.changeStatus:contains("P")').filter(function () { return $(this).text() === 'P' }).parent('tr').addClass('hideRowStatus');
  }
});

// WiP Filter
$("#WiP").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('WiP')) {
    $('.changeStatus:contains("WiP")').parent('tr').removeClass('hideRowStatus');
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('WiP')) {
    $('.changeStatus:contains("WiP")').parent('tr').addClass('hideRowStatus');
  }
});

// Rejected Filter
$("#R").click(function () {
  if ($(this).is(':checked') && $('.changeStatus').text().match('R')) {
    $('.changeStatus:contains("R")').filter(function () { return $(this).text() === 'R' }).parent('tr').removeClass('hideRowStatus');
  }
  else if ($(this).not(':checked') && $('.changeStatus').text().match('R')) {
    $('.changeStatus:contains("R")').filter(function () { return $(this).text() === 'R' }).parent('tr').addClass('hideRowStatus');
  }
});

// CA Filter
$("#CA").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('CA')) {
    $('.changeType:contains("CA")').parent('tr').removeClass('hideRowType');
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('CA')) {
    $('.changeType:contains("CA")').parent('tr').addClass('hideRowType');
  }
});

// CR Filter
$("#CR").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('CR')) {
    $('.changeType:contains("CR")').parent('tr').removeClass('hideRowType');
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('CR')) {
    $('.changeType:contains("CR")').parent('tr').addClass('hideRowType');
  }
});

// DD Filter
$("#DD").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('DD')) {
    $('.changeType:contains("DD")').parent('tr').removeClass('hideRowType');
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('DD')) {
    $('.changeType:contains("DD")').parent('tr').addClass('hideRowType');
  }
});

// PA Filter
$("#PA").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('PA')) {
    $('.changeType:contains("PA")').parent('tr').removeClass('hideRowType');
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('PA')) {
    $('.changeType:contains("PA")').parent('tr').addClass('hideRowType');
  }
});

// EW Filter
$("#EW").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('EW')) {
    $('.changeType:contains("EW")').parent('tr').removeClass('hideRowType');
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('P')) {
    $('.changeType:contains("EW")').parent('tr').addClass('hideRowType');
  }
});

// VE Filter
$("#VE").click(function () {
  if ($(this).is(':checked') && $('.changeType').text().match('VE')) {
    $('.changeType:contains("VE")').parent('tr').removeClass('hideRowType');
  }
  else if ($(this).not(':checked') && $('.changeType').text().match('VE')) {
    $('.changeType:contains("VE")').parent('tr').addClass('hideRowType');
  }
});


// Period Filter - function to determine which changes have been added / changed within the last 30 days by comparing to today's date

// New
$(document).ready(function () {
  $('tr > .dateAdded').each(function (i) {
    const date = new Date($('.dateAdded').eq(i).text());
    const today = new Date();
    const ThirtyDaysInMSecs = 1000 * 60 * 60 * 24 * 30;
    if (today - date < ThirtyDaysInMSecs) {
      $('.periodN').eq(i).text("Y");
    }
    else {
      $('.periodN').eq(i).text("N");
    }
  });
});

$('#periodNew').click(function () {
  if ($(this).is(':checked') && $('.periodN').text().match('N')) {
    $('.periodN:contains("N")').parent('tr').addClass('hideNewRow');
  }
  else if ($(this).not(':checked') && $('.periodN').text().match('N')) {
    $('.periodN:contains("N")').parent('tr').removeClass('hideNewRow');
  }
});

// Changed
$(document).ready(function () {
  $('tr > .dateChanged').each(function (i) {
    const date = new Date($('.dateChanged').eq(i).text());
    const today = new Date();
    const ThirtyDaysInMSecs = 1000 * 60 * 60 * 24 * 30;
    if (today - date < ThirtyDaysInMSecs) {
      $('.periodC').eq(i).text("Y");
    }
    else {
      $('.periodC').eq(i).text("N");
    }
  });
});

$('#periodChange').click(function () {
  if ($(this).is(':checked') && $('.periodC').text().match('N')) {
    $('.periodC:contains("N")').parent('tr').addClass('hideNewRow');
  }
  else if ($(this).not(':checked') && $('.periodC').text().match('N')) {
    $('.periodC:contains("N")').parent('tr').removeClass('hideNewRow');
  }
});


// Make the row 'clickable' to open the Change to view/edit details
// https://electrictoolbox.com/jquey-make-entire-table-row-clickable/
$(document).ready(function () {
  $('tr').click(function () {
    var href = $(this).find('a').attr('href');
    if (href) {
      window.location = href;
    }
  });
});


// Pagination functionality
// Forward/Backward arrows - disable on first/last page
$(document).ready(function () {
  if (window.location.pathname.indexOf('/register/1/') !== 0) {
    $('.pagination li').removeClass('disabled')
  }
});

$(document).ready(function () {
  const x = $('.pagination > li:nth-last-child(2)').text()
  const y = "/register/"
  const path = window.location.pathname;
  if (path.includes(y + x)) {
    $('.pagination li:last-child').addClass('disabled')
  }
})

// Highlight active page on pagination list
// Populate forward/backward hrefs
$(document).ready(function () {
  $('.pagination > li').each(function (i, element) {
    let x = "/register/" + i;
    const path = window.location.pathname;
    if (path.includes(x)) {
      // highlight active page
      $(element).addClass('active blue lighten-2');
      // backward chevron
      const prevP = $(element).prev().find('a').attr('href')
      $('.pagination > li:first-child').find('a').attr('href', prevP);
      // forward chevron
      const nextP = $(element).next().find('a').attr('href')
      $('.pagination > li:last-child').find('a').attr('href', nextP);
    }
  });
});

// Switch to full list view
$(document).ready(function () {
  if (window.location.pathname.includes('register/1/0')) {
    $('#pages').hide();
    $('#backToPages').show();
  }
})


// <<----- PAGES: ADD / EDIT / BUDGET ----->

// New Item - input today's date automatically (Dated Added + Last Change)
$(document).ready(function () {
  if (window.location.pathname == '/add_change') {
    $('#date_added').val(new Date().toISOString().split('T')[0]);
    $('#date_changed').val(new Date().toISOString().split('T')[0]);
  }
});


// Automatic calculation of Gross Total for Budget
function updateBudget() {
  if (window.location.pathname == '/budget') {
    let v1 = ((num) => {
      num = $('#budget_cost_nett').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let v2 = ((num) => {
      num = $('#budget_cont_design_total').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let v3 = ((num) => {
      num = $('#budget_cont_const_total').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let v4 = ((num) => {
      num = $('#budget_prelims_total').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let v5 = ((num) => {
      num = $('#budget_ohp_total').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let gross = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(v1 + v2 + v3 + v4 + v5);
    $('#budget_cost_gross').val(gross);
  }
}

// Automatic calculation of Gross Total for Add / Edit
function updateTotal() {
  if (window.location.pathname.indexOf('edit_change') > -1 || window.location.pathname == '/add_change') {
    let v1 = ((num) => {
      num = $('#cost_nett').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let v2 = ((num) => {
      num = $('#cont_design_total').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let v3 = ((num) => {
      num = $('#cont_const_total').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let v4 = ((num) => {
      num = $('#prelims_total').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let v5 = ((num) => {
      num = $('#ohp_total').val();
      num = num.replace(/,/g, "");
      num = +num;
      if (Number.isInteger(num)) {
        return num;
      }
      else {
        return 0;
      }
    })();
    let gross = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(v1 + v2 + v3 + v4 + v5);
    $('#cost_gross').val(gross);
  }
}


// Calculate Gross Total when Row clicked to view/edit change
$(document).ready(function () {
  setTimeout(() => {
    updateTotal();
  }, 500);
});


// Enables Change to be Editable (all fields disabled / View mode)
$('.btnEdit').on('click', function () {
  $('.enableEdit').prop('disabled', false);
  $('.enableReadOnly').prop('readonly', true); // required to enable values to be Posted to Python / MongoDB, remains uneditable
  $('select').formSelect();
  $('#date_changed, #date_changed_display').val(new Date().toISOString().split('T')[0]); // updates date authomatically
  $('#date_modified').val(new Date().toISOString().split('T')[0]);
  $('.btnHide').show(); // Tick button hid on initial page load, as would 'Post' empty Update to Python
});




// Holds submit of data until values converted or given default value of "0"
// Converts values with thousand separators - removes all ','
$('#editForm,#addForm,#editBudget').submit(function (event) {
  event.preventDefault();

  $('.formatNum').each(function () {
    // Default value of "0" if no value entered
    if (!$(this).val()) {
        let y = "0"
        $(this).val(y)
    }
    // Ommits "," from numbers prior to submit
    else {
      $(this).text(function () {
        let x = $(this).val().replace(/,/g, "");
        $(this).val(x);
      });
    }
  })

  // $('.formatNum').each(function () {
  //   let y = $(this).val()
  //   if (y === "") {
  //     y = 0;
  //     $(this).val(y)
  //   }
  // });

  $(this).unbind('submit').submit();

});

// As above but when cursor enters field
$('.formatNum').on('focus', function () {
  $(this).text(function () {
    let x = $(this).val().replace(/,/g, "");
    $(this).val(x);
  });
});

// Converts numbers back to be with thousand separators
$('.formatNum').focusout(function () {
  $(this).text(function () {
    let x = $(this).val().replace(/,/g, "");
    let y = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(x);
    $(this).val(y);
  });
});


