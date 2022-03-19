
// getting csrf token function
function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }


// table search
function myfun(){
    var input, filter, table, tr, td, i, txtValue, norec;
    input = document.getElementById("txt_name");
    norec = document.getElementById("notfound");
    filter = input.value.toUpperCase();
    table = document.getElementById("member_table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
         td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } 
            else {
                tr[i].style.display = "none";
            }
        }    
    }
}




// To CSV

function export2csv() {
  let data = "";
  const tableData = [];
  const rows = document.querySelectorAll("table tr");
  for (const row of rows) {
    const rowData = [];
    for (const [index, column] of row.querySelectorAll("th:not(:nth-child(9)), td:not(:nth-child(9))").entries()) {
      // To retain the commas in the "Description" column, we can enclose those fields in quotation marks.
      if ((index + 1) % 3 === 0) {
        rowData.push('"' + column.innerText + '"');
      } else {
        rowData.push(column.innerText);
      }
    }
    tableData.push(rowData.join(","));
  }
  data += tableData.join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
  a.setAttribute("download", "LuzYouthMemberDetails.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


// To Print
function printit() {
    var divToPrint=document.getElementById("member_table");
    newWin= window.open("");
    newWin.document.write("<style> td:nth-child(9){display:none;} </style>");
    newWin.document.write("<style> th:nth-child(9){display:none;} </style>");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
}


// week income datepicker
$(document).ready(function() {       
  $('.date_val').removeAttr('readonly'); 
});

$(".date_val").on("keyup", function(e) {
    $('.date_val').removeAttr('readonly'); 
});

$(".date_val").on("keydown", function(e) {
    $(".date_val").attr("readonly", "readonly");
});

$('.pickadate-limits').pickadate({
    maxDate: new Date 
});


// Add member validation
$(document).ready(function() {
    $(".add_mem_submit").click(function() {
        var x = $('.add_mem_form').serializeArray();
        var form_values = [];
        var total_form_elements = $('.add_mem_form').find('input, select').length;
        var add_mem_json = {};
        $.each(x, function(i, field) {
            console.log(field.name + ":"
                    + field.value + " ");
            if(field.value!=""){
              form_values.push(field.value);
              var field_name = field.name;
              add_mem_json[field_name]=field.value;
            }
        });
      if (total_form_elements==Object.keys(add_mem_json).length){
       $.ajax({
         url: "/memberlist/", 
         type: "POST",
         dataType: "json",
         headers: {"X-CSRFToken": getCookie('csrftoken')},
         // contentType: "application/json; charset=utf-8",
         data: add_mem_json,
         success: function (result) {
            
            // when call is sucessfull
            var message = result['message'];
            $('.success_alert_show').show("slow").delay(5000).hide("slow"); 
            console.log(message);

          },
          error: function (err) {

            // check the err for error details
            $('.error_alert_show').show("slow").delay(5000).hide("slow"); 
            console.log("error");
          }
       });
      }
    });
});


// finance status validation
$(document).ready(function() {
    $(".week_inc_f_status").click(function() {
        var status_val = $('.week_inc_f_status').val();
        console.log(status_val);
        if (status_val=="yes"){
          $(".week_inc_feedback").removeAttr("required");
          $('.week_inc_feedback').val("Paid");
        }
        else{
          $('.week_inc_feedback').val("");
          $(".week_inc_feedback").attr("required", "true");
        }
    });
});


// Finance validation
$(document).ready(function() {
    $(".week_inc_submit").click(function() {
      alert("innnn");
        var x = $('.week_inc_form').serializeArray();
        var week_inc_form_values = [];
        var week_total_form_elements = $('.week_inc_form').find('input, select, datalist').length;
        var add_mem_json = {};
        // console.log(total_form_elements);
        $.each(x, function(i, field) {
          console.log(field.name + ":"
                    + field.value + " ");
          if(field.value!=""){
            week_inc_form_values.push(field.value);
            var field_name = field.name;
            add_mem_json[field_name]=field.value;
          }
        });
      console.log(week_total_form_elements, add_mem_json, week_inc_form_values);
      console.log(Object.keys(add_mem_json).length);
      if (week_total_form_elements===Object.keys(add_mem_json).length){
        alert('in2');
       $.ajax({
         url: "/financedetails/", 
         type: "POST",
         dataType: "json",
         // contentType: "application/json; charset=utf-8",
         data: add_mem_json,
         success: function (result) {
            
            // when call is sucessfull
            var message = result['message'];
            $('.success_alert_show').show("slow").delay(5000).hide("slow"); 
            console.log(message);

          },
          error: function (err) {

            // check the err for error details
            $('.error_alert_show').show("slow").delay(5000).hide("slow"); 
            console.log("error");
          }
       });
      }
    });
});




// hide week, month, year on page load
$(document).ready(function() {
  $(".finance_details_table").show();
  $(".month_filter_table").hide();
  $(".year_filter_table").hide();
  $(".week_filter_table").hide();

  // expenses list table
  $(".exp_details_table").show();
  $(".exp_month_filter_table").hide();
  $(".exp_year_filter_table").hide();
  $(".exp_week_filter_table").hide();
});


// finance table week , year, month filter
$(document).ready(function() {
    $(".finance_filter").click(function() {
        var filter_val = $('.finance_filter').val();
        // console.log(filter_val);

        if (filter_val=="week"){
          console.log("result : "+filter_val);
          $(".finance_details_table").hide();
          $(".month_filter_table").hide();
          $(".year_filter_table").hide();
          $(".week_filter_table").show();
        }

        else if(filter_val=="month"){
          console.log("result : "+filter_val);
          $(".finance_details_table").hide();
          $(".week_filter_table").hide();
          $(".year_filter_table").hide();
          $(".month_filter_table").show();

        }
        else if(filter_val=="year"){
          console.log("result : "+filter_val)
          $(".finance_details_table").hide();
          $(".week_filter_table").hide();
          $(".month_filter_table").hide();   
          $(".year_filter_table").show();       
        }
        else if(filter_val=="all"){
          console.log("result : "+filter_val); 
          $(".finance_details_table").show();
          $(".month_filter_table").hide();
          $(".year_filter_table").hide();
          $(".week_filter_table").hide();
        }
    });
});




// on("keyup",

// $(document).ready(function() {    
//     $('.amount_filter').on("keyup", function() {
//     alert($(this).val()); 
//         $(".finance_details_table tbody tr td.col1:contains('" + $(this).val() + "')").parent().show();
//         $(".finance_details_table tbody tr td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
//     });

// });

function column_filter_cus(class_name, col_num, input_box_id){
    console.log(class_name);
    console.log(col_num);
    var input, filter, table, tr, td, i, txtValue, norec;
    input = document.getElementById(input_box_id);
    // norec = document.getElementById("notfound");
    filter = input.value.toUpperCase();
    table = document.getElementById(class_name);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
         td = tr[i].getElementsByTagName("td")[col_num];
         console.log(td);
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } 
            else {
                tr[i].style.display = "none";
            }
        }    
    }
}


// expenses detail validation

$(document).ready(function() {
  $(".expenses_info_submit").click(function() {
      var x = $('.expenses_info_form').serializeArray();
      var exp_inf_form_values = [];
      var exp_inf_form_elements = $('.expenses_info_form').find('input, select, datalist').length;
      var exp_info_json = {};
      // console.log(total_form_elements);
      $.each(x, function(i, field) {
        console.log(field.name + ":"
                  + field.value + " ");
        if(field.value!="" && field.name!="feedback"){
          exp_inf_form_values.push(field.value);
          var field_name = field.name;
          exp_info_json[field_name]=field.value;
        }
      });
    if (exp_inf_form_elements===Object.keys(exp_info_json).length){
     $.ajax({
       url: "/expensesdetails/", 
       type: "POST",
       dataType: "json",
       // contentType: "application/json; charset=utf-8",
       data: exp_info_json,
       success: function (result) {
          
          // when call is sucessfull
          var message = result['message'];
          $('.success_alert_show').show("slow").delay(5000).hide("slow"); 
          console.log(message);
          // $( '.expenses_info_form' ).resetForm();

        },
        error: function (err) {

          // check the err for error details
          $('.error_alert_show').show("slow").delay(5000).hide("slow"); 
          console.log("error");
        }
     });
    }
  });
});



// expemses list table week , year, month filter
$(document).ready(function() {
    $(".expenses_filter").click(function() {
        var filter_val = $('.expenses_filter').val();
        // console.log(filter_val);

        if (filter_val=="week"){
          console.log("result : "+filter_val);
          $(".exp_details_table").hide();
          $(".exp_month_filter_table").hide();
          $(".exp_year_filter_table").hide();
          $(".exp_week_filter_table").show();
        }

        else if(filter_val=="month"){
          console.log("result : "+filter_val);
          $(".exp_details_table").hide();
          $(".exp_week_filter_table").hide();
          $(".exp_year_filter_table").hide();
          $(".exp_month_filter_table").show();

        }
        else if(filter_val=="year"){
          console.log("result : "+filter_val)
          $(".exp_details_table").hide();
          $(".exp_week_filter_table").hide();
          $(".exp_month_filter_table").hide();   
          $(".exp_year_filter_table").show();       
        }
        else if(filter_val=="all"){
          console.log("result : "+filter_val); 
          $(".exp_details_table").show();
          $(".exp_month_filter_table").hide();
          $(".exp_year_filter_table").hide();
          $(".exp_week_filter_table").hide();
        }
    });
});


// delete member validation
$(".member_table tr td").on("click", function (event) {
  var x = $(this).attr("class");
  console.log(x);

  $(".accept_btn").on("click", function (event, id=x){  
    alert('accepted');
    alert(id);
    $.ajax({
    url:'/deletemember/',
    type: 'POST',
    dataType: 'json' ,
    headers: {"X-CSRFToken": getCookie('csrftoken')},
    data: JSON.stringify({'id':id}) ,

    success: function(result){
      console.log(result['message']);
    },

    error: function(err){
      console.log('error');
    }
  });

  });

});


// add new row in finance details
$(document).ready(function() {
      $(".selectit").select2();
      $(".add_new").on("click", function (){  

    $(".selectit").select2();
  });
});

$(document).ready(function() {
  $(".multipledata_ent_btn").on("click", function (){  
    // alert('iiinnnn');
    var x = $('.multipledata_ent_form').serializeArray();
          var exp_info_json = {};
                var exp_inf_form_values = [];
      $.each(x, function(i, field) {
        console.log(field.name + ":"
                  + field.value + " ");
      });
  });
});




// multipledata_ent_form